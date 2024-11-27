const db = require("better-sqlite3")
const sql = new db('auth.db')

sql.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        login TEXT,
        password TEXT
    )    
`)