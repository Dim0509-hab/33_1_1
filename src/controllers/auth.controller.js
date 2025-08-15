import { registerSchema, loginSchema } from '../validators/auth.schema.js';
import { createUser, findByEmail, setEmailVerified } from '../repositories/usersRepo.js';
import { hash, compare } from '../services/password.js';
import { signAccess, signRefresh, signVerify, verifyRefresh, verifyEmailToken } from '../services/jwt.js';
import { sendVerifyEmail } from '../services/mailer.js';

export async function register(req, res) {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await findByEmail(value.email);
  if (exists) return res.status(409).json({ message: 'Email уже зарегистрирован' });

  const user = await createUser({ email: value.email, password_hash: hash(value.password) });
  const token = signVerify({ uid: user.id });
  await sendVerifyEmail(user.email, token);
  res.status(201).json({ message: 'Регистрация успешна, проверьте почту для подтверждения' });
}

export async function verifyEmail(req, res) {
  try {
    const { uid } = verifyEmailToken(req.query.token);
    await setEmailVerified(uid);
    res.json({ message: 'Email подтверждён' });
  } catch {
    res.status(400).json({ message: 'Неверный или просроченный токен' });
  }
}

export async function login(req, res) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await findByEmail(value.email);
  if (!user || !compare(value.password, user.password_hash))
    return res.status(401).json({ message: 'Неверные учетные данные' });

  const payload = { id: user.id, email: user.email };
  res.json({
    access: signAccess(payload),
    refresh: signRefresh(payload)
  });
}

export async function refresh(req, res) {
  try {
    const data = verifyRefresh(req.body.refresh);
    const payload = { id: data.id, email: data.email };
    res.json({ access: signAccess(payload), refresh: signRefresh(payload) });
  } catch {
    res.status(401).json({ message: 'Invalid refresh' });
  }
}

export async function logout(_req, res) {
  // Stateless JWT — на клиенте просто забываем токены
  res.json({ ok: true });
}
