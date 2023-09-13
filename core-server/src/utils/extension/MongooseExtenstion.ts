import mongoose from 'mongoose'

export const GetObjectID = (id: string): mongoose.Types.ObjectId => {
    return mongoose.Types.ObjectId(id);
}


