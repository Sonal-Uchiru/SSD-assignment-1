import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateAggrerianDivisionCommand {
    name: string
    code: string

    constructor(name: string, code: string) {
        this.name = CharacterModification.firstCharacterToUpper(name)
        this.code = code
    }
}
