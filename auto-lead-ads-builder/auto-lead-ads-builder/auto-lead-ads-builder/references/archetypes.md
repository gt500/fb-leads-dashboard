# Campaign Archetypes — Full Reference

Derived from the 25 top-performing Facebook/Meta automotive lead ad campaigns dataset (2023–2026). Each archetype contains the complete structural playbook extracted from Elite-tier campaign analysis.

---

## Archetype A — Zero Deposit / Sign & Drive

**Source campaigns:** #1 (O'Fallon Buick GMC — $22.50 CPL, 988% ROI, 8.77% CTR)

**What makes it work:**
The financial barrier removal mechanic targets buyers who want a specific vehicle but are blocked by the idea of a large upfront payment. "$0 down" is not about the money — it's about removing the psychological obstacle. The time-limited event format creates urgency that steady-state campaigns cannot.

**Targeting stack:**
- Geo: 20–30 mile radius from dealership
- Age: 25–55
- Layer 1 (retarget): VDP visitors — viewed 3+ vehicle detail pages, no purchase
- Layer 2 (retarget): CRM — past enquiries not purchased, last 6–18 months
- Layer 3 (lookalike): 2% lookalike of past purchasers from CRM
- Layer 4 (cold): FB In-Market: New Vehicles + payment/financing interest
- Credit overlay: Credit-qualified signals only (Sign & Drive requires approval)
- Exclusions: Past 30-day purchasers · Service-only customers · Age <22

**Copy architecture:**
- Hook: ZERO DOWN. DRIVE HOME TODAY. (visual: bold $0 graphic overlay on vehicle hero shot)
- Headline: "$0 Down — Drive Home Today"
- Sub-headline: "No payments for 30 days — new [Model] from $XXX/month"
- Body: "Don't wait. [Dealership] has [X] vehicles ready. This offer ends Sunday."
- CTA: GET MY OFFER

**Instant Form:**
- Type: Higher Intent (event format — filter browsers)
- Intro: "Claim your $0 Down offer — takes 45 seconds"
- Auto-fill: First Name, Last Name, Phone, Email
- Custom Q: "Are you ready to drive this week?" → Yes / In 30 days / Just browsing
- Review step: YES
- Thank-you: "Your offer is reserved. A specialist will call you within 5 minutes." + Call Now button

**Funnel sequence:**
1. Day -3 to -1: Organic posts on dealership page — "Big event coming this week." Pixel fires. Email blast to CRM.
2. Day 1–6: Lead ad runs 24/7. BDC CRM webhook — call <5 min, text <2 min.
3. Lead → Appt: Specific time slot offered (never "come in anytime"). SMS confirmation sent.
4. Pre-visit (24hr before): Covideo personalised video from salesperson — name-checks exact vehicle.
5. Post-event (72hr): Non-converters see testimonial ad — "I drove home same day — zero down."

**Benchmarks:** CTR 8.77% · CVR 18.1% · CPL $22.50 · Show Rate 41% · 62 units / 6-day event

**SA Adaptation:**
- "R0 Deposit" or "Zero Initiation Fee"
- "From R3,999/month — no initiation fee" (NCA note: add "subject to approval, T&Cs apply")
- Metro 30km radius, age 25–55, estimated HHI R25K+/month
- Target: Gauteng, Cape Town, Durban metros for broadest qualified pool

---

## Archetype B — VIP Voucher / Upgrade Event

**Source campaigns:** #5 (Multi-Dealership 5-location event — 47% show rate, highest in dataset)

**What makes it work:**
Exclusivity framing combined with ownership psychology. When a voucher number is assigned on form submit, the lead feels they've already "claimed" something — they're psychologically committed to showing up to use it. Multi-rooftop works with geo-exclusion. The 47% show rate (vs. dataset average ~35%) is the headline metric.

**Targeting stack:**
- Geo: 25-mile radius per store with geo-exclusion between locations (prevent internal cannibalisation)
- Age: 30–55
- Layer 1 (retarget): Service customer CRM — last 24 months, high-trust warm audience
- Layer 2 (signals): Vehicle owners 3–6 years old (upgrade-prime window)
- Layer 3 (proxy): Positive equity proxy — owners who have likely paid down their loan
- Layer 4 (lookalike): 1% lookalike of sedan→SUV upgraders from DMS trade-in data
- Exclusions: Recent purchasers (90 days) · Lease drivers (no equity argument) · Age <28

**Copy architecture:**
- Hook: "YOUR UPGRADE VOUCHER IS READY" (visual: luxury voucher card graphic, vehicle behind)
- Headline: "You've Been Selected — Claim Your VIP Upgrade Voucher"
- Sub-headline: "Limited vouchers per store. Claim yours before [date]."
- Body: "Trade in your [current vehicle] and upgrade to a new [model] — we'll handle the paperwork."
- CTA: CLAIM MY VOUCHER

**Instant Form:**
- Type: Higher Intent
- Intro: "Claim your VIP Upgrade Voucher — complete in 60 seconds"
- Auto-fill: First Name, Last Name, Phone, Email
- Custom Q 1: "What vehicle do you currently drive?" (short answer or dropdown)
- Custom Q 2: "When are you thinking of upgrading?" → This month / Within 3 months / Just exploring
- Review step: YES
- Thank-you: "Voucher #[XXXXX] assigned to you. Your nearest [Dealership] will call you within 3 minutes to confirm."

**Funnel sequence:**
1. Day -3: Organic pre-launch — "VIP Upgrade invitations going out this week."
2. Day 1–5: Voucher claim ad runs. On submit, Zapier geo-routes lead to nearest store BDC within 3 min.
3. BDC call: Framed as "confirming your voucher" — not "making an appointment." 83% BDC confirmation rate.
4. Lead → Appt: Personalised salesperson intro video sent (references their current vehicle from form).
5. On show day: Trade-in appraisal first — anchors the visit, builds equity before vehicle selection.
6. Non-converter: "12 vouchers remaining at your nearest store" urgency + testimonial.

**Benchmarks:** CTR 4.2% · CVR 9.8% · CPL $31 · Show Rate 47% (dataset high) · 41 units / 5-day event

**SA Adaptation:**
- Works for VW, Toyota, Haval, Ford, Hyundai
- Upload service database monthly (MPI records are the seed)
- "Selected Customer Upgrade Programme" framing resonates well in ZA market
- Localise voucher PDF with dealer's brand colours and expiry date

---

## Archetype C — OTT + Facebook Retarget (Cross-Channel Continuity)

**Source campaigns:** #6 (Ford NJ — 65.55% unique CVR, 90.4% video completion rate, 3,393 retargeted users/month)

**What makes it work:**
Cross-channel visual continuity. OTT (streaming TV) imprints the vehicle visually and emotionally in a lean-back, full-screen context. Facebook then retargets the SAME households via IP/device graph within 3–7 days. When the Facebook ad mirrors the OTT visual exactly, the recognition effect drives 90.4% video completion — users finish it because they remember it. Only retargeting 75%+ OTT completers ensures the Facebook audience is pre-warmed.

**Targeting stack:**
- Phase 1 (OTT): Household-level geo targeting within 20-mile radius. Served to all households regardless of demo — OTT is the awareness net.
- Phase 2 (Facebook retarget): Same households matched via IP/device graph. Time window: 3–7 days post-OTT exposure.
- Qualifier filter: ONLY retarget users who completed 75%+ of the OTT video — removes passive impressions.
- Dynamic vehicle match: Facebook VDP data shows the exact model user saw on OTT (requires catalogue + pixel setup).
- Exclusions: Recent purchasers · Already-submitted leads (exclude from retarget once they convert)

**Copy architecture:**
- Phase 1 (OTT): Brand/vehicle lifestyle. No hard CTA. Pure visual anchoring. 15–30 sec unskippable.
- Phase 2 (Facebook ad):
  - Hook: Same visual frame as OTT ad (continuity is the entire mechanism)
  - Headline: "Still thinking about the [Ford Model]? It's waiting for you."
  - Sub-headline: "Reserve your test drive — [Model] in stock now at [Dealership]."
  - Body: "You saw it. Now drive it. Our team has [X] [Models] ready this week."
  - CTA: RESERVE MY TEST DRIVE

**Instant Form:**
- Type: More Volume (warm audience — no extra friction needed)
- Auto-fill only: First Name, Last Name, Phone, Email
- Custom Q: "When would you like your test drive?" → This week / Next week / Within the month
- No review step (warm pre-qualified audience doesn't need it)
- Thank-you: "Your test drive is provisionally booked. [Name] from our team will call you within 2 minutes to confirm."

**Funnel sequence:**
1. OTT brand imprinting: 15–30 sec unskippable. No CTA. Pure visual.
2. Facebook retarget (Day 3–7): Same household matched. Recognition drives completion.
3. Lead submit: Minimal friction. Auto-fill. One-step.
4. BDC call (2-min personalised): Rep opens with exact model name. "I see you were interested in the [Model]..."
5. Weekly DMS match-back: Offline sales uploaded to Facebook weekly — closes attribution loop, feeds ROAS model and lookalike.

**Benchmarks:** Unique CVR 65.55% · 90.4% VCR · 3,393 retargeted users/month · 2,224 unique conversions/month

**SA Adaptation:**
- Replace OTT with YouTube TrueView pre-roll (same Google ecosystem IP/cookie matching)
- Premium reach option: DStv Now or Showmax pre-roll for household-level targeting
- Facebook retarget mechanic is identical — just swap the warm-up platform
- Google Display + Facebook retarget is an effective lower-cost alternative

---

## Archetype D — Negative Equity / Balloon Payment Relief

**Source campaigns:** #15 (Regional CDJR — 9.1% CTR highest in dataset, $16 CPL)

**What makes it work:**
Finance-pain first, vehicle second. The ad never leads with the vehicle — the vehicle is the solution to a financial problem. The self-selecting mechanism of pain-point copy means only genuinely negative-equity owners click. CTR of 9.1% (vs. dataset average ~5%) confirms hyper-relevance. The form collects financial data that goes to the finance team BEFORE the BDC calls — every call is informed.

**Targeting stack:**
- Geo: 20-mile radius
- Age: 25–52
- Vehicle age signals: Owners of vehicles 4–8 years old (peak negative equity / balloon maturity window)
- Financial pain signals: Interest in "auto loan help," "car payment too high," refinancing, debt consolidation
- Credit signals: Sub-prime credit behavioural indicators (Meta audience segment)
- Intent layer: FB In-Market: Trade-In Engagers
- Exclusions: HHI $100K+ equivalent (no pain point) · Lease drivers (no equity concept) · New vehicle buyers (recent)

**Copy architecture:**
- Hook: "OWE MORE THAN IT'S WORTH?" (text on screen, no vehicle shown in hero)
- Headline: "Owe more than your car is worth? We'll Pay It Off."
- Sub-headline: "Get a free appraisal — no obligation to buy anything."
- Body: "You shouldn't be stuck in a car you hate or a payment you can't afford. We've helped 200+ families get out."
- CTA: CHECK MY PAYOFF

**Instant Form:**
- Type: Higher Intent
- Intro: "Find out exactly what your vehicle is worth — takes 60 seconds."
- Auto-fill: First Name, Last Name, Phone, Email
- Custom Q 1: "What vehicle do you currently own?" (Year, Make, Model)
- Custom Q 2: "What best describes your situation?" → I owe more than it's worth / My payments are too high / I'm near the end of my finance term / I own it outright
- Review step: YES
- Thank-you: "Our finance team will review your information and call you within 10 minutes with a free appraisal estimate."

**Funnel sequence:**
1. Ad self-selection: Pain-point copy filters audience — only genuine cases click.
2. Finance team review: Form answers route to finance manager (not sales floor) before any call.
3. Finance-first BDC call: Opens with empathy. "I can see you're in a [situation]. Here's what we can do."
4. Free appraisal as next step: Low-commitment. "Come in for a free appraisal — 20 minutes, no obligation."
5. Payment comparison sheet on lot: Side-by-side: current payment vs. new payment. 40–60% close on appraisal day.
6. Testimonial retarget: "[Name] was [amount] upside down. She's now paying $50 less per month." Specific numbers only.

**Benchmarks:** CTR 9.1% (dataset highest) · CVR 13.8% · CPL $16 (dataset low)

**SA Adaptation:**
- Headline: "Stuck in a high balloon payment? We'll help you out."
- Body: "Post-2022 SARB rate increases mean thousands of South Africans are paying more than their car is worth."
- Target: Post-2020 buyers at 72–84 month loan maturity (balloon payment period)
- Finance language: MFC, WesBank, Absa, SA Home Loans balloon structures
- NCA compliance: No credit promises. Frame as "subject to NCA and credit approval."
- Finance-first call: Route to F&I manager, not BDC floor

---

## Archetype E — CPO Dynamic Carousel (Inventory Feed)

**Source campaigns:** #19 (Demand Local multi-rooftop — $1.25 CPL lowest in dataset, ROAS 8.4x, 360 leads in 60 days)

**What makes it work:**
Personalised inventory matching at scale. The daily DMS sync means users see the exact vehicle they browsed, not a generic ad. The carousel format shows the exact vehicle + 3 similar alternatives + a "See all X vehicles" card — recreating the dealership lot experience in mobile. $1.25 CPL is achievable only when the feed is set up correctly and the DMS syncs daily (stale inventory kills performance).

**Targeting stack:**
- Geo: Per-rooftop radius (15–25 miles per store)
- Intent Layer 1: FB In-Market: Used Cars
- CRM retarget: Past enquiries 6–18 months old — warm but gone cold
- VDP retarget: Specific CPO/used page viewers — strongest signal
- Inventory match: Daily DMS-synced catalogue (vehicle must be in stock to show)
- Lookalike: 1–3% lookalike of CPO past buyers from DMS
- Exclusions: Recent purchasers (60 days) · Sold vehicle enquiries (auto-removed by feed)

**Copy architecture:**
- Dynamic headline: "[Year] [Make] [Model] — [Price]" (auto-populated from DMS feed)
- Sub-headline: "Certified Pre-Owned · [Mileage] · [Key feature]"
- Body: "Still looking for the right [Make]? We have [X] certified vehicles ready for test drive today."
- CTA: SEE MY OPTIONS / BOOK A TEST DRIVE

**Carousel structure:**
- Card 1: Exact vehicle user viewed (VDP data match)
- Cards 2–4: Similar vehicles (same brand/price band ±15%)
- Card 5: "See all [X] vehicles" → dealership inventory VDP

**Instant Form:**
- Type: More Volume (ongoing 60-day campaign — CPL efficiency priority)
- Auto-fill: First Name, Last Name, Phone, Email
- Dynamic field: Vehicle of interest (auto-populated from carousel click)
- Custom Q: "When are you looking to test drive?" → This week / Next week / Within the month
- Thank-you: "We'll confirm your [Model] is available and call you within 60 seconds."

**Funnel sequence:**
1. Daily DMS sync: Inventory feed updates every night. Sold vehicles auto-removed.
2. Facebook catalogue match: Algorithm matches users to vehicles based on VDP history + purchase signals.
3. Lead submit → CRM in 60 seconds: Zapier webhook pushes lead to nearest rooftop CRM instantly.
4. Personalised BDC call: "I see you were looking at the 2022 [Model] — I can have that ready for a test drive Thursday morning."
5. Weekly DMS sale upload: Offline conversions to Facebook → closes ROAS loop → improves lookalike quality continuously.

**Benchmarks:** CTR 4.3% · CVR 9.7% · CPL $1.25 (dataset lowest) · ROAS 8.4x · 360 leads / 60 days

**SA Adaptation:**
- DMS integration: Kerridge, Evolve, CDK (request API/FTP feed credentials from DMS provider)
- Inventory source: AutoTrader SA feed, WeBuyCars export, or Cars.co.za XML feed
- Differentiator: Include Vehicle Trust Score (full service history, accident-free certificate) in carousel card — uniquely persuasive in SA used-car market
- Currency: ZAR pricing auto-populated from feed

---

## Archetype F — Trade-In / Vehicle Acquisition

**Source campaigns:** Multiple mid-tier campaigns (#8, #12, #20) + Meta best practice guidance

**What makes it work:**
Positions the dealership as the buyer, not the seller. "We want to buy your car" removes all purchase pressure. Works as a vehicle acquisition strategy (pipeline building) and as a conquest mechanism to pull buyers away from competitor brands mid-research.

**Targeting stack:**
- Geo: 20–35 mile radius
- Age: 28–58
- Vehicle ownership signals: Owners of vehicles 3–8 years old
- In-market: FB In-Market Trade-In (explicit intent signal)
- CRM retarget: Service customers + past enquiries
- Equity signals: Positive equity proxy (older vehicles, longer ownership)
- Exclusions: Recent new-car purchasers · Lease drivers · Vehicles under 2 years old

**Copy architecture:**
- Hook: "WE WANT TO BUY YOUR CAR" (no vehicle shown — the user's car is the product)
- Headline: "Find Out What Your [Make] Is Worth Today"
- Sub-headline: "Free online appraisal — takes 60 seconds. No obligation."
- Body: "We're actively buying [Make/segment] vehicles this month. Get your offer before you shop anywhere else."
- CTA: GET MY VALUE

**Instant Form:**
- Type: More Volume (volume-first for acquisition pipeline)
- Auto-fill: First Name, Last Name, Phone, Email
- Custom Q 1: "What vehicle are you selling?" (Year, Make, Model)
- Custom Q 2: "What's the approximate mileage?" (short answer or range dropdown)
- Thank-you: "Your appraisal request is in. Our buying team will call you within 5 minutes with a market value estimate."

**Benchmarks:** CTR 5–7% typical · CPL $18–$28 range

---

## Archetype G — Model-Specific VDP Push

**Source campaigns:** Multiple campaigns (#3, #9, #16) — Toyota, Ford, Honda model-specific

**What makes it work:**
Confirmation, not persuasion. The user is already researching this model — the ad's job is to confirm their choice and make the test drive the obvious next step. Links directly to the VDP, not a generic inventory page. Mobile-first model ads see 1.7x higher engagement.

**Copy architecture:**
- Headline: "[Year] [Model] — [Standout spec or offer]"
- Sub-headline: "[X] in stock at [Dealership] · Test drive available today"
- Body: "The [Model] you've been researching is here. [Key differentiator feature]. From $XXX/month."
- CTA: BOOK TEST DRIVE

**Form:** Minimal — auto-fill + test drive timing only. Warm intent audience, no friction needed.

---

## Archetype H — Trust / Social Proof

**Source campaigns:** Multiple retarget layers across dataset (#2, #7, #11, #24)

**What makes it work:**
Hesitation removal for non-converters. Used as retarget only — not as cold audience ad. Review-rich ads deliver up to 3x more engagement. Most effective when testimonials use specific numbers: "$187/month less" beats "saved money."

**Copy architecture:**
- Headline: "4.8★ from 210 Buyers — See Why [Area] Drivers Choose Us"
- Sub-headline: "[Specific testimonial quote in quotes, 12 words max]"
- Body: "[Name], [suburb]: '[Concise testimonial with specific outcome].'"
- CTA: SEE WHAT THEY DROVE AWAY IN

**Targeting:** Retarget only — website visitors, form abandoners, VDP viewers who did not submit. Never run as cold audience.
