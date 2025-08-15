import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoutes from './routes/auth.routes.js';
import meRoutes from './routes/me.routes.js';
import usersRoutes from './routes/users.routes.js';
import contactsRoutes from './routes/contacts.routes.js';
import chatsRoutes from './routes/chats.routes.js';
import messagesRoutes from './routes/messages.routes.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 2 * 1024 * 1024 } }));
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/me', meRoutes);
app.use('/users', usersRoutes);
app.use('/contacts', contactsRoutes);
app.use('/chats', chatsRoutes);
app.use('/messages', messagesRoutes);

app.get('/health', (_, res) => res.json({ ok: true }));
export default app;
