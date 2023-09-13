import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateCultivationMethodCommand {
    name: string

    constructor(name: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
    }
}
