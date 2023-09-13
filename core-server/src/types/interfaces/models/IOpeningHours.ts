import { IBase } from './IBaseModel'

export interface IOpeningHours extends IBase {
    [x: string]: any
    openingTime: Date
    closingTime: Date
}
