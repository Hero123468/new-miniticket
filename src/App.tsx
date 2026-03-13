import { useEffect, useState } from 'react'
import './App.css'
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import type { Ticket, FormTicket } from './types/ticket';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

//Fetch tickets on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/tickets')
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error('Failed to fetch tickets:', err));
  }, []);

  // Add a ticket to state
  const addTicket = (ticket: Ticket) => {
    setTickets([ticket, ...tickets]);
  };

// Toggle ticket status
  const toggleTicketStatus = async (_id: string) => {
    const ticketToUpdate = tickets.find(ticket => ticket._id === _id);
    if (!ticketToUpdate) return;

  const newStatus = 
    ticketToUpdate.status === 'Open' ? 'Closed' : 'Open';

  try {
    const response = await fetch(
      `http://localhost:5000/api/tickets/${ticketToUpdate._id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }
  );

    if (!response.ok) 
      throw new Error('Failed to update ticket status'); 

    const updatedTicket = await response.json();

    setTickets(prev =>
      prev.map(ticket =>
        ticket._id === _id ? updatedTicket : ticket
      )
    );
  } catch (err) {
    console.error('Error updating ticket status:', err);
  }
};

    
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MiniTicket Support System</h1>
      <TicketForm onSubmit={(formTicket: FormTicket) => {
        const tempTicket: Ticket = {
          ...formTicket,
          _id: crypto.randomUUID(), // temporary ID until saved
          status: 'Open'
        };
        addTicket(tempTicket);
      }} />
      <TicketList tickets={tickets} toggleStatus={toggleTicketStatus} />
    </div>
  );
}

export default App;