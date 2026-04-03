import React, { createContext, useContext, useState } from 'react';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [queue, setQueue] = useState([
    { 
      id: 'T-1025', 
      subject: 'My order never arrived!', 
      customer: 'Alex Johnson',
      body: "I have been waiting for my package for 3 weeks! The tracking hasn't updated since the 12th. I'm extremely disappointed and I want a refund right now. This is unacceptable.",
      intent: 'Lost Item', 
      urgency: 'High', 
      tone: 'Angry', 
      status: 'Processing',
      actions: [
        { time: '10:42 AM', label: 'Email Ingested', status: 'neutral' },
        { time: '10:42 AM', label: 'NLP Analysis Complete', status: 'primary' },
        { time: '10:43 AM', label: 'Auto-Refund Processed', status: 'success' }
      ],
      draft: "Hi Alex,\n\nI sincerely apologize for the unacceptable delay with your order. I completely understand your frustration. I have processed a full refund to your original payment method, which you should see in 3-5 business days. As a courtesy, if the item does eventually arrive, please keep it with our compliments.\n\nBest regards,\nZykrr AI Support"
    },
    { 
      id: 'T-1024', 
      subject: 'How do I change my subscription?', 
      customer: 'Sarah Miller',
      body: "Hello, I want to downgrade to the basic tier but I can't find the option anywhere. Please help.",
      intent: 'Inquiry', 
      urgency: 'Low', 
      tone: 'Neutral', 
      status: 'Resolved',
      actions: [
        { time: '09:12 AM', label: 'Email Ingested', status: 'neutral' },
        { time: '09:12 AM', label: 'Intent: FAQ Identified', status: 'primary' },
        { time: '09:13 AM', label: 'Knowledge Base Link Sent', status: 'success' }
      ],
      draft: "Hi Sarah,\n\nThanks for reaching out. You can change your subscription tier by visiting Settings > Billing > Manage Subscription. Let me know if you need any further assistance!\n\nBest,\nZykrr Support"
    }
  ]);

  const [simulating, setSimulating] = useState(false);

  return (
    <TicketContext.Provider value={{ queue, setQueue, simulating, setSimulating }}>
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => useContext(TicketContext);
