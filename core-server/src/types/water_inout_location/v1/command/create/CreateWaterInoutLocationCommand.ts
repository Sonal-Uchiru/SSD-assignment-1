import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateWaterInoutLocationCommand {
    name: string

    constructor(name: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
    }
}
