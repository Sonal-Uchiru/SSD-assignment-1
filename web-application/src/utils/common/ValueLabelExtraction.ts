class ExtractObject {
    label: string
    value: string

    constructor(label: string, value: string) {
        this.label = label
        this.value = value
    }
}

export const ExtractValueAndLabel = (content: string): ExtractObject => {
    const label = content.split('-')[0]
    const value = content.split('-')[1]

    return new ExtractObject(label, value)
}
