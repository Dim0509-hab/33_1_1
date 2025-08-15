import { q } from '../db/index.js';

export async function getOrCreateDirect(userA, userB) {
  // ищем существующий direct-чат с обоими участниками
  const { rows } = await q(
    `SELECT c.id FROM chats c
       JOIN chat_members m1 ON m1.chat_id=c.id AND m1.user_id=$1
       JOIN chat_members m2 ON m2.chat_id=c.id AND m2.user_id=$2
      WHERE c.type='direct' LIMIT 1`,
    [userA, userB]
  );
  if (rows[0]) return rows[0].id;

  const ins = await q(`INSERT INTO chats(type) VALUES ('direct') RETURNING id`, []);
  const chatId = ins.rows[0].id;
  await q(`INSERT INTO chat_members(chat_id,user_id) VALUES($1,$2),($1,$3)`, [chatId, userA, userB]);
  return chatId;
}

export async function createGroup(ownerId, title, memberIds) {
  const { rows } = await q(
    `INSERT INTO chats(type, title, owner_id) VALUES ('group',$1,$2) RETURNING id`,
    [title, ownerId]
  );
  const chatId = rows[0].id;
  const values = [chatId, ownerId, ...memberIds];
  const placeholders = values.slice(1).map((_, i) => `($1,$${i + 2})`).join(',');
  await q(`INSERT INTO chat_members(chat_id,user_id) VALUES ${placeholders} ON CONFLICT DO NOTHING`, values);
  return chatId;
}

export async function listUserChats(userId) {
  const { rows } = await q(
    `SELECT c.id, c.type, c.title,
            EXISTS(SELECT 1 FROM muted_chats m WHERE m.chat_id=c.id AND m.user_id=$1) AS muted
       FROM chats c
       JOIN chat_members m ON m.chat_id=c.id
      WHERE m.user_id=$1
      ORDER BY c.created_at DESC`,
    [userId]
  );
  return rows;
}

export async function userChatIds(userId) {
  const { rows } = await q(`SELECT chat_id FROM chat_members WHERE user_id=$1`, [userId]);
  return rows.map(r => r.chat_id);
}
