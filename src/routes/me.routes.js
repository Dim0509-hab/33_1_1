import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getMe, patchMe } from '../controllers/me.controller.js';
const r = Router();
r.get('/', auth, getMe);
r.patch('/', auth, patchMe);
export default r;
