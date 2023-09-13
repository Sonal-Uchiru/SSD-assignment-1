import CharacterModification from '../../../../../shared/CharacterModification'

export class UpdateUserCommand {
    firstName: string
    lastName: string
    mobile: number
    profilePicture: string
    modifiedUser: string

    constructor(
        firstName: string,
        lastName: string,
        mobile: number,
        profilePicture: string,
        modifiedUser: string
    ) {
        this.firstName = CharacterModification.firstCharacterToUpper(firstName)
        this.lastName = CharacterModification.firstCharacterToUpper(lastName)
        ;(this.mobile = mobile),
            (this.profilePicture = profilePicture),
            (this.modifiedUser = modifiedUser)
    }
}
