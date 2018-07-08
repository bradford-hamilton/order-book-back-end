import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './src/routes/index';
import { Server } from 'http';

const app = express();
const server = Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.emit('testData', { hello: 'world' });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

server.listen(process.env.PORT || 3000);

export default app;
