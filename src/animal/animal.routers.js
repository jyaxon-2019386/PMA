'use strict'

import { Router } from 'express'
import { save, get, update, deleteA, search } from './animal.controller.js'

const api = Router()

// api.post('/registerAnimal', registerAnimal)
api.post('/save', save)
api.get('/get', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteA)
api.post('/search', search)

export default api