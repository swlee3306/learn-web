import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DB_PATH = process.env.LEARN_DB_PATH || '/data/learn.db';

let _db: Database.Database | null = null;

export function db() {
  if (_db) return _db;

  const dir = path.dirname(DB_PATH);
  fs.mkdirSync(dir, {recursive: true});
  const database = new Database(DB_PATH);
  database.pragma('journal_mode = WAL');

  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      pass_hash TEXT NOT NULL,
      is_admin INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT NOT NULL,
      mission_id TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      PRIMARY KEY(user_id, mission_id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  _db = database;
  return database;
}
