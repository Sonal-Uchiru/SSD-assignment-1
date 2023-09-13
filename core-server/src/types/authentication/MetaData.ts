export class MetaData {
    fullName: string
    email: string
    profilePicture: string

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        profilePicture: string
    ) {
        ;(this.fullName = `${firstName} ${lastName}`),
            (this.email = email),
            (this.profilePicture = profilePicture)
    }
}


