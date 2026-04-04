-- ═══════════════════════════════════════════════════════
-- OVG Facebook Lead Ads Module — Supabase Migrations
-- Run once against your Supabase project SQL editor
-- ═══════════════════════════════════════════════════════

-- ── 1. Extend the existing tenants table ───────────────
ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS fb_ads_plan          TEXT    DEFAULT NULL,       -- 'starter' | 'growth' | 'pro'
  ADD COLUMN IF NOT EXISTS fb_ads_packages_used INT     DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fb_ads_leads_used    INT     DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fb_page_id           TEXT    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS fb_page_name         TEXT    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS fb_page_token        TEXT    DEFAULT NULL,       -- never-expiring page token (store encrypted)
  ADD COLUMN IF NOT EXISTS fb_ad_account_id     TEXT    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS fb_connected_at      TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS fb_brand_colour      TEXT    DEFAULT '#1877F2',  -- hex
  ADD COLUMN IF NOT EXISTS fb_logo_url          TEXT    DEFAULT NULL;

-- ── 2. Saved ad campaigns ──────────────────────────────
CREATE TABLE IF NOT EXISTS fb_campaigns (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id         TEXT        NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  brief             JSONB       NOT NULL,           -- full BriefForm state
  package_markdown  TEXT        NOT NULL,           -- Claude output
  asset_url         TEXT        DEFAULT NULL,       -- uploaded or generated creative
  meta_campaign_id  TEXT        DEFAULT NULL,       -- set after Meta API publish
  meta_adset_id     TEXT        DEFAULT NULL,
  meta_ad_id        TEXT        DEFAULT NULL,
  meta_form_id      TEXT        DEFAULT NULL,
  status            TEXT        NOT NULL DEFAULT 'draft',  -- draft | published | paused | ended
  published_at      TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_fb_campaigns_tenant ON fb_campaigns (tenant_id);

-- ── 3. Facebook lead intake (deduplication + funnel) ──
CREATE TABLE IF NOT EXISTS fb_leads (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id         TEXT        NOT NULL,
  campaign_id       UUID        REFERENCES fb_campaigns(id) ON DELETE SET NULL,
  facebook_lead_id  TEXT        UNIQUE NOT NULL,   -- deduplication key
  fb_ad_id          TEXT        DEFAULT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  ovg_lead_id       UUID        DEFAULT NULL,       -- links to existing leads table
  funnel_stage      TEXT        NOT NULL DEFAULT 'received'
                                CHECK (funnel_stage IN ('received','called','appointment','show','sold'))
);

CREATE INDEX IF NOT EXISTS idx_fb_leads_tenant    ON fb_leads (tenant_id);
CREATE INDEX IF NOT EXISTS idx_fb_leads_campaign  ON fb_leads (campaign_id);

-- ── 4. Daily campaign performance metrics ─────────────
CREATE TABLE IF NOT EXISTS fb_campaign_metrics (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id  UUID    NOT NULL REFERENCES fb_campaigns(id) ON DELETE CASCADE,
  tenant_id    TEXT    NOT NULL,
  date         DATE    NOT NULL,
  impressions  INT     DEFAULT 0,
  clicks       INT     DEFAULT 0,
  leads        INT     DEFAULT 0,
  spend        DECIMAL(10,2) DEFAULT 0,
  ctr          DECIMAL(5,2)  DEFAULT 0,
  cpl          DECIMAL(10,2) DEFAULT 0,
  UNIQUE (campaign_id, date)
);

CREATE INDEX IF NOT EXISTS idx_fb_metrics_tenant   ON fb_campaign_metrics (tenant_id);
CREATE INDEX IF NOT EXISTS idx_fb_metrics_campaign ON fb_campaign_metrics (campaign_id);

-- ── 5. Helper function: atomic package usage increment ─
CREATE OR REPLACE FUNCTION increment_fb_packages_used(tenant_id_arg TEXT)
RETURNS VOID AS $$
  UPDATE tenants
  SET fb_ads_packages_used = COALESCE(fb_ads_packages_used, 0) + 1
  WHERE id = tenant_id_arg;
$$ LANGUAGE sql;

-- ── 6. Monthly reset (call from a cron job on the 1st) ─
CREATE OR REPLACE FUNCTION reset_fb_monthly_usage()
RETURNS VOID AS $$
  UPDATE tenants
  SET fb_ads_packages_used = 0,
      fb_ads_leads_used    = 0;
$$ LANGUAGE sql;

-- ── 7. Row-level security (multi-tenant isolation) ─────
ALTER TABLE fb_campaigns      ENABLE ROW LEVEL SECURITY;
ALTER TABLE fb_leads           ENABLE ROW LEVEL SECURITY;
ALTER TABLE fb_campaign_metrics ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (used by OVG server-side)
-- Anon/authenticated roles are restricted to their own tenant
CREATE POLICY "tenant_isolation_campaigns" ON fb_campaigns
  USING (tenant_id = current_setting('app.tenant_id', true));

CREATE POLICY "tenant_isolation_leads" ON fb_leads
  USING (tenant_id = current_setting('app.tenant_id', true));

CREATE POLICY "tenant_isolation_metrics" ON fb_campaign_metrics
  USING (tenant_id = current_setting('app.tenant_id', true));
