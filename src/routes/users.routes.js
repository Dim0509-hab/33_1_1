import { Router } from 'express';
import auth from '../middleware/auth.js';
import { search } from '../controllers/users.controller.js';
const r = Router();
r.get('/search', auth, search);
export default r;
