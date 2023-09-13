import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateSoilTypeCommand {
    name: string

    constructor(name: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
    }
}
