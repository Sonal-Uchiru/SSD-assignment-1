import CharacterModification from '../../../../../shared/CharacterModification'
import { UserRoles } from '../../../../enum/user/UserRoles'

export class CreateUserCommand {
    firstName: string
    lastName: string
    email: string
    password: string
    role: UserRoles

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: UserRoles
    ) {
        this.firstName = CharacterModification.firstCharacterToUpper(firstName)
        this.lastName = CharacterModification.firstCharacterToUpper(lastName)
        this.email = email
        this.password = password
        this.role = role
    }
}
