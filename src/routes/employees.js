import { Router } from 'express'
import Employees from '../modules/employee/employees.js';
import { validateEmail } from '../util/validations.js';

const router = Router()

router.get('/', async (req, res, next) => {
  const employees = new Employees()

  let length = req.query.length ?? 1000
  let offset = req.query.offset ?? 0

  const data = await employees.getAllEmployees(length, offset)

  if (data.error) {
    res.status(500).json({ error: data.error.message })
  }

  res.json({
    message: "success",
    data: data.data
  })
})

router.post('/', async (req, res, next) => {
  let name = req.body.name
  let email = req.body.email
  let profile_picture = req.body.name

  if (!name || name == "") {
    res.status(400).json({ message: "Please enter a valid name" })
    return
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Please enter a valid email" })
    return
  }

  const employees = new Employees()

  const result = await employees.insertEmployee(name, email, profile_picture)

  if (result) {
    res.status(500).json({ error: result.error.message })
  }

  res.json({ message: "success" })
})

router.put('/:id', async (req, res, next) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "Please enter a valid id" })
    return
  }

  let name = req.body.name
  let email = req.body.email
  let profile_picture = req.body.name

  if (!name || name == "") {
    res.status(400).json({ message: "Please enter a valid name" })
    return
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Please enter a valid email" })
    return
  }

  const employees = new Employees()

  const result = await employees.updateEmployee(req.params.id, name, email, profile_picture)

  if (result) {
    res.status(500).json({ error: result.error.message })
  }

  res.json({ message: "success" })
})

router.delete('/:id', async (req, res, next) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "Please enter a valid id" })
    return
  }

  const employees = new Employees()

  const result = await employees.deleteEmployee(req.params.id)

  if (result) {
    res.status(500).json({ error: result.error.message })
  }

  res.json({ message: "success" })
})

export default router;