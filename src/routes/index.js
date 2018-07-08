import express from 'express';
import OrderBooks from '../lib/orderBooks';

const router = express.Router();

router.get('/:marketPair', async (req, res, next) => {
  try {
    const books = await OrderBooks.getAll(req.params.marketPair);

    res.json(books);
  } catch (err) {
    res.json({ error: `Error: ${err}` });
  }
});

export default router;
