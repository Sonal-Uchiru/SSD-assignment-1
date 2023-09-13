import { ISubCategory } from '../../../../../types/interfaces/models/ISubCategoryModel'
import CharacterModification from '../../../../../shared/CharacterModification'

export class CreateCategoryCommand {
    name: string
    iconUrl: string
    subCategories: [ISubCategory]

    constructor(name: string, iconUrl: string, subCategories: [ISubCategory]) {
        this.name = CharacterModification.firstCharacterToUpper(name)
        ;(this.iconUrl = iconUrl), (this.subCategories = subCategories)
        if(subCategories.length > 0){
            this.subCategoryCharacterModification()
        }
    }

    private subCategoryCharacterModification() {
        this.subCategories.forEach(
            (subCategory) =>
                (subCategory.name = CharacterModification.firstCharacterToUpper(
                    subCategory.name
                ))
        )
    }
}
