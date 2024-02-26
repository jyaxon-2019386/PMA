'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from '../appointment/appointment.model.js'

export const test = async(req, res) =>{
    return res.send({message: 'Test is running!'})
}

export const save = async(req, res) =>{
    try{
        //Capturar la data
        let data = req.body
        data.user = req.user._id // Extraer el id del usuario LOGUEADO
        //Verificar que exista el animal
        let animal = await Animal.findOne({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found 😒'})
        //Validar que la mascota NO tenga una cita activa con su persona
        let existAppointment = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal,
                    user: data.user
                },
                {
                    date: data.date,
                    user: data.user
                }
            ]
        })
        if(existAppointment) return res.send({message: 'Appointment already exist!'})
        //EJERCICIO: EL USUARIO SOLO PUEDA TENER UNA CITA POR DIA
        
        //Guardar
        let appointment = new Appointment(data) 
        await appointment.save()
        return res.send({message: `Appintment saved succesfully 😊! for the date ${appointment.date}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error creating appointment', err})
    }
}