'use strict'

import User from '../user/user.model.js'
import {  checkUpdate } from '../utils/validator.js'
import Animal from './animal.model.js'

export const test = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'test function is running' })
}

// GUARDAR ANIMALES
export const save = async(req, res) => {
    try{
        // Capturar datos
        let data = req.body
        // Validar que el Keeper exista
        let user = await User.findOne({_id: data.keeper})
        if(!user) return res.status(404).send({message: 'Keeper not found'})
        // Crear la instancia del 'animal'
        let animal = new Animal(data)
        //Guardar animal
        await animal.save()
        // Responde si todo sale bien
        return res.send({message: 'Animal saved succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving animal'})
    }
}

// LISTAR ANIMALES
export const get = async(req, res) => {
    try{
        let animals = await Animal.find()
        return res.send({animals})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting animals'})
    }
}

// EDITAR ANIMALES
export const update = async(req, res) => {
    try{
        //Capturar la data
        let data = req.body
        //Caputar el id del animal a actualizar
        let { id } = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        //Actualizar
        let updateAnimal = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('keeper', ['name', 'surname', 'phone']) //Elimina la informacion sensible
        //Validar la actualizacion
        if(!updateAnimal) return res.status(404).send({message: 'Animal not found and not be updated'})
        //Responder si todo va bien
        return res.send({message: `Animal updated succesfully`, updateAnimal})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating animal'})
    }
}

// ELIMINAR ANIMALES
export const deleteA = async(req, res) => {
    try{
        //Capturar el ID
        let { id } = req.params
        //Eliminar
        let deleteAnimal = await Animal.deleteOne({_id: id})
        //Validar que se elimina
        if(deleteAnimal.deleteCount === 0) return res.status(404).send({message: 'Animal not found and not deleted'})
        // Responder
        return res.send({message: 'Deleted animal succesfully'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error deleting animal'})
    }
}

// BUSCAR KEEPER
export const search = async(req, res) => {
    try{
        //Obtener el parametro de busqueda
        let { search } = req.body
        //Buscar
        let animals = await Animal.find(
            {nameAnimal: search}
        ).populate('keeper', ['name', 'surname', 'phone']) 
        //Validar la respuesta
        if(!animals) return res.status(404).send({message: 'Animals not found'})
        //Responder
        return res.send({message: 'Animals found', animals})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching animals'})
    }
}
