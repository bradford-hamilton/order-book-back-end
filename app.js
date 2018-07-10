import express from 'express';
import { Server } from 'http';
import OrderBooks from './src/lib/orderBooks';

const app = express();
const server = Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  let intervalId;

  socket.on('marketPair', async (marketPair) => {
    let books = await OrderBooks.getAll(marketPair);

    clearInterval(intervalId);
    socket.emit('newOrders', books);

    intervalId = setInterval(async () => {
      books = await OrderBooks.getAll(marketPair);
      socket.emit('newOrders', books);
    }, 3000);
  })

  socket.on('disconnect', () => {
    clearInterval(intervalId);
  })
});

server.listen(process.env.PORT || 4000);

export default app;
