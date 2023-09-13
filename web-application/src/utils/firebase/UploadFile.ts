import { uploadBytes } from 'firebase/storage'
import { storage } from './Configuration'
import { ref, getDownloadURL, StorageReference } from '@firebase/storage'

export const uploadResearchPaperAsync = async (file: FileList) => {
    return await uploadFileAsync(file, 'ResearchPapers')
}

const uploadFileAsync = async (
    file: FileList,
    folderName: string
): Promise<string | null> => {
    const storageRef: StorageReference = ref(
        storage,
        `${folderName}/${file[0].name}`
    )

    return new Promise<string | null>((resolve, reject) => {
        uploadBytes(storageRef, file[0]).then((snapshot: any) => {
            getDownloadURL(ref(storage, snapshot.metadata.ref?.fullPath))
                .then((res) => {
                    resolve(res)
                })
                .catch((_) => reject(null))
        })
    })
}
