import { Document } from 'mongoose';

export interface IBase extends Document{
    isDeleted: Date
    modifiedUser: string
}
