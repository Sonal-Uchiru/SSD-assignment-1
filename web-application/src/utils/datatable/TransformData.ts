export const getDataArrayByJson = (jsonData: any): any => {
    const dataArray: any = []

    jsonData?.forEach((item: any) => {
        const data = Object.keys(item).map(function (key) {
            return item[key]
        })
        dataArray.push(data)
    })

    return dataArray
}
