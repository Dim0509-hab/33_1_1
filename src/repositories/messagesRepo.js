import { q } from '../db/index.js';

export async function createMessage({ chatId, authorId, body, forwardMsgId }) {
  const { rows } = await q(
    `INSERT INTO messages(chat_id, author_id, body, forwarded_from_msg)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [chatId, authorId, body, forwardMsgId || null]
  );
  return rows[0];
}

export async function editMessage({ messageId, userId, body }) {
  const { rows } = await q(
    `UPDATE messages
        SET body=$3, edited_at=NOW()
      WHERE id=$1 AND author_id=$2 AND deleted_at IS NULL
      RETURNING *`,
    [messageId, userId, body]
  );
  return rows[0];
}

export async function softDeleteMessage({ messageId, userId }) {
  const { rows } = await q(
    `UPDATE messages
        SET deleted_at=NOW()
      WHERE id=$1 AND author_id=$2 AND deleted_at IS NULL
      RETURNING *`,
    [messageId, userId]
  );
  return rows[0];
}

export async function listMessages(chatId, limit = 50, before) {
  const params = [chatId];
  let sql = `SELECT * FROM messages WHERE chat_id=$1 ORDER BY created_at DESC`;
  if (before) {
    params.push(before);
    sql = `SELECT * FROM messages WHERE chat_id=$1 AND created_at < $2 ORDER BY created_at DESC`;
  }
  params.push(limit);
  sql += ` LIMIT $${params.length}`;
  const { rows } = await q(sql, params);
  return rows.reverse();
}

export async function messageById(id) {
  const { rows } = await q(`SELECT * FROM messages WHERE id=$1`, [id]);
  return rows[0];
}
