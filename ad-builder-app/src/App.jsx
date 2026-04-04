import { useState } from 'react';
import BriefForm from './components/BriefForm';
import AdPackageOutput from './components/AdPackageOutput';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('builder');
  const [output, setOutput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [currentBrief, setCurrentBrief] = useState(null);

  const handleSubmit = async (brief) => {
    setOutput('');
    setError('');
    setStreaming(true);
    setShowOutput(true);
    setCurrentBrief(brief);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Generation failed.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;
            try {
              const { text } = JSON.parse(data);
              setOutput((prev) => prev + text);
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setStreaming(false);
    }
  };

  const handleReset = () => {
    setShowOutput(false);
    setOutput('');
    setError('');
    setCurrentBrief(null);
  };

  return (
    <div className="app">
      {/* ── Left Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">SS</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-tab ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
            title="Ad Builder"
          >
            <span className="sidebar-icon">🚀</span>
            <span className="sidebar-label">Ad Builder</span>
          </button>
          <a
            href={import.meta.env.VITE_INTEL_URL || 'http://localhost:3002'}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-tab sidebar-link"
            title="Open Lead Intelligence Dashboard"
          >
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-label">Intelligence</span>
            <span className="sidebar-ext">↗</span>
          </a>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <div className="content-area">
        <header className="app-header">
          <div className="header-inner">
            <div className="header-title">
              <span>🚀</span>
              <span>Auto Lead Ads Builder</span>
              <span className="header-sub">SocialSynapse · Facebook Automotive</span>
            </div>
            {showOutput && (
              <button className="btn-outline" onClick={handleReset}>
                ← New Campaign
              </button>
            )}
          </div>
        </header>

        <main className="app-main">
          <div className="tab-panel visible">
            {!showOutput ? (
              <div className="form-container">
                <div className="page-intro">
                  <h1 className="page-title">Generate Your Facebook Lead Ad Package</h1>
                  <p className="page-desc">
                    Complete the 8-section campaign brief and Claude will generate ready-to-launch
                    Facebook lead ad copy, Instant Form spec, targeting parameters, and funnel
                    sequence — backed by 25 top-performing automotive campaigns.
                  </p>
                  <div className="benchmark-pills">
                    <span className="pill green">CPL from R15/lead</span>
                    <span className="pill blue">Up to 9.1% CTR</span>
                    <span className="pill purple">47% show rates</span>
                    <span className="pill orange">8 proven archetypes</span>
                  </div>
                </div>
                <BriefForm onSubmit={handleSubmit} loading={streaming} />
              </div>
            ) : (
              <div className="output-container">
                {error && (
                  <div className="error-banner">
                    <strong>Error:</strong> {error}
                    <button className="btn-outline small" onClick={handleReset}>Try Again</button>
                  </div>
                )}
                <AdPackageOutput content={output} streaming={streaming} brief={currentBrief} />
              </div>
            )}
          </div>
        </main>

        <footer className="app-footer">
          SocialSynapse · campaigns@socialsynapse.co.za · Powered by Claude Sonnet
        </footer>
      </div>
    </div>
  );
}
