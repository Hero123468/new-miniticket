import type { Request, Response } from 'express';
import Ticket from '../models/Ticket';
import express from 'express';

const router = express.Router();

// GET all tickets
router.get('/', async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch {
    res.status(500).json({ error: 'Failed to fetch tickets'})
  }
});

// POST new ticket
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTicket = new Ticket(req.body);
    const saved = await newTicket.save();
    res.status(201).json(saved);
  } catch {
    res.status(400).json({ error: 'Failed to save ticket' });
  }
});

// PATCH ticket status
router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Ticket.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Failed to update status' });
  }
});

export default router;
 