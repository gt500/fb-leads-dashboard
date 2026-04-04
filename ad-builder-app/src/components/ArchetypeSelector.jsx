const ARCHETYPES = [
  {
    id: 'A',
    name: 'Zero Deposit / Sign & Drive',
    bestFor: 'New car launch, event, payment-sensitive buyers',
    cpl: 'R200–R390/lead',
    ctr: '6–9%',
    duration: '3–7 day event',
    color: '#0066FF',
    icon: '🚗',
    description: 'Financial barrier removal. "$0 deposit" mechanics for buyers blocked by upfront cost.',
  },
  {
    id: 'B',
    name: 'VIP Voucher / Upgrade Event',
    bestFor: 'SUV upgrades, service database, multi-rooftop events',
    cpl: 'R360–R450/lead',
    ctr: '3.5–5%',
    duration: '5–7 day event',
    color: '#7B2FBE',
    icon: '🎫',
    description: 'Exclusivity + voucher psychology. Highest show rates in the dataset (47%).',
  },
  {
    id: 'C',
    name: 'YouTube + Facebook Retarget',
    bestFor: 'Long-cycle shoppers, brand imprinting, 90-day campaigns',
    cpl: 'N/A (65% CVR)',
    ctr: 'N/A',
    duration: '60–90 days',
    color: '#CC0000',
    icon: '📺',
    description: 'OTT/YouTube awareness → Facebook retarget recognition. Cross-channel visual continuity.',
  },
  {
    id: 'D',
    name: 'Negative Equity / Balloon Relief',
    bestFor: 'High-rate loan holders, 4–8yr vehicle owners, balloon payments',
    cpl: 'R200–R280/lead',
    ctr: '8–10%',
    duration: '30–60 days',
    color: '#D97706',
    icon: '💳',
    description: 'Highest CTR in dataset (9.1%). Finance-pain first. Highly relevant post-2022 SARB rates.',
  },
  {
    id: 'E',
    name: 'CPO Dynamic Carousel',
    bestFor: 'Used/CPO inventory, multi-rooftop, retarget past enquiries',
    cpl: 'R15–R40/lead',
    ctr: '3–5%',
    duration: 'Ongoing (30–90 days)',
    color: '#059669',
    icon: '🔄',
    description: 'Lowest CPL in dataset (R15–R40). Daily DMS sync. Carousel shows exact vehicle viewed.',
  },
  {
    id: 'F',
    name: 'Trade-In / Equity Capture',
    bestFor: 'Vehicle acquisition, conquest, service customer conversion',
    cpl: 'R230–R360/lead',
    ctr: '4–7%',
    duration: 'Ongoing (30–60 days)',
    color: '#0891B2',
    icon: '🔁',
    description: 'Position as "we want to buy your car." Removes purchase pressure. Builds used inventory.',
  },
  {
    id: 'G',
    name: 'Model-Specific VDP Push',
    bestFor: 'Single-model campaigns, in-stock urgency, conquest',
    cpl: 'R250–R450/lead',
    ctr: '3–6%',
    duration: '14–30 days',
    color: '#0F766E',
    icon: '🎯',
    description: 'Intent confirmation, not persuasion. Mobile-first ads see 1.7× higher engagement.',
  },
  {
    id: 'H',
    name: 'Trust / Social Proof',
    bestFor: 'Hesitation removal, retarget non-converters, brand conquest',
    cpl: 'R280–R550/lead',
    ctr: '2–4%',
    duration: 'Retarget layer (always-on)',
    color: '#7C3AED',
    icon: '⭐',
    description: '"4.8★ from 210 buyers." Retarget only. Pairs with any archetype as a non-converter layer.',
  },
];

export default function ArchetypeSelector({ value, onChange }) {
  return (
    <div className="archetype-grid">
      {ARCHETYPES.map((a) => (
        <button
          key={a.id}
          type="button"
          className={`archetype-card ${value === a.id ? 'selected' : ''}`}
          style={{ '--accent': a.color }}
          onClick={() => onChange(a.id)}
        >
          <div className="archetype-header">
            <span className="archetype-icon">{a.icon}</span>
            <span className="archetype-badge">{a.id}</span>
          </div>
          <div className="archetype-name">{a.name}</div>
          <div className="archetype-desc">{a.description}</div>
          <div className="archetype-metrics">
            <span className="metric">
              <span className="metric-label">CPL</span>
              <span className="metric-value">{a.cpl}</span>
            </span>
            <span className="metric">
              <span className="metric-label">CTR</span>
              <span className="metric-value">{a.ctr}</span>
            </span>
          </div>
          <div className="archetype-best-for">
            <span className="best-for-label">Best for:</span> {a.bestFor}
          </div>
        </button>
      ))}
      <button
        type="button"
        className={`archetype-card recommend-card ${value === 'AUTO' ? 'selected' : ''}`}
        style={{ '--accent': '#64748B' }}
        onClick={() => onChange('AUTO')}
      >
        <div className="archetype-header">
          <span className="archetype-icon">🤖</span>
          <span className="archetype-badge">AI</span>
        </div>
        <div className="archetype-name">Let Claude Recommend</div>
        <div className="archetype-desc">
          Based on your campaign details, Claude will select and justify the best-fit archetype automatically.
        </div>
      </button>
    </div>
  );
}
