import express from "express";

import { Router } from "express";
import { test, save } from "./appointment.controller.js"; 
import { validateJwt } from "../middlewares/validate-jwt.js"; 

const api = Router()

// RUTAS PUBLICAS
api.get('/test', test)
// RUTAS PRIVADAS - CLIENT
api.post('/save', [validateJwt], save)

export default api