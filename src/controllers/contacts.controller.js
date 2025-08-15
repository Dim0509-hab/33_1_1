import { addContact, removeContact, listContacts } from '../repositories/contactsRepo.js';
export async function add(req, res) {
  await addContact(req.user.id, Number(req.params.userId));
  res.status(201).json({ ok: true });
}
export async function del(req, res) {
  await removeContact(req.user.id, Number(req.params.userId));
  res.json({ ok: true });
}
export async function list(req, res) {
  res.json(await listContacts(req.user.id));
}
