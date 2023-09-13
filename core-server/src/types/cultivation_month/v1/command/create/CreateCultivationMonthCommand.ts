import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateCultivationMonthCommand {
    name: string

    constructor(name: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
    }
}
