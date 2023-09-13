import mongoose from 'mongoose'

const Schema = mongoose.Schema
const BaseEntitySchema = new Schema({
    isDeleted: {
        type: Date,
        required: false,
        default: null,
    },
    modifiedUser: {
        type: String,
        required: true,
        default: '000000000000000000000000',
    },
})

export default BaseEntitySchema
