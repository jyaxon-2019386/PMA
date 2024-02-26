'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate} from '../utils/validator.js' 
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        // Siguimento que hace Google (gmail)
        // Capturar el formulario (body)
        let data = req.body
        console.log(data)
        // Encriptar la contrasena
        data.password = await encrypt(data.password)
        // Asignar el rol por defecto
        data.role = 'CLIENT'
        // Guardar la informacion en la BD
        let user = new User(data)
        await user.save()
        // Responder al usuario
        return res.send({message: `Registered successfully, can be logged with ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async(req, res) =>{
    try{
        // Capturar los datos (body)
        let { username, password } = req.body
        // Validar que el usuario exista
        let user = await User.findOne({username}) // Busca un solo registro, username: 'jyaxon'
        // Verificar que la contrasena coincida
        if(user && checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id, // sub
                username: user.username,
                name: user.name,
                role: user.role
            }
            // Generar el token
            let token = await generateJwt(loggedUser)
            // Respode el usuario 
            return res.send({
                message: `Welcome, ${loggedUser.name}`, 
                token,
                loggedUser
            })   
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const update = async(req, res) => { // Datos generales (NO PASSWORD)
    try{
        // Obtener ID del usuario a ACTUALIZAR
        let { id } = req.params 
        // Obtener los datos a ACTUALIZAR
        let data = req.body
        // Validar si data trae informacion
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        // Validar si tiene permisos (tokenizacion)
        // Actualizar (BD)
        let updateUser = await User.findOneAndUpdate(
            {_id: id},  // ObjectID <- Hexadecimales (Hora sys, Version Mongo, llave privada...)
            data,// Los datos que se van a actualizar
            { new: true } // Objeto de la BD ya actualizado
        )
        // Validar la actualizacion
        if(!updateUser) return res.status(401).send({message: 'User not found and not updated'})
        // Respondo al usuario  
        return res.send({message: 'Update user', updateUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is alredy taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        // Obtener Id
        let { id } = req.params
        // Validar si esta logueado
        // Eliminar deleteOne (Solo elimina no devuelve el documento) / findOneAndDelete(No devuelve el documento eliminado) 
        let deleteUser = await User.findOneAndDelete({_id: id})
        // Verificar si se elimino
        if(!deleteUser) return res.status(404).send({message: 'Account not found and deleted'})
        // Responder
        return res.send({message: `Account with username ${deleteUser.username} deleted succesfully`}) // Status 200

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}