import {Schema} from 'mongoose'

const categorySchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    }
})

export default categorySchema