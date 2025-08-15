import { userChatIds } from '../repositories/chatsRepo.js';
import { createMessage, editMessage, softDeleteMessage, messageById } from '../repositories/messagesRepo.js';
import { toggleMute } from '../repositories/mutedRepo.js';

export default function register(io, socket) {
  const userId = socket.user.id;

  // при подключении подписываемся на все чаты
  userChatIds(userId).then(ids => ids.forEach(id => socket.join(`chat:${id}`)));

  socket.on('message:send', async ({ chatId, body, forwardMsgId }) => {
    const msg = await createMessage({ chatId, authorId: userId, body, forwardMsgId });
    io.to(`chat:${chatId}`).emit('message:new', msg);
    io.to(`chat:${chatId}`).emit('notify:newMessage', { chatId });
  });

  socket.on('message:edit', async ({ messageId, body }) => {
    const msg = await editMessage({ messageId, userId, body });
    if (!msg) return;
    io.to(`chat:${msg.chat_id}`).emit('message:updated', { messageId, body: msg.body, editedAt: msg.edited_at });
  });

  socket.on('message:delete', async ({ messageId }) => {
    const msg = await softDeleteMessage({ messageId, userId });
    if (!msg) return;
    io.to(`chat:${msg.chat_id}`).emit('message:deleted', { messageId });
  });

  socket.on('chat:typing', ({ chatId }) => {
    socket.to(`chat:${chatId}`).emit('chat:typing', { chatId, userId });
  });

  socket.on('chat:mute:toggle', async ({ chatId }) => {
    const muted = await toggleMute(chatId, userId);
    socket.emit('chat:muted', { chatId, muted });
  });
}
