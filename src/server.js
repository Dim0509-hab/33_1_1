import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import socketAuth from './middleware/socketAuth.js';
import registerSocketHandlers from './sockets/index.js';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.use(socketAuth);
io.on('connection', (socket) => registerSocketHandlers(io, socket));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`API + WS on :${port}`));
