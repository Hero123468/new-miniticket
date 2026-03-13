// client/src/components/TicketList.tsx
import type { Ticket } from '../types/ticket';

type Props = {
  tickets: Ticket[];
  toggleStatus: (id: string) => void;
};

export default function TicketList({ tickets, toggleStatus }: Props) {
  return (
    <div className="space-y-4 mt-4">
      {tickets.map(ticket => (
        <div key={ticket._id} className="border p-4 rounded shadow-sm">
          <h3 className="text-lg font-bold">
            {ticket.category} — {ticket.status}
          </h3>

          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>Description:</strong> {ticket.description}</p>

          <button
            onClick={() => toggleStatus(ticket._id)}
            className="mt-2 text-sm text-blue-600 underline"
          >
            Mark as {ticket.status === 'Open' ? 'Closed' : 'Open'}
          </button>
        </div>
      ))}
    </div>
  );
}
