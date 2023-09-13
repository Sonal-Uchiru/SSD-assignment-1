export class ChangePasswordUserCommand {
    newPassword: string
    currentPassword: string

    constructor(newPassword: string, curentPassword: string) {
        this.newPassword = newPassword
        this.currentPassword = curentPassword
    }
}
