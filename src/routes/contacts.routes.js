import { Router } from 'express';
import auth from '../middleware/auth.js';
import { add, del, list } from '../controllers/contacts.controller.js';
const r = Router();
r.get('/', auth, list);
r.post('/:userId', auth, add);
r.delete('/:userId', auth, del);
export default r;
