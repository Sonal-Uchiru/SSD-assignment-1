export class CreateOpeningHourCommand {
    openingTime: Date
    closingTime: Date

    constructor(openingTime: Date, closingTime: Date) {
        this.openingTime = openingTime
        this.closingTime = closingTime
    }
}
