import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateLocationCommand {
    name: string

    constructor(name: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
    }
}
