import { q } from '../db/index.js';

export async function createUser({ email, password_hash }) {
  const { rows } = await q(
    `INSERT INTO users(email, password_hash) VALUES ($1,$2) RETURNING id, email, nickname, email_visible, email_verified, avatar_url`,
    [email, password_hash]
  );
  return rows[0];
}

export async function findByEmail(email) {
  const { rows } = await q(`SELECT * FROM users WHERE email=$1`, [email]);
  return rows[0];
}

export async function findById(id) {
  const { rows } = await q(`SELECT * FROM users WHERE id=$1`, [id]);
  return rows[0];
}

export async function setEmailVerified(id) {
  await q(`UPDATE users SET email_verified=TRUE WHERE id=$1`, [id]);
}

export async function updateProfile(id, { nickname, email_visible, avatar_url }) {
  const { rows } = await q(
    `UPDATE users
       SET nickname = COALESCE($2, nickname),
           email_visible = COALESCE($3, email_visible),
           avatar_url = COALESCE($4, avatar_url)
     WHERE id=$1
     RETURNING id, email, nickname, email_visible, email_verified, avatar_url`,
    [id, nickname, email_visible, avatar_url]
  );
  return rows[0];
}

export async function searchUsers(query) {
  const like = `%${query}%`;
  const { rows } = await q(
    `SELECT id, nickname,
            CASE WHEN email_visible THEN email ELSE NULL END AS email,
            avatar_url
       FROM users
      WHERE (nickname ILIKE $1) OR (email_visible AND email ILIKE $1)
      ORDER BY nickname NULLS LAST
      LIMIT 20`,
    [like]
  );
  return rows;
}
