import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './src/routes/index';
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// health check
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render error
  res.status(err.status || 500);
  res.json({ message: `Error: ${err}` });
});

server.listen(process.env.PORT || 4000);

export default app;
