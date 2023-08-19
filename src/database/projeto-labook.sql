-- Active: 1687390462412@@127.0.0.1@3306
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    deslike INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON DELETE CASCADE
    on UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS likes_deslikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE
    on UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE
    on UPDATE CASCADE
)

