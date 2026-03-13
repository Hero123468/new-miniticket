// client/src/types/ticket.d.ts
export type FormTicket =  {
  name: string;
  email: string;
  category: 'Bug' | 'Feature Request' | 'Question';
  description: string;
};

export type Ticket = FormTicket & {
  _id: string;
  status: 'Open' | 'Closed';
};  