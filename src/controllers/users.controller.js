import { searchUsers } from '../repositories/usersRepo.js';
export async function search(req, res) {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);
  const users = await searchUsers(q);
  res.json(users);
}
