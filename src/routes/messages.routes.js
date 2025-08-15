import { Router } from 'express';
import auth from '../middleware/auth.js';
import { listByChat, send, edit, remove } from '../controllers/messages.controller.js';
const r = Router();
r.get('/:chatId', auth, listByChat);
r.post('/:chatId', auth, send);
r.patch('/item/:messageId', auth, edit);
r.delete('/item/:messageId', auth, remove);
export default r;
