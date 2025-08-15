import { createMessage, editMessage, softDeleteMessage, listMessages, messageById } from '../repositories/messagesRepo.js';
import { userChatIds } from '../repositories/chatsRepo.js';

export async function listByChat(req, res) {
  const chatId = Number(req.params.chatId);
  const before = req.query.before ? new Date(req.query.before) : undefined;
  const limit = Number(req.query.limit || 50);
  res.json(await listMessages(chatId, limit, before));
}

// ниже методы REST, но в реальном времени лучше использовать сокеты
export async function send(req, res) {
  const chatId = Number(req.params.chatId);
  const msg = await createMessage({ chatId, authorId: req.user.id, body: req.body.body, forwardMsgId: req.body.forwardMsgId });
  res.status(201).json(msg);
}
export async function edit(req, res) {
  const msg = await editMessage({ messageId: Number(req.params.messageId), userId: req.user.id, body: req.body.body });
  if (!msg) return res.status(403).json({ message: 'Нельзя редактировать' });
  res.json(msg);
}
export async function remove(req, res) {
  const msg = await softDeleteMessage({ messageId: Number(req.params.messageId), userId: req.user.id });
  if (!msg) return res.status(403).json({ message: 'Нельзя удалить' });
  res.json({ ok: true });
}
