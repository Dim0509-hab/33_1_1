import { Router } from 'express';
import { register, verifyEmail, login, refresh, logout } from '../controllers/auth.controller.js';
const r = Router();
r.post('/register', register);
r.get('/verify', verifyEmail);
r.post('/login', login);
r.post('/refresh', refresh);
r.post('/logout', logout);
export default r;
