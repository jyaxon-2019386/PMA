import { Schema, model } from 'mongoose';
    
const animalShema = Schema({
    nameAnimal: {
        type: String,
        required: true
    },
    ageAnimal: {
        type: String,
        required: true
    },
    typeAnimal: {
        type: String,
        required: true
    },
    breedAnimal: {
        type: String,
        required: true
    },
    paws: {
        type: String,
        required: true
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},{
    versionKey: false // Deshabilitar el __v de mongoDB
})

export default model('animal', animalShema)