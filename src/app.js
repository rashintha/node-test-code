import bodyParser from 'body-parser'
import express from 'express'
import DB from './db/db.js'
import employeeRoutes from './routes/employees.js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000
const db = new DB()

db.initialize()

app.use(bodyParser.json())

app.use('/employees', employeeRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})