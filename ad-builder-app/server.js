import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

// ── Supabase client (optional — only active when env vars are set) ─────────────
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null;

// ── Tenant auth middleware ─────────────────────────────────────────────────────
// When embedded in OVG, requests include X-Tenant-ID and X-Api-Key headers.
// In local dev (no OVG_API_URL set) auth is skipped.
function tenantAuth(req, res, next) {
  if (!process.env.OVG_API_URL) return next(); // local dev — skip
  const tenantId = req.headers['x-tenant-id'];
  const apiKey   = req.headers['x-api-key'];
  if (!tenantId || !apiKey) {
    return res.status(401).json({ error: 'Missing tenant credentials.' });
  }
  req.tenantId = tenantId;
  next();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SKILL_BASE = join(
  __dirname,
  '../auto-lead-ads-builder/auto-lead-ads-builder/auto-lead-ads-builder'
);

const SKILL_MD      = readFileSync(join(SKILL_BASE, 'SKILL.md'), 'utf-8');
const ARCHETYPES_MD = readFileSync(join(SKILL_BASE, 'references/archetypes.md'), 'utf-8');
const BENCHMARKS_MD = readFileSync(join(SKILL_BASE, 'references/benchmarks.md'), 'utf-8');

const SYSTEM_PROMPT = `You are the Auto Lead Ads Builder, a specialist AI for generating complete Facebook/Meta lead ad packages for automotive dealerships.

You have been trained on 25 top-performing automotive Facebook lead ad campaigns (2023–2026) and encode their structural rules exactly.

--- SKILL DEFINITION ---
${SKILL_MD}

--- FULL ARCHETYPE PLAYBOOKS ---
${ARCHETYPES_MD}

--- PERFORMANCE BENCHMARKS ---
${BENCHMARKS_MD}

---

When a user submits a campaign brief, you must:
1. Identify the best-fit archetype(s) based on their inputs
2. Generate a COMPLETE ad package following the exact AD PACKAGE FORMAT from the skill
3. Always include at least 2 copy variants (Variant A = offer-led, Variant B = urgency-led)
4. If market is South Africa, always include the SA ADAPTATION block
5. End with a brief 3-bullet "Next Steps" for the BDC/campaign manager

Format your output in clean markdown using the ━━━ dividers between variants as defined in the skill.`;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const INTEL_DIR = resolve(__dirname, '../Facebook Lead Ads Intelligence');

// ── Campaign dataset (25 top-performing campaigns 2023-2026) ──────────────────
const ADS = [
  // ── ELITE TIER (11) ──────────────────────────────────────────────────────────
  { id:1,  rank:1,  name:"Zero Deposit Sign & Drive — Buick GMC",        dealership:"O'Fallon Buick GMC",         country:"US", year:2024, vehicleType:"new",  performanceTier:"elite", adFormat:"Single Image", campaignTheme:"Zero Deposit / Sign & Drive",   primaryOffer:"$0 Down, Drive Home Today",         targeting:"20mi radius · VDP retarget · CRM · 2% LAL · In-Market", formType:"Higher Intent", ctr:8.77, cvr:18.1, cpl:22.50, roi:988,  unitsSold:62,  showRate:41 },
  { id:2,  rank:2,  name:"Negative Equity Balloon Relief — CDJR",        dealership:"Regional CDJR",              country:"US", year:2023, vehicleType:"new",  performanceTier:"elite", adFormat:"Single Image", campaignTheme:"Negative Equity / Balloon Relief", primaryOffer:"We'll Pay It Off",                 targeting:"20mi · 4-8yr vehicle owners · sub-prime signals",        formType:"Higher Intent", ctr:9.10, cvr:13.8, cpl:16.00, roi:740,  unitsSold:47,  showRate:38 },
  { id:3,  rank:3,  name:"OTT + Facebook Retarget — Ford NJ",            dealership:"Ford of NJ",                 country:"US", year:2024, vehicleType:"new",  performanceTier:"elite", adFormat:"Video",        campaignTheme:"OTT + Facebook Retarget",          primaryOffer:"Still thinking about the F-150?",  targeting:"Household geo · 75%+ video completers retarget",         formType:"More Volume",   ctr:4.20, cvr:65.6, cpl:28.00, roi:620,  unitsSold:89,  showRate:52 },
  { id:4,  rank:4,  name:"CPO Dynamic Carousel — Demand Local",          dealership:"Demand Local (multi-rooftop)",country:"US", year:2024, vehicleType:"used", performanceTier:"elite", adFormat:"Carousel",     campaignTheme:"CPO Dynamic Carousel",             primaryOffer:"See Your Exact Match — CPO Inventory", targeting:"15-25mi per rooftop · VDP retarget · CRM 6-18mo",      formType:"More Volume",   ctr:4.30, cvr:9.70, cpl:1.25,  roi:840,  unitsSold:180, showRate:32 },
  { id:5,  rank:5,  name:"VIP Upgrade Voucher — 5-Location Event",       dealership:"Multi-Dealer Group",         country:"US", year:2024, vehicleType:"new",  performanceTier:"elite", adFormat:"Single Image", campaignTheme:"VIP Voucher / Upgrade Event",       primaryOffer:"Your VIP Upgrade Voucher Is Ready", targeting:"25mi per store · geo-exclusion · service CRM · 1% LAL", formType:"Higher Intent", ctr:4.20, cvr:9.80, cpl:31.00, roi:580,  unitsSold:41,  showRate:47 },
  { id:6,  rank:6,  name:"Zero Deposit Launch — VW Gauteng",             dealership:"Volkswagen Randburg",         country:"ZA", year:2025, vehicleType:"new",  performanceTier:"elite", adFormat:"Single Image", campaignTheme:"Zero Deposit / Sign & Drive",   primaryOffer:"R0 Deposit — Drive Home This Weekend", targeting:"30km radius · VDP retarget · CRM · 2% LAL",           formType:"Higher Intent", ctr:7.40, cvr:15.3, cpl:19.00, roi:720,  unitsSold:45,  showRate:43 },
  { id:7,  rank:7,  name:"Trade-In Equity Capture — BMW SA",             dealership:"BMW Cape Town",               country:"ZA", year:2024, vehicleType:"used", performanceTier:"elite", adFormat:"Single Image", campaignTheme:"Trade-In / Equity Capture",         primaryOffer:"We Want to Buy Your Car",           targeting:"35km · 3-8yr vehicle owners · In-Market Trade-In",      formType:"More Volume",   ctr:6.80, cvr:11.2, cpl:18.00, roi:510,  unitsSold:28,  showRate:38 },
  { id:8,  rank:8,  name:"CPO Carousel Retarget — Honda Multi-Rooftop",  dealership:"Honda SA (3 locations)",      country:"ZA", year:2024, vehicleType:"used", performanceTier:"elite", adFormat:"Carousel",     campaignTheme:"CPO Dynamic Carousel",             primaryOffer:"Certified Pre-Owned — See Yours", targeting:"25km per store · daily DMS sync · VDP 10+ views",       formType:"More Volume",   ctr:5.20, cvr:9.70, cpl:3.00,  roi:780,  unitsSold:156, showRate:30 },
  { id:9,  rank:9,  name:"Balloon Relief Campaign — Toyota SA",          dealership:"Toyota Centurion",            country:"ZA", year:2024, vehicleType:"new",  performanceTier:"elite", adFormat:"Single Image", campaignTheme:"Negative Equity / Balloon Relief", primaryOffer:"Stuck in a High Balloon? We'll Help", targeting:"30km · 72-84mo loan maturity · post-SARB signals",      formType:"Higher Intent", ctr:8.40, cvr:12.1, cpl:18.00, roi:690,  unitsSold:38,  showRate:40 },
  { id:10, rank:10, name:"Mercedes Trade-In Conquest — JHB",             dealership:"Mercedes-Benz Johannesburg",  country:"ZA", year:2024, vehicleType:"used", performanceTier:"elite", adFormat:"Single Image", campaignTheme:"Trade-In / Equity Capture",         primaryOffer:"Find Out What Your Merc Is Worth", targeting:"40km · 3-8yr MB owners · positive equity proxy",        formType:"More Volume",   ctr:5.50, cvr:10.8, cpl:22.00, roi:460,  unitsSold:24,  showRate:36 },
  { id:11, rank:11, name:"VDP Push — Hilux Legend In-Stock",             dealership:"Toyota Durban",               country:"ZA", year:2025, vehicleType:"new",  performanceTier:"elite", adFormat:"Single Image", campaignTheme:"Model-Specific VDP Push",           primaryOffer:"Hilux Legend — 14 In Stock, Sandton", targeting:"35km · In-Market New Trucks · VDP visitors",           formType:"Higher Intent", ctr:3.80, cvr:8.20, cpl:24.00, roi:480,  unitsSold:33,  showRate:35 },

  // ── TOP TIER (9) ─────────────────────────────────────────────────────────────
  { id:12, rank:12, name:"Zero Deposit Event — Kia SA",                  dealership:"Kia Midrand",                 country:"ZA", year:2025, vehicleType:"new",  performanceTier:"top",   adFormat:"Single Image", campaignTheme:"Zero Deposit / Sign & Drive",   primaryOffer:"R0 Deposit — Kia Sportage Weekend", targeting:"30km · VDP retarget · 1% LAL · In-Market",            formType:"Higher Intent", ctr:4.20, cvr:9.10, cpl:42.00, roi:360,  unitsSold:22,  showRate:34 },
  { id:13, rank:13, name:"Used CPO Carousel — Ford SA",                  dealership:"Ford Centurion",               country:"ZA", year:2023, vehicleType:"used", performanceTier:"top",   adFormat:"Carousel",     campaignTheme:"CPO Dynamic Carousel",             primaryOffer:"Certified Pre-Owned — From R189,000", targeting:"25km · CRM 6-18mo · VDP retarget · DMS sync",          formType:"More Volume",   ctr:3.90, cvr:7.20, cpl:8.00,  roi:620,  unitsSold:78,  showRate:29 },
  { id:14, rank:14, name:"Hilux Event — Sign & Drive",                   dealership:"Toyota Pretoria",              country:"ZA", year:2024, vehicleType:"new",  performanceTier:"top",   adFormat:"Video",        campaignTheme:"Zero Deposit / Sign & Drive",   primaryOffer:"Drive a New Hilux — R0 This Weekend", targeting:"35km · bakkies interest · VDP retarget",               formType:"Higher Intent", ctr:4.80, cvr:8.50, cpl:38.00, roi:310,  unitsSold:19,  showRate:33 },
  { id:15, rank:15, name:"Trade-In Capture — Mazda SA",                  dealership:"Mazda Cape Town",              country:"ZA", year:2024, vehicleType:"used", performanceTier:"top",   adFormat:"Single Image", campaignTheme:"Trade-In / Equity Capture",         primaryOffer:"We'll Buy Your Mazda — Get Valued Today", targeting:"30km · 3-6yr vehicle owners · In-Market Trade-In",     formType:"More Volume",   ctr:4.70, cvr:7.80, cpl:28.00, roi:350,  unitsSold:21,  showRate:32 },
  { id:16, rank:16, name:"Nissan NP200 VDP Push",                        dealership:"Nissan Boksburg",              country:"ZA", year:2023, vehicleType:"new",  performanceTier:"top",   adFormat:"Single Image", campaignTheme:"Model-Specific VDP Push",           primaryOffer:"NP200 — 9 In Stock, Delivery This Week", targeting:"30km · bakkies interest · VDP 10+ views",             formType:"Higher Intent", ctr:3.60, cvr:6.90, cpl:35.00, roi:290,  unitsSold:18,  showRate:31 },
  { id:17, rank:17, name:"Chevrolet Sign & Drive — US Midwest",          dealership:"Silverline Chevrolet",         country:"US", year:2024, vehicleType:"new",  performanceTier:"top",   adFormat:"Single Image", campaignTheme:"Zero Deposit / Sign & Drive",   primaryOffer:"$0 Down — Equinox Weekend Special",  targeting:"25mi · VDP retarget · CRM · In-Market",               formType:"Higher Intent", ctr:4.10, cvr:7.50, cpl:45.00, roi:280,  unitsSold:16,  showRate:32 },
  { id:18, rank:18, name:"Trade-In — Subaru Pacific NW",                 dealership:"Subaru Portland",              country:"US", year:2025, vehicleType:"used", performanceTier:"top",   adFormat:"Single Image", campaignTheme:"Trade-In / Equity Capture",         primaryOffer:"Find Out What Your Subaru Is Worth", targeting:"30mi · 3-8yr Subaru owners · trade-in signals",        formType:"More Volume",   ctr:4.50, cvr:8.10, cpl:26.00, roi:320,  unitsSold:19,  showRate:33 },
  { id:19, rank:19, name:"CPO Carousel — Kia Multi-Location",            dealership:"Kia SA (4 locations)",         country:"ZA", year:2024, vehicleType:"used", performanceTier:"top",   adFormat:"Carousel",     campaignTheme:"CPO Dynamic Carousel",             primaryOffer:"Certified Kia — Priced From R129,000", targeting:"20km per rooftop · geo-exclusion · DMS sync",          formType:"More Volume",   ctr:3.80, cvr:6.20, cpl:12.00, roi:480,  unitsSold:62,  showRate:28 },
  { id:20, rank:20, name:"VIP Voucher Event — Hyundai",                  dealership:"Hyundai Menlyn",               country:"ZA", year:2025, vehicleType:"new",  performanceTier:"top",   adFormat:"Single Image", campaignTheme:"VIP Voucher / Upgrade Event",       primaryOffer:"Your Hyundai Upgrade Voucher Is Ready", targeting:"25km · service CRM · 3-6yr owners · 1% LAL",          formType:"Higher Intent", ctr:2.80, cvr:7.10, cpl:58.00, roi:260,  unitsSold:14,  showRate:34 },

  // ── STRONG TIER (5) ──────────────────────────────────────────────────────────
  { id:21, rank:21, name:"Social Proof Retarget — Mazda SA",             dealership:"Mazda Johannesburg",           country:"ZA", year:2023, vehicleType:"used", performanceTier:"strong", adFormat:"Single Image", campaignTheme:"Trust / Social Proof",              primaryOffer:"4.8★ — 210 Buyers This Year",       targeting:"Retarget: VDP visitors · form abandoners · non-converters", formType:"More Volume",  ctr:3.20, cvr:5.80, cpl:68.00, roi:190,  unitsSold:11,  showRate:28 },
  { id:22, rank:22, name:"Conquest Campaign — Nissan SA",                dealership:"Nissan Pinetown",               country:"ZA", year:2024, vehicleType:"new",  performanceTier:"strong", adFormat:"Video",        campaignTheme:"Model-Specific VDP Push",           primaryOffer:"Nissan Navara — From R459,900",     targeting:"35km · conquest Toyota/Ford HiLux owners",             formType:"Higher Intent", ctr:2.90, cvr:4.80, cpl:72.00, roi:180,  unitsSold:9,   showRate:26 },
  { id:23, rank:23, name:"Trust & Reviews — Toyota SA",                  dealership:"Toyota East Rand",             country:"ZA", year:2023, vehicleType:"new",  performanceTier:"strong", adFormat:"Single Image", campaignTheme:"Trust / Social Proof",              primaryOffer:"See Why 500+ Buyers Chose Us",     targeting:"30km · broad interest · cold prospecting",             formType:"More Volume",   ctr:1.90, cvr:4.10, cpl:75.00, roi:160,  unitsSold:8,   showRate:24 },
  { id:24, rank:24, name:"Used Car Event — Honda SA",                    dealership:"Honda Pretoria",                country:"ZA", year:2024, vehicleType:"used", performanceTier:"strong", adFormat:"Carousel",     campaignTheme:"CPO Dynamic Carousel",             primaryOffer:"Quality Used Hondas — From R89,900", targeting:"25km · In-Market Used · CRM retarget",                 formType:"More Volume",   ctr:2.40, cvr:5.20, cpl:65.00, roi:200,  unitsSold:13,  showRate:27 },
  { id:25, rank:25, name:"Social Proof — Ford SA",                       dealership:"Ford Alberton",                 country:"ZA", year:2025, vehicleType:"used", performanceTier:"strong", adFormat:"Single Image", campaignTheme:"Trust / Social Proof",              primaryOffer:"4.9★ Rated — 180 Happy Buyers",    targeting:"Retarget: all non-converters last 90 days",            formType:"More Volume",   ctr:2.10, cvr:4.60, cpl:70.00, roi:170,  unitsSold:10,  showRate:25 },
];

function calcStats() {
  const newAds  = ADS.filter(a => a.vehicleType === 'new');
  const usedAds = ADS.filter(a => a.vehicleType === 'used');
  const avg = (arr, key) => +(arr.reduce((s, a) => s + a[key], 0) / arr.length).toFixed(2);
  return {
    total:  ADS.length,
    new:    newAds.length,
    used:   usedAds.length,
    elite:  ADS.filter(a => a.performanceTier === 'elite').length,
    top:    ADS.filter(a => a.performanceTier === 'top').length,
    strong: ADS.filter(a => a.performanceTier === 'strong').length,
    overall:   { avgCvr: avg(ADS, 'cvr'),      avgCtr: avg(ADS, 'ctr'),      avgCpl: avg(ADS, 'cpl') },
    newStats:  { avgCvr: avg(newAds, 'cvr'),   avgCtr: avg(newAds, 'ctr'),   avgCpl: avg(newAds, 'cpl') },
    usedStats: { avgCvr: avg(usedAds, 'cvr'),  avgCtr: avg(usedAds, 'ctr'),  avgCpl: avg(usedAds, 'cpl') },
  };
}

// Intelligence dashboard — served at its own port so its root-based router works correctly
const intelApp = express();

// Data API must be registered BEFORE static middleware so it takes priority
intelApp.get('/port/5000/api/ads',   (_req, res) => res.json(ADS));
intelApp.get('/port/5000/api/stats', (_req, res) => res.json(calcStats()));

intelApp.use(express.static(INTEL_DIR));
intelApp.use((_req, res) => res.sendFile(resolve(INTEL_DIR, 'index.html')));
const INTEL_PORT = process.env.INTEL_PORT || 3002;
intelApp.listen(INTEL_PORT, () =>
  console.log(`Intelligence Dashboard running on http://localhost:${INTEL_PORT}`)
);

const app = express();
app.use(cors());
app.use(express.json());

// ── Plan limits (enforced via Supabase tenant record) ────────────────────────
const PLAN_LIMITS = { starter: 5, growth: 20, pro: Infinity };

async function checkPackageLimit(tenantId) {
  if (!supabase || !tenantId || tenantId === 'local') return { allowed: true };
  const { data } = await supabase
    .from('tenants')
    .select('fb_ads_plan, fb_ads_packages_used')
    .eq('id', tenantId)
    .single();
  if (!data) return { allowed: true };
  const limit = PLAN_LIMITS[data.fb_ads_plan] ?? 5;
  const used  = data.fb_ads_packages_used ?? 0;
  return { allowed: used < limit, used, limit, plan: data.fb_ads_plan };
}

async function incrementPackageUsage(tenantId) {
  if (!supabase || !tenantId || tenantId === 'local') return;
  await supabase.rpc('increment_fb_packages_used', { tenant_id_arg: tenantId });
}

app.post('/api/generate', tenantAuth, async (req, res) => {
  const { brief } = req.body;
  if (!brief) {
    return res.status(400).json({ error: 'No brief provided.' });
  }

  // Check plan limit
  const limitCheck = await checkPackageLimit(req.tenantId);
  if (!limitCheck.allowed) {
    return res.status(429).json({
      error: `Monthly limit reached (${limitCheck.used}/${limitCheck.limit} packages on ${limitCheck.plan} plan). Please upgrade to generate more.`,
      upgrade: true,
    });
  }

  const userMessage = buildUserMessage(brief);

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
    incrementPackageUsage(req.tenantId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

function buildUserMessage(brief) {
  const s = brief;
  return `Please generate a complete Facebook lead ad package for the following dealership campaign brief.

## DEALERSHIP DETAILS
- Dealership name: ${s.dealershipName || 'Not provided'}
- Brand(s): ${s.brands || 'Not provided'}
- City / Market: ${s.city || 'Not provided'}
- Country / Market: ${s.market || 'South Africa'}
- Facebook Page URL: ${s.facebookPageUrl || 'Not provided'}
- Website / VDP URL: ${s.websiteUrl || 'Not provided'}
- CRM system: ${s.crm || 'Not provided'}
- BDC response SLA: ${s.bdcSla || 'Not specified'}

## CAMPAIGN ARCHETYPE SELECTED
${s.archetype || 'Please recommend the best archetype based on the campaign details below.'}

## CAMPAIGN DETAILS
- Make / Model / Segment: ${s.makeModel || 'Not provided'}
- Core offer: ${s.coreOffer || 'Not provided'}
- Campaign type: ${s.campaignType || 'Not provided'}
- Duration / dates: ${s.duration || 'Not provided'}
- Daily budget: ${s.dailyBudget || 'Not provided'}
- Target customer: ${s.targetCustomer || 'Not provided'}
- Target age range: ${s.ageRange || 'Not provided'}
- Estimated household income: ${s.incomeLevel || 'Not provided'}
- Vehicle ownership status: ${s.vehicleOwnership || 'Not provided'}
- Finance status of target: ${s.financeStatus || 'Not provided'}
- Geographic area: ${s.geography || 'Not provided'}
- Existing audience data available: ${s.existingAudiences || 'Not specified'}

## OFFER COPY & INSTANT FORM PREFERENCES
- Headline direction (max 8 words): ${s.headlineDirection || 'Not provided'}
- Body copy notes / angle: ${s.bodyCopyNotes || 'Not provided'}
- CTA button preference: ${s.ctaPreference || 'Not specified'}
- Form type preference: ${s.formType || 'Higher Intent recommended'}
- Custom question 1 preference: ${s.customQ1 || 'Not specified'}
- Custom question 2 preference: ${s.customQ2 || 'Not specified'}
- OTP phone verification: ${s.otpVerification || 'Not specified'}
- Thank-you message direction: ${s.thankYouMessage || 'Not specified'}
- Expected response time to leads: ${s.responseTime || '5 minutes'}

## CREATIVE ASSETS
- Assets available: ${s.assetsAvailable || 'None specified'}
- Visual direction / brand notes: ${s.visualDirection || 'None specified'}

## SA MARKET FIELDS
- Finance product targeted: ${s.financeProduct || 'Not specified'}
- NCA compliance required: ${s.ncaCompliance || 'Yes'}
- DMS system: ${s.dmsSystem || 'Not specified'}
- Inventory feed: ${s.inventoryFeed || 'Not specified'}
- Balloon campaign (Archetype D relevant): ${s.balloonCampaign || 'No'}
- OTT platform preference: ${s.ottPlatform || 'YouTube TrueView'}
- ZAR monthly payment target: ${s.zarPayment || 'Not specified'}

## FUNNEL & BDC SETUP
- BDC team size: ${s.bdcTeamSize || 'Not specified'}
- BDC hours: ${s.bdcHours || 'Not specified'}
- Lead routing method: ${s.leadRouting || 'Not specified'}
- CRM integration available: ${s.crmIntegration || 'Not specified'}
- SMS tool: ${s.smsTool || 'Not specified'}
- Video tool (Covideo etc.): ${s.videoTool || 'Not specified'}
- Appointment booking system: ${s.appointmentSystem || 'Not specified'}
- Post-event retarget budget: ${s.retargetBudget || 'Not specified'}
- Additional notes: ${s.additionalNotes || 'None'}

Generate 2 complete ad variants (Offer-led and Urgency-led) plus the SA Adaptation block if applicable. Follow the exact AD PACKAGE FORMAT from the skill with ━━━ dividers.`;
}

// ── Save campaign package ──────────────────────────────────────────────────────
app.post('/api/campaigns/save', tenantAuth, async (req, res) => {
  const { brief, packageMarkdown } = req.body;
  if (!brief || !packageMarkdown) {
    return res.status(400).json({ error: 'brief and packageMarkdown are required.' });
  }

  if (!supabase) {
    // Local dev — return a fake ID so the UI still works
    return res.json({ id: randomUUID(), status: 'draft', saved: false, reason: 'no-supabase' });
  }

  const id = randomUUID();
  const { error } = await supabase.from('fb_campaigns').insert({
    id,
    tenant_id: req.tenantId || 'local',
    brief,
    package_markdown: packageMarkdown,
    status: 'draft',
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Supabase save error:', error);
    return res.status(500).json({ error: 'Failed to save campaign.' });
  }

  res.json({ id, status: 'draft', saved: true });
});

// ── Facebook OAuth callback ────────────────────────────────────────────────────
app.get('/auth/facebook/callback', async (req, res) => {
  const { code, state: tenantId } = req.query;
  if (!code || !tenantId) return res.status(400).send('Missing code or state.');

  try {
    // Exchange code for short-lived user token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token` +
      `?client_id=${process.env.FB_APP_ID}` +
      `&client_secret=${process.env.FB_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(process.env.FB_REDIRECT_URI)}` +
      `&code=${code}`
    );
    const tokenData = await tokenRes.json();
    if (tokenData.error) throw new Error(tokenData.error.message);

    // Get pages and their never-expiring page tokens
    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${tokenData.access_token}`
    );
    const pagesData = await pagesRes.json();
    const page = pagesData.data?.[0];
    if (!page) throw new Error('No Facebook pages found for this account.');

    // Get ad account
    const adRes = await fetch(
      `https://graph.facebook.com/v19.0/me/adaccounts?fields=id,name&access_token=${tokenData.access_token}`
    );
    const adData = await adRes.json();
    const adAccount = adData.data?.[0];

    if (supabase) {
      await supabase.from('tenants').update({
        fb_page_id: page.id,
        fb_page_name: page.name,
        fb_page_token: page.access_token, // never expires for pages
        fb_ad_account_id: adAccount?.id || null,
        fb_connected_at: new Date().toISOString(),
      }).eq('id', tenantId);
    }

    // Redirect back to client admin with success
    const adminUrl = process.env.OVG_API_URL
      ? `${process.env.OVG_API_URL}/admin/fb-ads?connected=true`
      : 'http://localhost:5173?connected=true';
    res.redirect(adminUrl);
  } catch (err) {
    console.error('Facebook OAuth error:', err.message);
    res.status(500).send(`OAuth failed: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Ad Builder API running on http://localhost:${PORT}`));
