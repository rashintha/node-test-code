import DB from "../../db/db.js";

export default class Employees {
  constructor() {
    this.database = new DB()
  }

  // Getting all employees
  async getAllEmployees(length, offset) {
    let results
    await new Promise((resolve, _reject) => {
      this.database.getDB().all(`SELECT * FROM employee WHERE status='Active' LIMIT ${offset}, ${length}`, (err, rows) => {
        this.database.close()

        let data = []

        // Preparing data with converting timezone
        rows.forEach(row => {
          let created_at = new Date(row.created_at * 1000)
          let modified_at = row.modified_at ? (new Date(row.modified_at * 1000)).toLocaleString("en-US", { timeZone: 'Europe/London' }) : null

          data.push({ ...row, created_at: created_at.toLocaleString("en-US", { timeZone: 'Europe/London' }), modified_at })
        });

        if (err) {
          results = {
            error: err,
            data: null
          }
        }

        results = {
          error: null,
          data: data
        }

        resolve()
      })
    })

    return results
  }

  // Inserting employee
  async insertEmployee(name, email, profile_picture) {
    let created_at = Date.now()

    let results
    await new Promise((resolve, _reject) => {
      this.database.getDB().run(`INSERT INTO employee 
      (name, email, profile_picture, created_at) VALUES ('${name}', '${email}', '${profile_picture}', '${created_at}')`, (err) => {
        this.database.close()

        if (err) {
          results = {
            error: err
          }
        }

        resolve()
      })
    })

    return results
  }

  // Updating employee
  async updateEmployee(id, name, email, profile_picture) {
    let modified_at = Date.now()

    let results
    await new Promise((resolve, _reject) => {
      this.database.getDB().run(`UPDATE employee SET
        name='${name}',
        email='${email}',
        profile_picture='${profile_picture}',
        modified_at=${modified_at}
        WHERE id=${id} AND status='Active'
      `, (err) => {
        this.database.close()

        if (err) {
          results = {
            error: err
          }
        }

        resolve()
      })
    })

    return results
  }

  // Deleting employee
  async deleteEmployee(id) {
    let modified_at = Date.now()

    let results
    await new Promise((resolve, _reject) => {
      this.database.getDB().run(`UPDATE employee SET
        modified_at=${modified_at},
        status='Deleted'
        WHERE id=${id} AND status='Active'
      `, (err) => {
        this.database.close()

        if (err) {
          results = {
            error: err
          }
        }

        resolve()
      })
    })

    return results
  }
}