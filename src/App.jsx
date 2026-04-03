import { Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Inbox, UserX, Settings, Zap, Loader2 } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import LiveQueue from './pages/LiveQueue';
import { useTickets } from './context/TicketContext';
import './App.css';

function App() {
  const { queue, setQueue, simulating, setSimulating } = useTickets();

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newTicket = {
        id: `T-${1026 + Math.floor(Math.random() * 100)}`,
        subject: 'Wrong item received in my order',
        customer: 'Jane Doe',
        body: "I received a completely different item than what I ordered. This is so frustrating, I needed this for an event this weekend. Please fix this immediately.",
        intent: 'Wrong Item',
        urgency: 'High',
        tone: 'Frustrated',
        status: 'Processing',
        actions: [
          { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), label: 'Email Ingested', status: 'neutral' },
          { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), label: 'NLP intent: Wrong Item', status: 'primary' },
          { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), label: 'Checking stock for replacement...', status: 'warning' },
          { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), label: 'Replacement Shipped + Priority Express', status: 'success' }
        ],
        draft: "Hi Jane,\n\nI am so sorry to hear that you received the wrong item. I understand how frustrating that must be, especially with your event coming up this weekend. I have immediately processed a replacement order for the correct item and upgraded it to Priority Express shipping at no extra cost to ensure it arrives by Friday. Keep the wrong item as our apology.\n\nWarmly,\nZykrr AI Support"
      };
      
      setQueue([newTicket, ...queue]);
      setSimulating(false);
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '10px', display: 'flex' }}>
            <Zap size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', margin: 0, background: 'linear-gradient(to right, white, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Zykrr
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px' }}>CX ENGINE</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            Overview
          </NavLink>
          
          <NavLink to="/queue" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Inbox size={20} />
            Live Queue
            <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>12</span>
          </NavLink>
          
          <NavLink to="/escalations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <UserX size={20} />
            Escalations
            <span className="badge badge-danger" style={{ marginLeft: 'auto' }}>3</span>
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={20} />
            Settings
          </NavLink>
        </div>

        <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>AI Worker Status</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--status-success)', fontWeight: 500, fontSize: '0.875rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', boxShadow: '0 0 10px currentColor' }}></span>
              Online & Monitoring
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ height: '70px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 2rem', background: 'rgba(5, 5, 6, 0.8)', backdropFilter: 'var(--glass-backdrop)', position: 'sticky', top: 0, zIndex: 10 }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 500 }}>AI Command Center</h1>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={handleSimulate} disabled={simulating}>
              {simulating ? <Loader2 size={16} className="animate-spin" /> : null}
              Simulate Email
            </button>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-glow)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)', fontWeight: 600 }}>
              A
            </div>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/queue" element={<LiveQueue />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
