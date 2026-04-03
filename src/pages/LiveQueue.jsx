import React, { useState } from 'react';
import { Mail, Search, Filter } from 'lucide-react';
import { useTickets } from '../context/TicketContext';

export default function LiveQueue() {
  const { queue } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 120px)' }}>
      {/* List View */}
      <div className="glass-panel" style={{ width: '400px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search queue..." 
              style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.25rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', outline: 'none' }}
            />
          </div>
          <button className="btn-icon"><Filter size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
          {queue.map(ticket => (
            <div 
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              style={{ 
                padding: '1rem', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                marginBottom: '0.5rem',
                border: '1px solid',
                borderColor: selectedTicket?.id === ticket.id ? 'var(--primary)' : 'transparent',
                background: selectedTicket?.id === ticket.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                transition: 'all 0.2s'
              }}
              className="glass-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="subtitle" style={{ color: 'var(--primary-light)' }}>{ticket.id}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2m ago</span>
              </div>
              <div style={{ fontWeight: 500, marginBottom: '0.25rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {ticket.subject}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {ticket.customer}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className={`badge ${ticket.urgency === 'High' ? 'badge-danger' : 'badge-neutral'}`}>{ticket.urgency}</span>
                <span className="badge badge-warning">{ticket.tone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
        {selectedTicket ? (
          <TicketDetail ticket={selectedTicket} />
        ) : (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <Mail size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <div>Select a ticket to view AI processing details</div>
          </div>
        )}
      </div>
    </div>
  );
}

function TicketDetail({ ticket }) {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ margin: 0 }}>{ticket.subject}</h2>
            <span className="badge badge-primary">{ticket.id}</span>
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>From: {ticket.customer}</div>
        </div>
        <button className="btn btn-primary">Take Over (Human)</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)' }}>
            <div className="subtitle" style={{ marginBottom: '1rem' }}>Original Message</div>
            <p style={{ lineHeight: 1.6, color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
              {ticket.body || "Original text not available."}
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
            <div className="subtitle" style={{ marginBottom: '1rem', color: 'var(--accent-light)' }}>AI Reply Drafted</div>
            <p style={{ lineHeight: 1.6, color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
              {ticket.draft || "Draft generation in progress..."}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div className="subtitle" style={{ marginBottom: '1rem' }}>AI Brain Analysis</div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Primary Intent</div>
              <div className="badge badge-neutral" style={{ fontSize: '0.875rem' }}>{ticket.intent}</div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Emotional Tone</div>
              <div className="badge badge-warning" style={{ fontSize: '0.875rem' }}>{ticket.tone} - 87% Confidence</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Calculated Urgency</div>
              <div className="badge badge-danger" style={{ fontSize: '0.875rem' }}>{ticket.urgency} Priority</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div className="subtitle" style={{ marginBottom: '1rem' }}>Action Log</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
              {ticket.actions?.map((act, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: `var(--status-${act.status || 'neutral'})`, boxShadow: act.status === 'success' ? '0 0 10px var(--status-success)' : 'none' }}></div>
                  <div style={{ fontSize: '0.875rem', color: act.status === 'success' ? 'var(--status-success)' : 'inherit' }}>{act.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{act.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
