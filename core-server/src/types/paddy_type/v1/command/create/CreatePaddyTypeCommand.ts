import CharacterModification from '../../../../../shared/CharacterModification'

export class CreatePaddyTypeCommand {
    name: string

    constructor(name: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
    }
}
