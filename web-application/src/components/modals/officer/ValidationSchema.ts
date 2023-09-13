import * as Yup from 'yup'

export const OfficerAddNewFieldValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'inputField.paddyFieldNameMinCharacterCountError')
        .required('inputField.errorText'),
    paddyType: Yup.string().required('selectField.paddyTypeErrorText'),
    slope: Yup.string().required('selectField.slopeErrorText'),
    location: Yup.string().required('selectField.locationErrorText'),
    waterIn: Yup.string().required('selectField.waterInErrorText'),
})

export const EditResearchCategoryValidationSchema = Yup.object().shape({
    category: Yup.string().required('selectField.categoryRequiredErrorText'),
    subCategory: Yup.string().required('selectField.subCategoryRequiredError'),
})

export const AddResearchPaperValidationSchema = Yup.object().shape({
    topic: Yup.string().required('selectField.topicRequiredErrorText'),
    category: Yup.string().required('selectField.categoryRequiredErrorText'),
    subCategory: Yup.string().required('selectField.subCategoryRequiredError'),
})
