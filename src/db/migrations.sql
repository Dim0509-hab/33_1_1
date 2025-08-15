-- users
CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  email         CITEXT UNIQUE NOT NULL,
  email_visible BOOLEAN      NOT NULL DEFAULT TRUE,
  email_verified BOOLEAN     NOT NULL DEFAULT FALSE,
  password_hash TEXT         NOT NULL,
  nickname      CITEXT UNIQUE,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_nickname ON users(nickname);

-- контакты (двусторонняя связь фиксируем двумя строками)
CREATE TABLE contacts (
  owner_id  BIGINT REFERENCES users(id) ON DELETE CASCADE,
  contact_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (owner_id, contact_id)
);

-- чаты (direct или group)
CREATE TYPE chat_type AS ENUM ('direct','group');
CREATE TABLE chats (
  id        BIGSERIAL PRIMARY KEY,
  type      chat_type NOT NULL,
  title     TEXT,               -- для групп
  owner_id  BIGINT REFERENCES users(id), -- создатель группы
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- участники чата
CREATE TABLE chat_members (
  chat_id BIGINT REFERENCES chats(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (chat_id, user_id)
);
CREATE INDEX idx_chat_members_user ON chat_members(user_id);

-- сообщения
CREATE TABLE messages (
  id         BIGSERIAL PRIMARY KEY,
  chat_id    BIGINT REFERENCES chats(id) ON DELETE CASCADE,
  author_id  BIGINT REFERENCES users(id) ON DELETE SET NULL,
  body       TEXT NOT NULL,
  edited_at  TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  forwarded_from_msg BIGINT REFERENCES messages(id), -- для пересылки
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_messages_chat_created ON messages(chat_id, created_at);

-- чаты с выключенными оповещениями
CREATE TABLE muted_chats (
  chat_id BIGINT REFERENCES chats(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (chat_id, user_id)
);
