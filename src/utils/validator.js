'use strict'

import { hash, compare } from 'bcrypt'

//Encriptar la contrasena 
export const encrypt = (password) => { // Usar en cualquier parte del proyecto 'export'
    try{
        return hash(password, 10) // 10 para encriptar una contrasena 
    }catch(err){
        console.error(err)
        return err
    }
}

// Validar la contrasena
export const checkPassword = async(password, hash)=>{
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, userId) => {
    if(userId){
        if(
            Object.entries(data).length === 0 || 
            data.password || 
            data.password == '' ||
            data.role ||
            data.role == ''
        ){
            return false
        }
        return true
    }else{
        if(
            Object.entries(data).length === 0 || 
            data.keeper ||
            data.keeper == ''
        ){
            return false
        }
        return true
    }
    
}

