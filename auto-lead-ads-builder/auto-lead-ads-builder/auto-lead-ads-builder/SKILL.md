---
name: auto-lead-ads-builder
description: |
  Generate complete Facebook/Meta lead ad variants for automotive dealerships - new cars, used cars, CPO, trade-in, negative equity, and event-based campaigns. Use when the user wants to create, write, or build Facebook lead ads for a car dealership, auto group, or automotive campaign. Triggers include: write a Facebook ad for my dealership, generate lead ad variants, build a car ad campaign, create automotive Facebook ads, generate ad copy for my dealership, give me a lead form structure, build a sign and drive ad, write a zero down ad, CPO Facebook ad, trade-in Facebook ad, negative equity ad. Encodes the structural rules and targeting frameworks derived from 25 top-performing automotive lead ad campaigns (2023-2026) and Meta automotive lead guidance. Produces ready-to-run ad packages: hook, primary headline, sub-headline, body copy, CTA, Instant Form structure, targeting parameters, funnel sequence, and SA/global market adaptation notes.
metadata:
  version: '1.0'
  author: SocialSynapse
  dataset: 25 top-performing FB automotive lead campaigns 2023-2026
---

# Auto Lead Ads Builder

## When to Use This Skill

Load this skill when the user asks you to:
- Write, generate, or create Facebook/Meta lead ads for a car dealership
- Build ad variants for any automotive campaign type (new, used, CPO, event, trade-in, negative equity, OTT retarget, conquest)
- Create a lead form (Instant Form) structure for automotive
- Build a complete ad package with targeting + copy + funnel
- Adapt automotive ad frameworks for specific markets (South Africa, UK, US, AU)

---

## Step-by-Step Workflow

### Step 1 — Intake

Before generating anything, collect these inputs from the user. If they haven't provided them, ask:

**Required:**
| Field | Question |
|---|---|
| Campaign type | New car / Used/CPO / Trade-in / Negative equity / Event / OTT retarget / Conquest |
| Make/model (or segment) | Specific model or general (SUVs, bakkies, sedans, etc.) |
| Core offer | Zero deposit? Fixed monthly payment? Voucher? Clearance? Trade payoff? |
| Duration | Event (3–7 days) / Ongoing (30–90 day) |
| Market | South Africa / US / UK / AU / Other |

**Optional (improves output quality):**
- Dealership name
- Target customer (upgraders, first-time buyers, negative equity, fleet, etc.)
- Monthly payment figure or price point
- Any existing creative assets (images/video — user can attach or describe)
- CRM/BDC setup (will tailor funnel SLA guidance)

If the user provides assets (images, video), describe how they should be used in the creative brief.

---

### Step 2 — Select the Campaign Archetype

Match the user's brief to the correct archetype from the Elite Playbook. Each archetype has proven structural rules derived from the top-performing dataset.

Load the full archetype data from `references/archetypes.md`.

| Archetype | Best For | Benchmark CPL | Benchmark CTR |
|---|---|---|---|
| **A — Zero Deposit / Sign & Drive** | New car launch, event, payment-sensitive buyers | $16–$31 | 6–9% |
| **B — VIP Voucher / Upgrade Event** | SUV upgrades, service database, multi-rooftop events | $28–$35 | 3.5–5% |
| **C — OTT + Facebook Retarget** | Long-cycle shoppers, brand imprinting, 90-day campaigns | N/A (CVR 60–65%) | N/A |
| **D — Negative Equity / Balloon Relief** | High-rate loan holders, 4–8yr vehicle owners, sub-prime | $14–$22 | 8–10% |
| **E — CPO Dynamic Carousel** | Used/CPO inventory, multi-rooftop, retarget past enquiries | $1–$3 | 3–5% |
| **F — Trade-In / Equity Capture** | Vehicle acquisition, conquest, service customer conversion | $18–$28 | 4–7% |
| **G — Model-Specific VDP Push** | Single-model campaigns, in-stock urgency, conquest | $20–$35 | 3–6% |
| **H — Trust / Social Proof** | Brand awareness, competitive conquest, hesitation removal | $25–$45 | 2–4% |

---

### Step 3 — Generate the Ad Package

For each ad variant requested, produce a complete package in this format:

#### AD PACKAGE FORMAT

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AD VARIANT [N] — [ARCHETYPE NAME]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATIVE BRIEF
──────────────
Format:       [Single image / Carousel / Video / Reel / Story]
Visual:       [Describe the ideal creative — what should be shown, any text overlays,
              colour/brand notes. Reference attached asset if provided.]

COPY
──────────────
Hook (0–0.3s):    [If video — on-screen text or first spoken line]
Primary Headline: [Main Facebook ad headline — benefit-first, ≤8 words]
Sub-Headline:     [Secondary line — specifics, payment, or urgency]
Body Copy:        [1–3 lines. Pain or desire, then bridge to offer. No jargon.]
CTA Button:       [Exact CTA text — never "Learn More"]

INSTANT FORM
──────────────
Form Type:    [Higher Intent — recommended for events / More Volume — for ongoing]
Intro Screen: [Hook line + what happens next]
Auto-fill:    First Name · Last Name · Phone · Email
Custom Q 1:   [The qualifying question — multiple choice preferred]
Custom Q 2:   [Optional second qualifier if needed — omit for simpler campaigns]
Review Step:  YES — always include on Higher Intent forms
Thank-You:    [Confirmation message + response SLA expectation]

TARGETING
──────────────
Geo:              [Radius + any geo-exclusions]
Age:              [Age range]
Audiences:        [Layered in priority order]
Exclusions:       [Critical — what to block]
Lookalike:        [Seed audience + % range]
Budget signal:    [Daily budget range based on geo + duration]

FUNNEL SEQUENCE
──────────────
Pre-launch:       [Organic / email warm-up steps]
Active phase:     [Ad delivery + BDC SLA]
Lead → Appt:      [Speed-to-lead script note]
Show rate lever:  [Pre-visit engagement step]
Non-converter:    [Retarget approach]
```

---

### Step 4 — Generate SA Adaptation (if market = South Africa)

Automatically append an SA Adaptation block to every package:

```
SA ADAPTATION
──────────────
Finance framing:    [Localised payment language — balloon, linked instalment, etc.]
Currency:           [ZAR equivalents for any $ figures]
Platform note:      [Any SA-specific platform swap — e.g., YouTube vs OTT]
Credit context:     [NCA-compliant framing — avoid credit promises]
DMS/inventory:      [Recommended SA integrations — Kerridge, Evolve, AutoTrader feed]
Competitor note:    [Relevant SA-specific context if applicable]
```

---

### Step 5 — Variant Matrix (optional, if user requests multiple variants)

When the user asks for variants or "multiple options", produce a 3-variant matrix:

| | Variant A | Variant B | Variant C |
|---|---|---|---|
| Angle | Offer-led | Urgency-led | Emotion/aspiration |
| Hook | [text] | [text] | [text] |
| Headline | [text] | [text] | [text] |
| Form type | Higher Intent | More Volume | Higher Intent |
| Expected CPL | Lower vol, higher quality | Higher vol, lower quality | Mid |

Always recommend **Variant A** as the default to launch first, then A/B test against B.

---

## Core Rules (Encode in Every Ad)

These rules are derived from the 25-campaign dataset. Never violate them.

### Copy Rules
1. **Benefit in the first 3 words** of every headline. Never lead with dealership name.
2. **One offer per ad.** Never stack multiple promotions in one creative.
3. **Specificity beats vagueness.** "From R3,999/month" beats "affordable payments."
4. **CTA must be action-specific.** Never use "Learn More." Use: GET MY OFFER / CLAIM VOUCHER / BOOK TEST DRIVE / CHECK MY PAYOFF / SEE MY OPTIONS.
5. **Pain-first for trade-in/negative equity ads.** The vehicle is the solution to a financial problem — never lead with the car.
6. **Continuity between ad and form.** The form intro must mirror the ad headline. Jarring transitions kill conversion.
7. **Set response expectations on thank-you screen.** "A specialist will call you within 5 minutes" outperforms generic thank-yous.

### Form Rules
1. **Use Higher Intent for events** (adds review step, filters browsers). Use More Volume for ongoing 30–90 day campaigns only when CPL efficiency matters more than quality.
2. **Maximum 2 custom questions.** Every additional question drops completion rate ~15%.
3. **The qualifying question should segment urgency**, not just interest. "When are you ready to drive?" (This week / This month / Just exploring) is more useful than "Are you interested in buying?"
4. **Phone number confirmation field** (manual re-entry) dramatically improves contact rate — Meta auto-fill phone numbers are often incorrect.
5. **Form intro must state what happens next** — removes anxiety about being called.

### Targeting Rules
1. **Start with 15–30 mile radius.** 71.6% of sales occur within 10 miles of the dealership.
2. **Layer audiences in priority order:** (1) CRM retarget → (2) VDP retarget → (3) In-market signals → (4) Lookalike → (5) Interest/demo broad.
3. **Always exclude recent purchasers** (30–90 day window) and service-only customers.
4. **VDP retarget with 10+ page views in 10 days** is the highest-intent signal available.
5. **1–3% lookalike of past buyers** outperforms broader interest targeting at scale.
6. **For negative equity/trade campaigns:** exclude HHI $100K+ equivalent and lease drivers — they don't have the pain point.
7. **For multi-rooftop campaigns:** apply geo-exclusion zones between locations to prevent internal cannibalisation.

### Funnel Rules
1. **Sub-5 minute BDC response** is the single biggest variable affecting show rate. Encode this in every funnel spec.
2. **SMS confirmation beats email confirmation** for appointment retention.
3. **Personalised pre-visit video** (Covideo or equivalent) referencing the exact vehicle increases show rate.
4. **Non-converter retarget must use social proof, not the same ad.** Testimonial format: "[Name] had [exact problem]. Now they're paying [specific outcome]."
5. **Pre-launch organic posts** (3 days before event) prime the audience and reduce CPL by warming the pixel.

---

## Instant Form Field Reference

```
FORM TYPE OPTIONS:
  More Volume    → No review step. Lower friction. More leads, lower quality.
                   Best for: ongoing inventory campaigns, 30–90 day runs.
  Higher Intent  → Review step before submit. OTP phone verification optional.
                   Best for: events, high-CPL campaigns, BDC-heavy operations.

STANDARD AUTO-FILL FIELDS (always include):
  - First Name
  - Last Name  
  - Phone Number (add manual confirmation field for quality)
  - Email

QUALIFYING QUESTIONS (choose 1–2 max):

  Purchase Timeline:
    "When are you looking to drive your next vehicle?"
    □ This week  □ Within 30 days  □ Within 3 months  □ Just exploring

  Trade-in signal:
    "Do you have a vehicle to trade in?"
    □ Yes  □ No  □ Not sure

  Loan situation (negative equity campaigns):
    "What best describes your current vehicle situation?"
    □ I owe more than it's worth  □ I'm near the end of my finance term
    □ I own it outright  □ I'm currently leasing

  Upgrade readiness (VIP/voucher campaigns):
    "How long have you owned your current vehicle?"
    □ Under 2 years  □ 2–4 years  □ 4–6 years  □ Over 6 years

  Test drive timing:
    "When would you like to test drive?"
    □ This week  □ Next week  □ Within the month

  Budget/payment comfort:
    "What monthly payment range works for you?"
    □ Under R3,500  □ R3,500–R5,000  □ R5,000–R7,000  □ R7,000+

THANK-YOU SCREEN TEMPLATE:
  Headline: "Your [offer name] is reserved."
  Body:     "One of our specialists will call you within [X] minutes 
             to confirm your [appointment / offer / appraisal]."
  Button:   "Call Us Now" → tel: link  (critical — catches immediate intent)
```

---

## Campaign Archetype Quick Reference

Full archetype details are in `references/archetypes.md`. Summary:

**Archetype A — Zero Deposit / Sign & Drive**
Core mechanic: financial barrier removal. Works on payment-sensitive buyers in the 25–55 bracket. Event format (3–7 days) outperforms ongoing. Speed-to-lead is the conversion lever.

**Archetype B — VIP Voucher / Upgrade Event**
Core mechanic: exclusivity + assigned ownership. A voucher number creates psychological ownership before the visit. Multi-rooftop works with geo-exclusion. Highest show rates in the dataset (47%).

**Archetype C — OTT + Facebook Retarget**
Core mechanic: cross-channel visual continuity. OTT imprints the vehicle visually; Facebook retarget triggers recognition. Only retarget 75%+ video completers. Requires IP/device graph matching. SA version: YouTube pre-roll → Facebook retarget.

**Archetype D — Negative Equity / Balloon Relief**
Core mechanic: financial pain → relief. Finance-first messaging, not vehicle-first. Highest CTR in dataset (9.1%). Form answers go to finance team before BDC calls. SA version: "stuck in a high balloon payment?" framing.

**Archetype E — CPO Dynamic Carousel**
Core mechanic: personalised inventory matching. Lowest CPL in dataset ($1.25). Daily DMS sync removes sold vehicles automatically. Carousel shows the exact vehicle user viewed + 3 similar. SA version: AutoTrader / WeBuyCars feed or Kerridge/Evolve DMS.

**Archetype F — Trade-In / Equity Capture**
Core mechanic: vehicle acquisition framing. Position as "we want to buy your car" — not a trade pitch. Works for used inventory pipeline. Qualifies on vehicle age and condition via form.

**Archetype G — Model-Specific VDP Push**
Core mechanic: intent confirmation. User is already researching — the ad confirms their choice. Links directly to the VDP. Mobile-first model ads see 1.7x higher engagement.

**Archetype H — Trust / Social Proof**
Core mechanic: hesitation removal. Review overlays, "4.8★ from 210 buyers," warranty callouts. Pairs well as retarget layer for non-converters from any archetype.

---

## Output Formatting Rules for Claude

When delivering ad packages to the user:

1. **Always show the complete package** — copy, form, targeting, and funnel in one block. Never truncate to "just the headlines."
2. **Separate variants with visible dividers** (━━━ lines).
3. **Bold every field label.** The user should be able to scan and fill in a brief form.
4. **Include the SA Adaptation block automatically** if the user is South Africa-based or mentions ZAR, rands, SA, or South African markets.
5. **Offer to generate the XLSX export** of all variants after delivering the packages — useful for sharing with BDC teams.
6. **If the user attaches images or video**, describe exactly how they should be used in the Creative Brief section — aspect ratio, text overlay position, duration (for video).
7. **After delivering the ad package**, always offer: "Want me to build the landing page / lead form preview, generate 3 headline A/B variants, or adapt this for Instagram Stories format?"

---

## Market Adaptation Reference

### South Africa
- Replace "$0 down" with "R0 Deposit" or "Zero Initiation Fee"  
- Always use "from RX,XXX/month" — monthly payment framing dominates SA
- NCA compliance note: never promise credit approval in ad copy — use "subject to approval" or "T&Cs apply"
- Finance products: linked instalment, balloon payment (PEP), operating lease — know which the campaign targets
- OTT equivalent: YouTube TrueView pre-roll (not Hulu/Peacock) or DStv Now / Showmax
- DMS integrations: Kerridge, Evolve, CDK (common SA DMS platforms)
- Inventory feeds: AutoTrader SA, WeBuyCars, Cars.co.za
- High-rate balloon context: post-2022 SARB rate cycle means many 2020–2022 buyers are at the top of their balloon payments — Archetype D is particularly high-performing
- Competitor territory: use geo-exclusion and conquest radius carefully — SA towns often have limited geo separation

### United States
- "$0 down" and "no payments for 30/60/90 days" are legal and effective
- Incentive stacking (manufacturer rebate + dealer discount + 0% APR) common — pick ONE for ad framing
- OTT: Hulu, Peacock, YouTube — full IP/device graph retarget available
- DMS integrations: CDK, Reynolds & Reynolds, DealerSocket, VinSolutions
- ROAS target benchmark: 2:1 minimum; Elite tier hits 8–10x

### United Kingdom
- "£0 deposit" framing; FCA compliance — no misleading payment claims
- PCP (Personal Contract Purchase) is dominant finance product — frame ads around monthly PCP payments
- GDPR consent required on form — add consent checkbox
- OTT: Sky AdSmart, Channel 4 BVOD for cross-channel continuity

### Australia
- "Drive away from $X/week" payment framing common
- Chattel mortgage / novated lease for fleet campaigns
- Meta targeting: automotive interest audiences slightly smaller than US — go 20–40 mile radius

---

## Quality Checklist Before Delivering

Before presenting any ad package, verify:

- [ ] Headline leads with benefit, not dealership name
- [ ] CTA is action-specific (not "Learn More")
- [ ] Form has ≤2 custom questions
- [ ] Qualifying question segments urgency, not just interest
- [ ] Thank-you screen includes response time promise
- [ ] Targeting includes exclusions (recent buyers, service-only)
- [ ] Funnel specifies BDC response SLA (≤5 min)
- [ ] SA adaptation block included if relevant market
- [ ] No credit promises in copy (NCA/FCA/FTC compliant framing)
- [ ] One offer per ad — no stacked promotions
