export const getFormattedDate = (timestamp: string) => {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
    }${day}`
}
