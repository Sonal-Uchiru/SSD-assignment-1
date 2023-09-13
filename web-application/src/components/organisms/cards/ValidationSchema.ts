import * as Yup from 'yup'

export const ForgotPasswordStep1ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('loginAndRegisterPage.invalidEmailErrorText')
        .required('loginAndRegisterPage.emailRequiredErrorText'),
})

export const ForgotPasswordStep2ValidationSchema = Yup.object().shape({
    code: Yup.string().required('inputField.codeRequiredErrorText'),
})
