import mongoose, { Schema } from 'mongoose'
import { IUser } from '../types/interfaces/models/IUserModel'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import validator from 'validator'
import BaseEntitySchema from './Base'

dotenv.config({ path: '../../config/.env' })

const UserSchema: mongoose.Schema = new Schema(
    {
        firstName: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        lastName: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        email: {
            type: String,
            min: 3,
            max: 255,
            required: true,
            validate: [validator.isEmail, 'Invalid email'],
            createIndexes: { unique: true },
        },
        password: {
            type: String,
            min: 8,
            max: 255,
            match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,255}$/,
            required: true,
        },
        mobile: {
            type: Number,
            min: 8
        },
        profilePicture:{
            type: String
        },
        role: {
            type: Number,
            required: true,
        },
        ...BaseEntitySchema.obj
    },
    { timestamps: true }
)

// hash the password before saving the user
UserSchema.pre<IUser>('save', function (next) {
    const user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(Number(process.env.SALT), (saltError, salt) => {
        if (saltError) return next(saltError)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt,(error, hash) => {
            if (error) return next(error)
            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, role: this.get('role')  }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}


const User = mongoose.model<IUser>('User', UserSchema)
export default User
