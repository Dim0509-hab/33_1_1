import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createDirect, createGroupChat, list, toggleMuteChat } from '../controllers/chats.controller.js';
const r = Router();
r.get('/', auth, list);
r.post('/direct/:userId', auth, createDirect);
r.post('/group', auth, createGroupChat);
r.post('/:chatId/mute', auth, toggleMuteChat);
export default r;
