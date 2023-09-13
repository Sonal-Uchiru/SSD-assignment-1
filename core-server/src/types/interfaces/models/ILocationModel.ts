import { IBase } from './IBaseModel'

export interface ILocation extends IBase {
    [x: string]: any
    name: string
}
