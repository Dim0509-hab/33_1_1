import { q } from '../db/index.js';
export async function toggleMute(chatId, userId) {
  const { rows } = await q(
    `WITH up AS (
       DELETE FROM muted_chats WHERE chat_id=$1 AND user_id=$2 RETURNING 1
     )
     INSERT INTO muted_chats(chat_id,user_id)
       SELECT $1,$2
       WHERE NOT EXISTS (SELECT 1 FROM up)
     RETURNING 1`,
    [chatId, userId]
  );
  // если вставилось — стало muted, если удалилось — стало unmuted
  return !!rows[0];
}
