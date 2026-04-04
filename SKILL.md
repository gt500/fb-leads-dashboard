Here’s a distilled, implementation-ready SKILL.md you can hand to Claude to generate code and ad variants. It encodes the structure and rules derived from top-performing automotive lead ads and Meta’s own auto lead guidance. [swiftpropel](https://swiftpropel.com/automotive-facebook-ads-examples/)

***

# SKILL: facebook_auto_lead_ads

Design and generate **high-intent Facebook Lead Ads** for motor vehicles, split into `new` and `used` (second-hand), targeting ≥12% form completion rates on Instant Forms for warm audiences. [leadsbridge](https://leadsbridge.com/blog/get-inspired-by-these-5-high-performing-facebook-lead-ads/)

The skill should output:
- Fully structured ad specs (copy, assets, form questions, targeting) as JSON.
- Optionally, ready-to-paste CSV rows for bulk upload or a config map per ad set.

***

## 1. Ad Object Schema

The assistant must always emit ads in this JSON schema:

```json
{
  "campaign_goal": "lead_generation",
  "vehicle_type": "new | used",
  "funnel_stage": "mid | bottom",
  "offer_type": "test_drive | trade_in_valuation | finance_quote | stock_alert | launch_waitlist",
  "audience": {
    "geo_radius_km": 10,
    "locations": ["Cape Town"],
    "age_range": [25, 60],
    "interests": ["SUV", "Car shopping", "AutoTrader"],
    "custom_audiences": ["site_visitors_30d", "video_viewers_50pct"],
    "exclusions": ["recent_purchasers_90d"]
  },
  "creative": {
    "format": "single_image | carousel | video",
    "primary_text": "string",
    "headline": "string",
    "description": "string",
    "cta": "LEARN_MORE | SIGN_UP | GET_QUOTE | BOOK_NOW",
    "image_guidelines": {
      "musts": [
        "Real vehicle or stock, no generic stock-only imagery",
        "Vehicle shot at 3/4 angle, clean background",
        "Legible dealership logo in a corner",
        "For used: show mileage, price badge, or 'Approved Pre-Owned'"
      ]
    },
    "video_guidelines": {
      "musts": [
        "30–45s walkaround or feature highlight",
        "Show interior + exterior + key feature (e.g. touchscreen, boot space)",
        "Add big-text overlays for price / monthly payment / key benefit"
      ]
    }
  },
  "lead_form": {
    "form_type": "higher_intent",
    "intro": {
      "headline": "string",
      "paragraph": "string"
    },
    "questions": [
      {
        "type": "predefined",
        "field": "full_name | email | phone_number"
      },
      {
        "type": "custom_short",
        "label": "When are you looking to buy?",
        "options": ["0–30 days", "1–3 months", "3–6 months", "Just browsing"]
      },
      {
        "type": "custom_short",
        "label": "Are you interested in trade-in?",
        "options": ["Yes", "No", "Maybe"]
      }
    ],
    "privacy_text": "string",
    "thank_you": {
      "header": "string",
      "description": "string",
      "cta_label": "CALL_NOW | VIEW_STOCK | WHATSAPP_US",
      "cta_link": "string"
    }
  },
  "conversion_expectation": {
    "min_form_completion_rate_pct": 12,
    "followup_sla_minutes": 5
  },
  "routing": {
    "sync_to_crm": true,
    "crm_destination": "string",
    "notification_channels": ["email", "sms", "whatsapp"]
  }
}
```

***

## 2. Strategy Rules

### 2.1 Funnel & Offer Strategy

- Use **Lead Ads with Instant Forms** at **bottom-of-funnel** for:
  - Test drive bookings.
  - Trade-in valuations.
  - Finance or payment quotes.
  - New model launch waitlists. [driftrock](https://www.driftrock.com/blog/5-examples-of-high-performing-facebook-ads-for-the-automotive-industry)
- Expect average automotive lead ad conversion of 5–10%; aim above 12% by:
  - Targeting warm audiences (site visitors, video viewers, engaged users).
  - Keeping forms short (3–5 fields plus 1–2 qualifying questions). [buyerbridge](https://buyerbridge.com/blog/13-best-practices-to-optimize-on-facebook-lead-ads/)

### 2.2 New vs Used Logic

The assistant must branch logic based on `vehicle_type`.

- **New vehicles**
  - Emphasize: OEM incentives, warranties, low monthly instalments, “sign & drive”, latest tech. [67degrees.co](https://www.67degrees.co.uk/blog/the-ultimate-guide-to-facebook-ad-campaigns-for-car-dealerships/)
  - Best offers:
    - `test_drive`
    - `finance_quote`
    - `launch_waitlist` for new models.
  - Preferred creative:
    - Studio-quality images, clean environment, brand-consistent.
    - Launch/event themes (“Sign & Drive Weekend”, “Model Year Runout”). [willowoodventures](https://willowoodventures.com/facebook-ad-examples/)

- **Used vehicles**
  - Emphasize: price, mileage, condition, history checks, limited stock, “approved pre-owned”. [driftrock](https://www.driftrock.com/blog/5-examples-of-high-performing-facebook-ads-for-the-automotive-industry)
  - Best offers:
    - `trade_in_valuation`
    - `test_drive`
    - `stock_alert` for “just arrived” units.
  - Preferred creative:
    - Actual vehicle with visible plate blurred, key stats overlay: price/mileage/one-owner, etc. [postermywall](https://www.postermywall.com/index.php/posters/search?s=facebook+ads+for+car+dealers)

***

## 3. Creative Templates

The assistant must be able to generate copy by filling these templates.

### 3.1 Primary Text Templates

1. **New vehicle – finance-focused**
   - Pattern:
     - Line 1: Big benefit + audience qualifier.
     - Line 2: Monthly from RX, limited-time incentive.
     - Line 3: Social proof or risk reversal.
     - Line 4: Clear next step (lead intent).
   - Template:
     - `Ready for your next **{segment}** in {city}?`
     - `Drive the {model} from only R{monthly} / month with {term} warranty & {service_plan} service plan included.`
     - `Trusted by {social_proof} drivers – limited units available this month.`
     - `Tap “Get Quote” to receive your personalised finance offer in minutes.`

2. **New vehicle – test drive**
   - Template:
     - `Experience the new {model} in person at {dealer_name}.`
     - `Book a FREE test drive this week and feel the {USP: hybrid efficiency / power / space} for yourself.`
     - `Pick your preferred day & time in the form – we’ll confirm within 5 minutes.`

3. **Used vehicle – price & urgency**
   - Template:
     - `This {year} {model_variant} won’t stay on the floor for long.`
     - `Only {mileage} km, full service history, priced at just R{price}.`
     - `Submit the quick form to reserve a viewing or request a video walkaround.`

4. **Used vehicle – trade-in hook**
   - Template:
     - `Thinking of upgrading your current ride in {city}?`
     - `Get an instant **trade-in estimate** and see how much lower your monthly could be on a newer {segment}.`
     - `Fill in the form with your current vehicle details – we’ll send your estimate ASAP.`

### 3.2 Headline Templates

- New:
  - `Book Your {model} Test Drive`
  - `From R{monthly}/month – {model}`
  - `Sign & Drive Event – This Weekend Only`
- Used:
  - `{year} {model} – Only {mileage} km`
  - `Get Your Trade-In Value Today`
  - `Approved Pre-Owned {segment} From R{price}`

### 3.3 Description Templates

- `Limited stock – submit the quick form and we’ll call you back in 5 minutes.`
- `Zero obligation quote, no deposit options available for qualifying customers.`
- `Local {city} dealer, nationwide delivery available on request.` [demandlocal](https://www.demandlocal.com/blog/best-practices-facebook-advertising-car-dealerships/)

***

## 4. Lead Form Design Rules

To reach ≥12% completion, enforce:

- Use **Higher Intent** form type (extra review step) when lead quality is priority. [driftrock](https://www.driftrock.com/lead-generation-ideas/facebook-lead-ads)
- Use **3 core fields max**:
  - Name (pre-filled).
  - Email (pre-filled).
  - Phone (pre-filled).
- Add **1–2 qualifying questions max**:
  - `When are you looking to buy?` with short options.
  - `Are you interested in trade-in?` yes/no/maybe. [buyerbridge](https://buyerbridge.com/blog/13-best-practices-to-optimize-on-facebook-lead-ads/)
- For used vehicles, optional extra:
  - `Current vehicle make & model` (short answer).
- Intro text must:
  - Re-state the offer clearly.
  - Reassure about speed and privacy (e.g., “We’ll contact you within 5 minutes. Your details are safe with us.”). [facebook](https://www.facebook.com/business/learn/facebook-create-ad-lead-ads-for-auto)

#### Lead Form Text Templates

- Intro headline:
  - New: `Book Your {model} Test Drive`
  - Used: `Get Your Trade-In Estimate`
- Intro paragraph:
  - `Complete this short form to {benefit: book your test drive / get your trade-in value / receive your finance quote}.`
  - `We’ll contact you within {SLA} minutes during business hours.`
- Thank-you header:
  - `Thanks – We’ve Got Your Request`
- Thank-you description:
  - `Our team at {dealer_name} will contact you shortly to confirm details.`
- Thank-you CTA:
  - Label: `CALL NOW` or `VIEW STOCK`
  - Link: dealership phone URI or stock page URL.

***

## 5. Targeting Rules

The skill must propose audiences matching:

- **Geo**:
  - Keep radius tight (e.g., 25–80 km depending on city size) unless explicit nationwide delivery is specified. [67degrees.co](https://www.67degrees.co.uk/blog/the-ultimate-guide-to-facebook-ad-campaigns-for-car-dealerships/)
- **Warm audiences first** for 12%+ conversion:
  - Website visitors (last 30 days).
  - Video viewers (50%+ watch).
  - Page engagers.
- **Interests** (for prospecting or if warm is too small):
  - `Car shopping`, `SUV`, `Hatchback`, `Electric vehicle`, `Luxury cars`, brand terms (e.g., `Toyota`, `BMW`).
- **Exclusions**:
  - Recent purchasers (if dealership has this signal).
  - Service-only customers if campaign is sales-only.

***

## 6. Creative Best Practices (Heuristics)

The assistant should enforce these heuristics in its outputs:

- Use **real stock photos** where possible; mention “actual vehicle shown” when true. [swiftpropel](https://swiftpropel.com/automotive-facebook-ads-examples/)
- Always include:
  - Price OR from-price OR monthly payment.
  - Clear dealership branding.
  - A single **primary** CTA in copy and form.
- For carousels:
  - New: show variants/trims of same model or similar models.
  - Used: show 3–5 top “hero” units with key stats on each card.
- For video:
  - Open with the car in first 2 seconds.
  - Add captions/overlays; assume many people watch muted. [ppcinfo](https://www.ppcinfo.com/en/articles/facebook-ads-automotive-2026-guide)

***

## 7. Optimization & Testing Rules

The skill should propose at least 2 variants per asset type for **A/B testing**:

- Variant levers:
  - Hook line in primary text.
  - Headline (finance vs test drive vs trade-in).
  - Image (front 3/4 vs interior feature).
- KPI assumptions:
  - Automotive lead ads can hit 5–10% conversion; warm audiences with short forms should aim 12–20%. [socialeum](https://socialeum.com/boost-facebook-lead-ads-for-car-dealers/)
- Always recommend:
  - Response within **5 minutes** to maximize appointment set rate. [driftrock](https://www.driftrock.com/blog/facebook-automotive-inventory-ads-complete-guide)
  - CRM or Google Sheet sync via integration.

***

## 8. Example Ad Specs

The assistant must be able to generate examples like the following.

### 8.1 New Vehicle Example (Test Drive)

```json
{
  "campaign_goal": "lead_generation",
  "vehicle_type": "new",
  "funnel_stage": "bottom",
  "offer_type": "test_drive",
  "audience": {
    "geo_radius_km": 40,
    "locations": ["Cape Town"],
    "age_range": [28, 60],
    "interests": ["SUV", "Hybrid vehicle", "Car shopping"],
    "custom_audiences": ["site_visitors_30d", "video_viewers_50pct"],
    "exclusions": ["recent_purchasers_90d"]
  },
  "creative": {
    "format": "single_image",
    "primary_text": "Ready for your next family SUV in Cape Town?\nDrive the all-new Gaz2Go Hybrid SUV from only R6,999 / month with 5-year warranty & 5-year service plan included.\nTrusted by thousands of SA drivers – limited launch units available this month.\nTap “Book Now” to schedule your free test drive in minutes.",
    "headline": "Book Your Hybrid SUV Test Drive",
    "description": "Limited stock – complete the quick form and we’ll confirm within 5 minutes.",
    "cta": "BOOK_NOW",
    "image_guidelines": {
      "musts": [
        "Clean studio-style image of the new model",
        "Dealer logo bottom-right",
        "Badge overlay: 'From R6,999 / month'"
      ]
    },
    "video_guidelines": {
      "musts": [
        "30–45s walkaround video option",
        "Show boot space and infotainment screen",
        "On-screen text: 'From R6,999 / month', '5-year warranty'"
      ]
    }
  },
  "lead_form": {
    "form_type": "higher_intent",
    "intro": {
      "headline": "Book Your Hybrid SUV Test Drive",
      "paragraph": "Complete this short form to book your free test drive at Gaz2Go Motors in Cape Town. We’ll contact you within 5 minutes during business hours."
    },
    "questions": [
      { "type": "predefined", "field": "full_name" },
      { "type": "predefined", "field": "phone_number" },
      { "type": "predefined", "field": "email" },
      {
        "type": "custom_short",
        "label": "When are you looking to buy?",
        "options": ["0–30 days", "1–3 months", "3–6 months", "Just browsing"]
      }
    ],
    "privacy_text": "Your information will only be used by Gaz2Go Motors to contact you about this enquiry.",
    "thank_you": {
      "header": "Thanks – Test Drive Request Received",
      "description": "Our team will contact you shortly to confirm your preferred date and time.",
      "cta_label": "VIEW STOCK",
      "cta_link": "https://exampledealer.co.za/new-hybrid-suv-stock"
    }
  },
  "conversion_expectation": {
    "min_form_completion_rate_pct": 12,
    "followup_sla_minutes": 5
  },
  "routing": {
    "sync_to_crm": true,
    "crm_destination": "HubSpot_Dealership_Pipeline",
    "notification_channels": ["email", "whatsapp"]
  }
}
```

### 8.2 Used Vehicle Example (Trade-In)

```json
{
  "campaign_goal": "lead_generation",
  "vehicle_type": "used",
  "funnel_stage": "bottom",
  "offer_type": "trade_in_valuation",
  "audience": {
    "geo_radius_km": 50,
    "locations": ["Cape Town"],
    "age_range": [27, 65],
    "interests": ["Car shopping", "Used cars", "AutoTrader"],
    "custom_audiences": ["site_used_stock_visitors_30d"],
    "exclusions": ["recent_purchasers_90d"]
  },
  "creative": {
    "format": "carousel",
    "primary_text": "Thinking of upgrading your current ride in Cape Town?\nGet an instant trade-in estimate and see how much lower your monthly could be on an approved pre-owned SUV or hatchback.\nFill in the quick form with your current vehicle details – we’ll send your estimate ASAP.",
    "headline": "Get Your Trade-In Value Today",
    "description": "Approved pre-owned stock – low mileage, full history, limited units.",
    "cta": "GET_QUOTE",
    "image_guidelines": {
      "musts": [
        "Use images of 3–5 top used units with price & mileage overlays",
        "Show 'Approved Pre-Owned' badge on all frames",
        "Include dealer logo consistently"
      ]
    },
    "video_guidelines": {
      "musts": [
        "Optional 30s compilation of used stock",
        "Text overlays: 'Trade-in welcome', 'Low mileage', 'Finance available'"
      ]
    }
  },
  "lead_form": {
    "form_type": "higher_intent",
    "intro": {
      "headline": "Get Your Trade-In Estimate",
      "paragraph": "Complete this short form to receive an estimated trade-in value and matching pre-owned options. We’ll call you within 5 minutes during business hours."
    },
    "questions": [
      { "type": "predefined", "field": "full_name" },
      { "type": "predefined", "field": "phone_number" },
      {
        "type": "custom_short",
        "label": "Current vehicle make & model",
        "options": []
      },
      {
        "type": "custom_short",
        "label": "When are you looking to upgrade?",
        "options": ["0–30 days", "1–3 months", "3–6 months", "Just browsing"]
      }
    ],
    "privacy_text": "Your details are secure and will only be used to provide your trade-in estimate and matching vehicles.",
    "thank_you": {
      "header": "Thanks – Estimate Request Received",
      "description": "Our team will review your details and contact you shortly with your trade-in estimate.",
      "cta_label": "VIEW USED STOCK",
      "cta_link": "https://exampledealer.co.za/used-cars"
    }
  },
  "conversion_expectation": {
    "min_form_completion_rate_pct": 12,
    "followup_sla_minutes": 5
  },
  "routing": {
    "sync_to_crm": true,
    "crm_destination": "Dealer_Used_CRM",
    "notification_channels": ["email", "sms"]
  }
}
```

***

## 9. Instruction to Claude

When given:
- `vehicle_type` (new/used),
- `segment` (SUV, hatchback, bakkie, EV, etc.),
- `city`,
- key commercial inputs (price, monthly, warranty, etc.),

the assistant must:

1. Instantiate the JSON schema in Section 1.
2. Apply the strategy rules (Sections 2–7).
3. Generate at least:
   - 2 primary text variants,
   - 2 headline variants,
   - a full lead form spec,
   - audience and routing suggestions.

All outputs must be deterministic given the same inputs (no random phrasing unless explicitly requested).

***

 