import React from 'react';
import { Activity, MessageSquare, Clock, Zap } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Overview</h2>
        <p className="subtitle">Real-time performance metrics</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard 
          icon={<MessageSquare color="var(--primary-light)" />} 
          title="Emails Processed" 
          value="1,248" 
          trend="+12% today"
          trendUp={true}
        />
        <StatCard 
          icon={<Zap color="var(--status-warning)" />} 
          title="Autonomous Resolutions" 
          value="892" 
          trend="71% resolution rate"
          trendUp={true}
        />
        <StatCard 
          icon={<Activity color="var(--status-success)" />} 
          title="Avg. Empathy Score" 
          value="9.4/10" 
          trend="+0.2 this week"
          trendUp={true}
        />
        <StatCard 
          icon={<Clock color="var(--accent-light)" />} 
          title="Avg. Response Time" 
          value="4s" 
          trend="Machine speed"
          trendUp={true}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            Recent Autonomous Actions
            <span className="badge badge-neutral">Last 1 hour</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ActionRow intent="Refund Request" action="Processed $50 Refund" time="2m ago" status="success" />
            <ActionRow intent="Angry Complaint" action="Escalated to Tier 2" time="15m ago" status="warning" />
            <ActionRow intent="Shipping Delay" action="Drafted Apology + 10% Discount" time="32m ago" status="success" />
            <ActionRow intent="Product Defect" action="Requested Photo Evidence" time="45m ago" status="primary" />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Intent Distribution</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            [ Chart Placeholder ]
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, trendUp }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
          {icon}
        </div>
        <span className={`badge ${trendUp ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>
          {trend}
        </span>
      </div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'Outfit', marginBottom: '0.25rem' }}>{value}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{title}</div>
      </div>
    </div>
  );
}

function ActionRow({ intent, action, time, status }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{intent}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{action}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className={`badge badge-${status}`} style={{ marginBottom: '0.25rem' }}>Auto-resolved</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{time}</div>
      </div>
    </div>
  );
}
