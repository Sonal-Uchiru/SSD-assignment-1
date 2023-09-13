import * as Yup from 'yup'
import { mobileNumberRegExp } from '../../../constants/RegexExpressions'

export const EditProfileValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(
        'loginAndRegisterPage.firstNameRequiredErrorText'
    ),
    lastName: Yup.string().required(
        'loginAndRegisterPage.lastNameRequiredErrorText'
    ),
    mobile: Yup.string().matches(
        mobileNumberRegExp,
        'inputField.mobileNumberErrorText'
    ),
})
