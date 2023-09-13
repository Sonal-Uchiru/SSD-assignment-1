import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateSlopeLevelCommand {
    name: string

    constructor(name: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
    }
}
