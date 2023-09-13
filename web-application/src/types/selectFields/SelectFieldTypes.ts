export interface ISelectField {
    _id: string
    name: string
}

export class SelectFieldOptions {
    value: string | number
    label: string

    constructor(value: string | number, label: string) {
        this.value = value
        this.label = label
    }
}

export const getSelectFieldOptions = (
    values: ISelectField[]
): SelectFieldOptions[] => {
    return values.map((item) => new SelectFieldOptions(item._id, item.name))
}
