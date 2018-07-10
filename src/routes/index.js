import express from 'express';
import OrderBooks from '../lib/orderBooks';

const router = express.Router();

router.get('/ping', (req, res, next) => {
  res.send('pong').status(200);
});

export default router;
