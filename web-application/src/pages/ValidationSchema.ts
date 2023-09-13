import * as Yup from 'yup'

export const PriorityDistributionScheduleValidationSchema = Yup.object().shape({
    hours: Yup.string().required('selectField.hoursErrorText'),
    timeSlot: Yup.string().required('selectField.timeSlotErrorText'),
    agrarianDivision: Yup.string().required(
        'selectField.agrarianDivisionErrorText'
    ),
    date: Yup.string().required('Date is Required'),
})
