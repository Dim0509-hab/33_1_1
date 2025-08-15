import { getOrCreateDirect, createGroup, listUserChats } from '../repositories/chatsRepo.js';
import { isContact } from '../repositories/contactsRepo.js';
import { toggleMute } from '../repositories/mutedRepo.js';

export async function createDirect(req, res) {
  const peerId = Number(req.params.userId);
  if (!(await isContact(req.user.id, peerId)))
    return res.status(403).json({ message: 'Можно писать только контактам' });

  const chatId = await getOrCreateDirect(req.user.id, peerId);
  res.status(201).json({ id: chatId });
}

export async function createGroupChat(req, res) {
  const { title, memberIds = [] } = req.body;
  if (!title?.trim()) return res.status(400).json({ message: 'Нет названия' });
  // проверяем, что все — контакты
  for (const id of memberIds) {
    if (!(await isContact(req.user.id, id)))
      return res.status(403).json({ message: `Пользователь ${id} не в ваших контактах` });
  }
  const id = await createGroup(req.user.id, title.trim(), memberIds);
  res.status(201).json({ id });
}

export async function list(req, res) {
  res.json(await listUserChats(req.user.id));
}

export async function toggleMuteChat(req, res) {
  const muted = await toggleMute(Number(req.params.chatId), req.user.id);
  res.json({ chatId: Number(req.params.chatId), muted });
}
