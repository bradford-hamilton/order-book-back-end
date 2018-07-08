import express from 'express';
import OrderBooks from '../lib/orderBooks';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'Connected to market' });
});

export default router;
