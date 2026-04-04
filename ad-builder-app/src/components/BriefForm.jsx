import { useState } from 'react';
import ArchetypeSelector from './ArchetypeSelector';

const INITIAL = {
  // Section 1 — Dealership Details
  dealershipName: '',
  brands: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  physicalAddress: '',
  city: '',
  market: 'South Africa',
  facebookPageUrl: '',
  websiteUrl: '',
  crm: '',
  bdcSla: '5 minutes',

  // Section 2 — Campaign Archetype
  archetype: 'AUTO',

  // Section 3 — Campaign Details
  makeModel: '',
  coreOffer: '',
  campaignType: 'Event (3–7 days)',
  duration: '',
  dailyBudget: '',
  targetCustomer: '',
  ageRange: '25–55',
  incomeLevel: '',
  vehicleOwnership: '',
  financeStatus: '',
  geography: '',
  existingAudiences: '',

  // Section 4 — Offer Copy & Instant Form
  headlineDirection: '',
  bodyCopyNotes: '',
  ctaPreference: '',
  formType: 'Higher Intent',
  customQ1: '',
  customQ2: '',
  otpVerification: 'Yes',
  thankYouMessage: '',
  responseTime: '5 minutes',

  // Section 5 — Creative Assets
  assetsAvailable: '',
  visualDirection: '',

  // Section 6 — SA Market Fields
  financeProduct: 'Linked Instalment',
  ncaCompliance: 'Yes',
  dmsSystem: '',
  inventoryFeed: '',
  balloonCampaign: 'No',
  ottPlatform: 'YouTube TrueView',
  zarPayment: '',

  // Section 7 — Funnel & BDC Setup
  bdcTeamSize: '',
  bdcHours: '',
  leadRouting: '',
  crmIntegration: '',
  smsTool: '',
  videoTool: '',
  appointmentSystem: '',
  retargetBudget: '',
  additionalNotes: '',
};

const SECTIONS = [
  { id: 1, label: 'Dealership Details', icon: '🏢' },
  { id: 2, label: 'Campaign Archetype', icon: '🎯' },
  { id: 3, label: 'Campaign Details', icon: '📋' },
  { id: 4, label: 'Copy & Form', icon: '✍️' },
  { id: 5, label: 'Creative Assets', icon: '🖼️' },
  { id: 6, label: 'SA Market', icon: '🇿🇦' },
  { id: 7, label: 'Funnel & BDC', icon: '📞' },
  { id: 8, label: 'Review & Generate', icon: '🚀' },
];

function Field({ label, required, hint, children }) {
  return (
    <div className="field">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
        {hint && <span className="field-hint"> — {hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ form, name, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      className="input"
      placeholder={placeholder}
      value={form[name]}
      onChange={(e) => form.set(name, e.target.value)}
    />
  );
}

function Select({ form, name, options }) {
  return (
    <select className="input" value={form[name]} onChange={(e) => form.set(name, e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function Textarea({ form, name, placeholder, rows = 3 }) {
  return (
    <textarea
      className="input textarea"
      placeholder={placeholder}
      rows={rows}
      value={form[name]}
      onChange={(e) => form.set(name, e.target.value)}
    />
  );
}

export default function BriefForm({ onSubmit, loading }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL);

  const set = (name, value) => setData((prev) => ({ ...prev, [name]: value }));
  const form = { ...data, set };

  const goNext = () => setStep((s) => Math.min(s + 1, 8));
  const goPrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="brief-form">
      {/* Section nav */}
      <div className="section-nav">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`section-nav-item ${step === s.id ? 'active' : ''} ${step > s.id ? 'done' : ''}`}
            onClick={() => setStep(s.id)}
          >
            <span className="nav-icon">{step > s.id ? '✓' : s.icon}</span>
            <span className="nav-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="form-body">
        {/* ── SECTION 1: Dealership Details ── */}
        {step === 1 && (
          <div className="section">
            <div className="section-title">
              <span>🏢</span> Dealership Details
            </div>
            <p className="section-desc">Basic account and contact information for this campaign.</p>
            <div className="field-grid-2">
              <Field label="Dealership Name" required>
                <Input form={form} name="dealershipName" placeholder="e.g. Randburg Toyota" />
              </Field>
              <Field label="Brand(s)" required>
                <Input form={form} name="brands" placeholder="e.g. Toyota, Hilux, Land Cruiser" />
              </Field>
              <Field label="Contact Name" required>
                <Input form={form} name="contactName" placeholder="Campaign manager name" />
              </Field>
              <Field label="Contact Email" required>
                <Input form={form} name="contactEmail" placeholder="email@dealership.co.za" type="email" />
              </Field>
              <Field label="Contact Phone">
                <Input form={form} name="contactPhone" placeholder="+27 XX XXX XXXX" />
              </Field>
              <Field label="City / Metro" required>
                <Input form={form} name="city" placeholder="e.g. Johannesburg, Cape Town" />
              </Field>
              <Field label="Country / Market" required>
                <Select form={form} name="market" options={['South Africa', 'United States', 'United Kingdom', 'Australia', 'Other']} />
              </Field>
              <Field label="BDC Response SLA" hint="how fast do you call leads?">
                <Select form={form} name="bdcSla" options={['Under 1 minute', '1–5 minutes', '5–15 minutes', '15–30 minutes', '30+ minutes']} />
              </Field>
            </div>
            <div className="field-grid-2">
              <Field label="Facebook Page URL">
                <Input form={form} name="facebookPageUrl" placeholder="https://www.facebook.com/..." />
              </Field>
              <Field label="Website / VDP URL">
                <Input form={form} name="websiteUrl" placeholder="https://www.dealership.co.za" />
              </Field>
              <Field label="CRM System">
                <Input form={form} name="crm" placeholder="e.g. Kerridge, HubSpot, Salesforce" />
              </Field>
              <Field label="Physical Address">
                <Input form={form} name="physicalAddress" placeholder="123 Main St, Randburg, 2125" />
              </Field>
            </div>
          </div>
        )}

        {/* ── SECTION 2: Campaign Archetype ── */}
        {step === 2 && (
          <div className="section">
            <div className="section-title">
              <span>🎯</span> Campaign Archetype
            </div>
            <p className="section-desc">
              Select the archetype that best matches your campaign goal — or let Claude recommend based on your brief.
            </p>
            <ArchetypeSelector value={data.archetype} onChange={(v) => set('archetype', v)} />
          </div>
        )}

        {/* ── SECTION 3: Campaign Details ── */}
        {step === 3 && (
          <div className="section">
            <div className="section-title">
              <span>📋</span> Campaign Details
            </div>
            <p className="section-desc">Core brief, target customer, and audience data availability.</p>
            <div className="field-grid-2">
              <Field label="Make / Model / Segment" required>
                <Input form={form} name="makeModel" placeholder="e.g. Toyota Hilux Legend, New SUVs" />
              </Field>
              <Field label="Core Offer" required hint="the single main offer">
                <Input form={form} name="coreOffer" placeholder="e.g. R0 Deposit, from R4,999/month" />
              </Field>
              <Field label="Campaign Type" required>
                <Select form={form} name="campaignType" options={['Event (3–7 days)', 'Ongoing (30 days)', 'Ongoing (60–90 days)', 'Retarget layer']} />
              </Field>
              <Field label="Duration / Dates">
                <Input form={form} name="duration" placeholder="e.g. 15–21 July 2025 (6 days)" />
              </Field>
              <Field label="Daily Budget" required>
                <Input form={form} name="dailyBudget" placeholder="e.g. R500/day, $50/day" />
              </Field>
              <Field label="Target Customer">
                <Input form={form} name="targetCustomer" placeholder="e.g. First-time buyers, Upgraders aged 30–45" />
              </Field>
              <Field label="Target Age Range">
                <Select form={form} name="ageRange" options={['18–35', '25–45', '25–55', '30–55', '35–60', '18–65 (broad)']} />
              </Field>
              <Field label="Estimated Household Income">
                <Input form={form} name="incomeLevel" placeholder="e.g. R25,000+/month, Middle market" />
              </Field>
              <Field label="Vehicle Ownership Status">
                <Select form={form} name="vehicleOwnership" options={['Not specified', 'Currently financing', 'Own outright', 'Leasing', '3–6 year old vehicle', 'First-time buyer']} />
              </Field>
              <Field label="Finance Status of Target">
                <Select form={form} name="financeStatus" options={['Not specified', 'In active finance', 'Near end of term', 'High balloon upcoming', 'Negative equity', 'Cash buyer']} />
              </Field>
            </div>
            <Field label="Geographic Area / Radius">
              <Input form={form} name="geography" placeholder="e.g. 30km radius from Randburg, Sandton/Midrand/Fourways" />
            </Field>
            <Field label="Existing Audience Data Available">
              <div className="checkbox-group">
                {['CRM list (past buyers)', 'Service database', 'Website VDP visitors', 'Past form submitters', 'Video viewers', 'None available'].map((opt) => (
                  <label key={opt} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={data.existingAudiences.includes(opt)}
                      onChange={(e) => {
                        const current = data.existingAudiences ? data.existingAudiences.split(', ').filter(Boolean) : [];
                        if (e.target.checked) {
                          set('existingAudiences', [...current, opt].join(', '));
                        } else {
                          set('existingAudiences', current.filter((x) => x !== opt).join(', '));
                        }
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* ── SECTION 4: Offer Copy & Instant Form ── */}
        {step === 4 && (
          <div className="section">
            <div className="section-title">
              <span>✍️</span> Offer Copy & Instant Form
            </div>
            <p className="section-desc">Ad copy direction and Instant Form preferences.</p>
            <div className="field-grid-2">
              <Field label="Headline Direction" hint="max 8 words, benefit-first">
                <Input form={form} name="headlineDirection" placeholder="e.g. Zero deposit focus, urgency, payment amount" />
              </Field>
              <Field label="CTA Button Preference">
                <Select form={form} name="ctaPreference" options={['GET MY OFFER', 'CLAIM VOUCHER', 'BOOK TEST DRIVE', 'CHECK MY PAYOFF', 'SEE MY OPTIONS', 'GET MY PRICE', 'CLAIM R0 DEPOSIT', 'Let Claude choose']} />
              </Field>
              <Field label="Form Type">
                <Select form={form} name="formType" options={['Higher Intent (event / quality focus)', 'More Volume (ongoing / efficiency focus)']} />
              </Field>
              <Field label="OTP Phone Verification">
                <Select form={form} name="otpVerification" options={['Yes', 'No']} />
              </Field>
              <Field label="Expected Lead Response Time">
                <Select form={form} name="responseTime" options={['Under 1 minute', '1–5 minutes', '5–15 minutes', '30+ minutes']} />
              </Field>
            </div>
            <Field label="Body Copy Notes / Angle" hint="pain point, desire, or specific message direction">
              <Textarea form={form} name="bodyCopyNotes" placeholder="e.g. Emphasise pain of high balloon payments, relief angle. Or: Focus on test drive experience and lifestyle." />
            </Field>
            <Field label="Custom Question 1 Preference">
              <Select form={form} name="customQ1" options={[
                'Let Claude choose',
                'Purchase timeline (This week / 30 days / 3 months / Just exploring)',
                'Trade-in signal (Yes / No / Not sure)',
                'Loan situation (Owe more / Near end of term / Own outright / Leasing)',
                'Upgrade readiness (how long owned current vehicle)',
                'Test drive timing (This week / Next week / This month)',
                'Monthly payment comfort (ZAR ranges)',
              ]} />
            </Field>
            <Field label="Custom Question 2 Preference" hint="leave blank if only 1 question">
              <Select form={form} name="customQ2" options={[
                'None',
                'Let Claude choose',
                'Trade-in signal (Yes / No / Not sure)',
                'Purchase timeline',
                'Monthly payment comfort (ZAR ranges)',
                'Vehicle of interest (dropdown)',
              ]} />
            </Field>
            <Field label="Thank-You Message Direction">
              <Input form={form} name="thankYouMessage" placeholder="e.g. Mention 5-min call, what specialist will discuss, next step" />
            </Field>
          </div>
        )}

        {/* ── SECTION 5: Creative Assets ── */}
        {step === 5 && (
          <div className="section">
            <div className="section-title">
              <span>🖼️</span> Creative Assets
            </div>
            <p className="section-desc">
              Describe or list available assets. Claude will specify how they should be used (aspect ratio, text overlay position, duration for video).
            </p>
            <div className="asset-spec-box">
              <div className="spec-row"><strong>Feed image:</strong> 1200×628px or 1080×1080px (1:1) — JPG/PNG</div>
              <div className="spec-row"><strong>Story / Reel:</strong> 1080×1920px (9:16) — JPG/PNG/MP4/MOV</div>
              <div className="spec-row"><strong>Video (optimal):</strong> 15–30 seconds — MP4, H.264, min 1080p</div>
              <div className="spec-row"><strong>Carousel card:</strong> 1080×1080px — JPG/PNG</div>
            </div>
            <Field label="Assets Available">
              <div className="checkbox-group">
                {[
                  'Hero vehicle photo (feed)',
                  'Lifestyle / in-use photo',
                  'Studio / white background photo',
                  'Video (15–30 sec)',
                  'Reel / vertical video',
                  'Carousel images (multiple vehicles)',
                  'No assets — Claude to specify creative brief only',
                ].map((opt) => (
                  <label key={opt} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={data.assetsAvailable.includes(opt)}
                      onChange={(e) => {
                        const current = data.assetsAvailable ? data.assetsAvailable.split(', ').filter(Boolean) : [];
                        if (e.target.checked) {
                          set('assetsAvailable', [...current, opt].join(', '));
                        } else {
                          set('assetsAvailable', current.filter((x) => x !== opt).join(', '));
                        }
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Visual Direction / Brand Notes">
              <Textarea form={form} name="visualDirection" placeholder="e.g. Dark/moody lifestyle, red brand colour, must show interior. Avoid white studio shots — prefer outdoor/real-world." rows={4} />
            </Field>
          </div>
        )}

        {/* ── SECTION 6: SA Market Fields ── */}
        {step === 6 && (
          <div className="section">
            <div className="section-title">
              <span>🇿🇦</span> SA Market Fields
            </div>
            <p className="section-desc">South Africa-specific finance, compliance, and platform requirements.</p>
            <div className="field-grid-2">
              <Field label="Finance Product Targeted">
                <Select form={form} name="financeProduct" options={['Linked Instalment (standard)', 'Balloon Payment (PEP)', 'Operating Lease', 'Cash / Outright', 'Not specified']} />
              </Field>
              <Field label="NCA Compliance Required">
                <Select form={form} name="ncaCompliance" options={['Yes — add "subject to approval, T&Cs apply"', 'No', 'Handled by dealership']} />
              </Field>
              <Field label="DMS System">
                <Select form={form} name="dmsSystem" options={['Kerridge', 'Evolve', 'CDK', 'Other', 'None / Not applicable']} />
              </Field>
              <Field label="Inventory Feed">
                <Select form={form} name="inventoryFeed" options={['AutoTrader SA', 'WeBuyCars', 'Cars.co.za', 'DealerFloor', 'None', 'Other']} />
              </Field>
              <Field label="Balloon Campaign (Archetype D)">
                <Select form={form} name="balloonCampaign" options={['No', 'Yes — target 72–84 month loan maturity', 'Yes — target all balloon holders']} />
              </Field>
              <Field label="OTT Platform Preference">
                <Select form={form} name="ottPlatform" options={['YouTube TrueView', 'DStv Now / Showmax', 'Both', 'Not applicable']} />
              </Field>
            </div>
            <Field label="ZAR Monthly Payment Target" hint="the payment figure to feature in ads">
              <Input form={form} name="zarPayment" placeholder="e.g. from R3,999/month, under R5,000/month" />
            </Field>
            <div className="info-box">
              <strong>ZAR framing reference:</strong>
              <ul>
                <li>Middle market: R3,500–R6,000/month payment sensitivity</li>
                <li>Premium: R7,000–R12,000/month</li>
                <li>68% of financed SA vehicles have balloon payments (post-2022 SARB rates)</li>
                <li>Never promise credit approval — use "subject to approval"</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── SECTION 7: Funnel & BDC Setup ── */}
        {step === 7 && (
          <div className="section">
            <div className="section-title">
              <span>📞</span> Funnel & BDC Setup
            </div>
            <p className="section-desc">BDC capacity, routing, tools, and post-event retarget setup.</p>
            <div className="field-grid-2">
              <Field label="BDC Team Size">
                <Select form={form} name="bdcTeamSize" options={['1 person', '2–3 people', '4–6 people', '7+ people', 'No dedicated BDC']} />
              </Field>
              <Field label="BDC Hours">
                <Input form={form} name="bdcHours" placeholder="e.g. Mon–Sat 8am–6pm, 24/7 via AI" />
              </Field>
              <Field label="Lead Routing Method">
                <Select form={form} name="leadRouting" options={['CRM notification (email/SMS)', 'Direct phone call alert', 'Webhook to CRM', 'Zapier / Make automation', 'Manual check', 'OVG / Hailey AI system']} />
              </Field>
              <Field label="CRM Integration">
                <Select form={form} name="crmIntegration" options={['Yes — direct webhook', 'Yes — via Zapier/Make', 'Yes — manual import', 'No integration', 'Not set up yet']} />
              </Field>
              <Field label="SMS Tool">
                <Input form={form} name="smsTool" placeholder="e.g. Twilio, WhatsApp Business, BulkSMS" />
              </Field>
              <Field label="Video Tool (Pre-Visit)">
                <Select form={form} name="videoTool" options={['Covideo', 'BombBomb', 'WhatsApp video', 'None', 'To be set up']} />
              </Field>
              <Field label="Appointment Booking System">
                <Input form={form} name="appointmentSystem" placeholder="e.g. Calendly, DMS booking, phone only" />
              </Field>
              <Field label="Post-Event Retarget Budget">
                <Input form={form} name="retargetBudget" placeholder="e.g. R1,000 for 7-day retarget after event" />
              </Field>
            </div>
            <Field label="Additional Notes / Instructions">
              <Textarea form={form} name="additionalNotes" placeholder="Any other context: competitor notes, market dynamics, previous campaign results, specific objections to address..." rows={4} />
            </Field>
          </div>
        )}

        {/* ── SECTION 8: Review & Generate ── */}
        {step === 8 && (
          <div className="section">
            <div className="section-title">
              <span>🚀</span> Review & Generate
            </div>
            <p className="section-desc">Review your brief before generating the ad package.</p>

            <div className="review-grid">
              <ReviewItem label="Dealership" value={data.dealershipName || '—'} />
              <ReviewItem label="Market" value={`${data.city}, ${data.market}`} />
              <ReviewItem label="Archetype" value={data.archetype === 'AUTO' ? '🤖 Auto-recommend' : `${data.archetype} — ${getArchetypeName(data.archetype)}`} />
              <ReviewItem label="Vehicle" value={data.makeModel || '—'} />
              <ReviewItem label="Core Offer" value={data.coreOffer || '—'} />
              <ReviewItem label="Campaign Type" value={data.campaignType} />
              <ReviewItem label="Duration" value={data.duration || '—'} />
              <ReviewItem label="Daily Budget" value={data.dailyBudget || '—'} />
              <ReviewItem label="Target Customer" value={data.targetCustomer || '—'} />
              <ReviewItem label="Form Type" value={data.formType} />
              <ReviewItem label="BDC SLA" value={data.bdcSla} />
              <ReviewItem label="Finance Product" value={data.financeProduct} />
            </div>

            <div className="quality-checklist">
              <div className="checklist-title">Pre-Generation Quality Check</div>
              {[
                { check: !!data.dealershipName, label: 'Dealership name provided' },
                { check: !!data.makeModel, label: 'Make/Model specified' },
                { check: !!data.coreOffer, label: 'Core offer defined' },
                { check: data.archetype !== '', label: 'Archetype selected' },
                { check: !!data.city, label: 'City/market specified' },
                { check: !!data.dailyBudget, label: 'Budget provided' },
              ].map(({ check, label }) => (
                <div key={label} className={`checklist-item ${check ? 'pass' : 'warn'}`}>
                  <span>{check ? '✓' : '!'}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <button type="submit" className="generate-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" /> Generating Ad Package...
                </>
              ) : (
                <>🚀 Generate Ad Package with Claude</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="form-nav">
        <button type="button" className="btn-secondary" onClick={goPrev} disabled={step === 1}>
          ← Previous
        </button>
        <span className="step-indicator">Step {step} of 8</span>
        {step < 8 ? (
          <button type="button" className="btn-primary" onClick={goNext}>
            Next →
          </button>
        ) : null}
      </div>
    </form>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="review-item">
      <span className="review-label">{label}</span>
      <span className="review-value">{value}</span>
    </div>
  );
}

function getArchetypeName(id) {
  const names = {
    A: 'Zero Deposit / Sign & Drive',
    B: 'VIP Voucher / Upgrade Event',
    C: 'YouTube + Facebook Retarget',
    D: 'Negative Equity / Balloon Relief',
    E: 'CPO Dynamic Carousel',
    F: 'Trade-In / Equity Capture',
    G: 'Model-Specific VDP Push',
    H: 'Trust / Social Proof',
  };
  return names[id] || id;
}
