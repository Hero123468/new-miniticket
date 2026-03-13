// client/src/components/TicketForm.tsx
import React, { useState } from 'react';
import type { Ticket, FormTicket } from '../types/ticket';

type TicketFormProps = {
  onSubmit?: (ticket: Ticket) => void;
};

export default function TicketForm({ onSubmit }: TicketFormProps) {
  const [form, setForm] = useState<FormTicket>({
  name: '',
  email: '',
  category: 'Bug',
  description: '',
});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement  | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: 'Open' }),
      });

      if (!res.ok) {
        throw new Error('Failed to create ticket');
      }

      const newTicket: Ticket = await res.json();
      if (onSubmit) onSubmit(newTicket);

      // Reset form
      setForm({ name: '', email: '', category: 'Bug', description: '' });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
        required
        className="w-full p-2 border"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your email"
        type="email"
        required
        className="w-full p-2 border"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border"
      >
        <option value="Bug">Bug</option>
        <option value="Feature Request">Feature Request</option>
        <option value="Question">Question</option>
      </select>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe the issue"
        required
        className="w-full p-2 border"
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {submitting ? 'Submitting...' : 'Submit Ticket'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
