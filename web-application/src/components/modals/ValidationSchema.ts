import * as Yup from 'yup'

export const ChangePasswordModalValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
        'passwordInputField.currentPasswordRequiredErrorText'
    ),
    newPassword: Yup.string().required(
        'passwordInputField.newPasswordRequiredErrorText'
    ),
    confirmPassword: Yup.string().required(
        'passwordInputField.confirmPasswordRequiredErrorText'
    ),
})

export const DeleteAccountConfirmationValidationSchema = Yup.object().shape({
    password: Yup.string().required(
        'loginAndRegisterPage.passwordRequiredErrorText'
    ),
})
