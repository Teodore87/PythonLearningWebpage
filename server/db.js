/**
 * PyLearn - Database Setup (SQLite)
 * 
 * Skapar och hanterar databasanslutningen med better-sqlite3.
 * Tabeller:
 *   - users: användardata med lösenordshash och admin-flagga
 *   - progress: JSON-baserad framstegsdata per användare
 * 
 * Admin-användaren seedas automatiskt vid första körningen.
 */

const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

// Skapa/öppna databasen (sparas i server-mappen)
const dbPath = path.join(__dirname, 'pylearn.db');
const db = new Database(dbPath);

// Aktivera WAL-läge för bättre prestanda vid concurrent access
db.pragma('journal_mode = WAL');

// --- SKAPA TABELLER ---
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        is_admin INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS progress (
        user_id INTEGER PRIMARY KEY,
        data_json TEXT NOT NULL DEFAULT '{}',
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`);

// --- SEEDA ADMIN-ANVÄNDARE ---
// Kolla om admin redan finns, om inte - skapa den
const existingAdmin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!existingAdmin) {
    const adminPassword = '87mushrOOms';
    const hash = bcrypt.hashSync(adminPassword, 10);
    db.prepare('INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, 1)').run('admin', hash);
    console.log('✅ Admin-användare skapad (username: admin)');
}

module.exports = db;
