import express from 'express'
import { validateJwt, isAdmin} from '../middlewares/validate-Jwt.js'
import { test, register, login, update, deleteU} from './user.controller.js'

const api = express.Router()

// RUTAS PÚBLICAS
api.post('/register', register)
api.post('/login', login)


// RUTAS PRIVADAS (SOLO USUARIOS LOGUEADOS)
                // Middleware
api.get('/test', [validateJwt], test)
api.put('/update/:id', update) // Middleware -> funciones intermedias que sirven para validar
api.delete('/delete/:id', deleteU)


export default api