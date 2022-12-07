import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const sqlite3 = require('sqlite3').verbose()

export default class DB {
  constructor() {
    this.database = new sqlite3.Database(process.env.DB_FILE, (err) => {
      if (err) {
        console.error(err.message)
        return
      }

      console.log('Connected to SQLite DB')
    })
  }

  initialize() {
    this.database.serialize(() => {
      this.database.run(`CREATE TABLE IF NOT EXISTS employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(150) NOT NULL, 
        email VARCHAR(75) NOT NULL,
        profile_picture TEXT NULL DEFAULT NULL,
        created_at INTEGER NOT NULL,
        modified_at INTEGER NULL DEFAULT NULL,
        status VARCHAR(10) CHECK(status IN ('Active', 'Deleted')) NOT NULL DEFAULT 'Active'
      )`)
    })
  }

  getDB() {
    return this.database
  }

  close() {
    this.database.close((err) => {
      if (err) {
        console.error(err.message)
      }

      console.log('DB connection closed.')
    })
  }
}