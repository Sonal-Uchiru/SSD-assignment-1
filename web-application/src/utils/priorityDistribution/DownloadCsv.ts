function removePropertiesFromArray(array: any, propertiesToRemove: any) {
    return array.map((obj: any) => {
        propertiesToRemove.forEach((prop: any) => delete obj[prop])
        return obj
    })
}

// Function to convert an array of objects to a CSV file
function convertArrayToCSV(array: any) {
    const header = Object.keys(array[0]).join(',')
    const rows = array.map((obj: any) =>
        Object.values(obj)
            .map((value) => (typeof value === 'string' ? `"${value}"` : value))
            .join(',')
    )
    const csv = [header, ...rows].join('\n')
    return csv
}

// Function to download the CSV file
function downloadCSV(csv: any, filename: any) {
    const csvBlob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(csvBlob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', filename)
    a.click()
    window.URL.revokeObjectURL(url)
}

export default function convertAndDownloadCSV(dataArray: any, filename: any) {
    return new Promise((resolve, reject) => {
        const propertiesToRemove = [
            'predicted_priority',
            'allocatedDate',
            'allocatedTimeSlot',
        ]

        const modifiedArray = removePropertiesFromArray(
            dataArray,
            propertiesToRemove
        )
        const csvData = convertArrayToCSV(modifiedArray)

        try {
            downloadCSV(csvData, filename)
            resolve('CSV download completed successfully.')
        } catch (error) {
            reject(error)
        }
    })
}
