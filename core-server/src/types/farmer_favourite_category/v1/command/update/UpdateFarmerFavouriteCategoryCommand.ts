export class UpdateFarmerFavouriteCategoryCommand {
    category: string
    user: string

    constructor(category: string, user: string) {
        ;(this.category = category), (this.user = user)
    }
}
