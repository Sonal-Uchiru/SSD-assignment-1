import * as Yup from 'yup'

export const LoginFormValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('loginAndRegisterPage.invalidEmailErrorText')
        .required('loginAndRegisterPage.emailRequiredErrorText'),
    password: Yup.string().required(
        'loginAndRegisterPage.passwordRequiredErrorText'
    ),
})

export const RegisterFormValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(
        'loginAndRegisterPage.firstNameRequiredErrorText'
    ),
    lastName: Yup.string().required(
        'loginAndRegisterPage.lastNameRequiredErrorText'
    ),
    email: Yup.string()
        .email('loginAndRegisterPage.invalidEmailErrorText')
        .required('loginAndRegisterPage.emailRequiredErrorText'),
    password: Yup.string().required(
        'loginAndRegisterPage.passwordRequiredErrorText'
    ),
    confirmPassword: Yup.string().required(
        'loginAndRegisterPage.confirmPasswordRequiredErrorText'
    ),
})
