import * as React from 'react'
import Box from '@mui/material/Box'
import Title from '../components/atoms/title/Title'
import theme from '../theme/hooks/CreateTheme'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import PriorityDistributionScheduleDataTable from '../components/organisms/tables/PriorityDistributionScheduleDataTable'
import { Grid } from '@mui/material'
import HeadLine4 from '../components/atoms/typographies/HeadLine4'
import { Calendar, DateObject } from 'react-multi-date-picker'
import SelectField from '../components/atoms/selectField/SelectFieldAtom'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { PriorityDistributionScheduleInitialValues } from './InitialValues'
import { PriorityDistributionScheduleValidationSchema } from './ValidationSchema'
import FinalizedTimeSchedulePage from './FinalizedTimeSchedulePage'
import ErrorModal from '../components/modals/ErrorModal'

interface Props {
    predictions: any
}

export default function PriorityDistributionSchedulePage({
    predictions,
}: Props) {
    const navigate = useNavigate()

    const [steps, setSteps] = React.useState<number>(1)
    const [selectedDates, setSelectedDates] = React.useState<any>([])
    const [selectedOpeningHours, setSelectedOpeningHours] = React.useState('')
    const [individualTimeSlot, setIndividualTimeSlot] = React.useState('')
    const [agrarianOffice, setAgrarianOffice] = React.useState('')
    const [finalizedPredictions, setFinalizedPredictions] = React.useState<any>(
        []
    )
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)
    const [calenderErrorText, setCalenderErrorText] = React.useState('')

    const openingHours = [
        { value: '9.00 AM - 2.00 PM', label: '9.00 AM - 2.00 PM' },
        { value: '10.30 AM - 1.30 PM', label: '10.30 AM - 1.30 PM' },
        { value: '1.30 PM - 4.30 PM', label: '1.30 PM - 4.30 PM' },
        { value: '8.00 AM - 5.00 PM', label: '8.00 AM - 5.00 PM' },
    ]

    const timeSlot = [
        { value: 10, label: '10 minutes' },
        { value: 15, label: '15 minutes' },
        { value: 20, label: '20 minutes' },
    ]

    const location = [
        { value: 'Kaluthara', label: 'Kalutara' },
        { value: 'Panadura', label: 'Panadura' },
        { value: 'Horana', label: 'Horana' },
    ]

    // Function to allocate time slots based on priority and available slots
    const allocateTimeSlots = async (predictionData: any) => {
        try {
            if (
                selectedDates?.length === 0 ||
                !selectedOpeningHours ||
                !individualTimeSlot ||
                !agrarianOffice
            ) {
                if (selectedDates?.length === 0) {
                    setCalenderErrorText(
                        'selectField.calenderDateRequiredErrorText'
                    )
                }

                return
            }

            setIsLoading(true)
            const allocatedFarmers: any = [] // Array to store allocated farmers
            const convertedDates = await selectedDates.map(
                (timestamp: any) => new Date(timestamp)
            )
            const sortedPredictionData = [...predictionData].sort(
                (a, b) => a?.predicted_priority - b?.predicted_priority
            )

            // Convert the selected opening hours to 24-hour format
            const [startString, endString] = selectedOpeningHours.split(' - ')
            const [startHour, startMinute] = startString
                .split(':')[0]
                .split('.')
                .map((str) => parseInt(str))
            const [endHour, endMinute] = endString
                .split(':')[0]
                .split('.')
                .map((str) => parseInt(str))
            const startTime =
                (startHour + (startString.includes('PM') ? 12 : 0)) * 60 +
                startMinute
            const endTime =
                (endHour + (endString.includes('PM') ? 12 : 0)) * 60 + endMinute

            // Calculate total number of slots available per day based on selected opening hours and time slot
            const totalSlotsPerDay = Math.floor(
                (endTime - startTime) / parseInt(individualTimeSlot)
            )

            // Generate available time slots for all selected dates
            const availableSlots: any = []
            convertedDates?.forEach((date: any) => {
                for (let i = 0; i < totalSlotsPerDay; i++) {
                    const slotStartTime =
                        startTime + i * parseInt(individualTimeSlot)
                    const slotStartHour = Math.floor(slotStartTime / 60)
                    const slotStartMinute = slotStartTime % 60
                    availableSlots.push(
                        new Date(date.setHours(slotStartHour, slotStartMinute))
                    )
                }
            })

            // Iterate through sortedFarmers and allocate time slots
            sortedPredictionData?.forEach((farmer) => {
                const allocatedSlot = availableSlots.shift() // Get the next available slot
                if (allocatedSlot) {
                    allocatedFarmers.push({
                        ...farmer,
                        allocatedDate: allocatedSlot?.toLocaleDateString(), // Assign allocated date
                        allocatedTimeSlot: `${allocatedSlot.toLocaleTimeString()} - ${new Date(
                            allocatedSlot.getTime() +
                                parseInt(individualTimeSlot) * 60000
                        ).toLocaleTimeString()}`, // Calculate time slot range
                    })
                } else {
                    // If no available slot, mark as "Not Allocated"
                    allocatedFarmers.push({
                        ...farmer,
                        allocatedDate: 'Not Allocated',
                        allocatedTimeSlot: 'Not Allocated',
                    })
                }
            })

            const sortedPredictions = [...allocatedFarmers].sort((a, b) => {
                if (
                    a.allocatedDate !== 'Not Allocated' &&
                    b.allocatedDate === 'Not Allocated'
                ) {
                    return -1 // Allocated farmers first
                }
                if (
                    a.allocatedDate === 'Not Allocated' &&
                    b.allocatedDate !== 'Not Allocated'
                ) {
                    return 1 // Not allocated farmers next
                }
                return 0 // Maintain original order for both groups
            })

            setFinalizedPredictions(sortedPredictions)
            setIsLoading(false)
            setSteps(2)
        } catch (error: any) {
            setIsLoading(false)
            setErrorModalVisibility(true)
        }
    }
    return (
        <>
            {steps === 1 && (
                <Box sx={{ minHeight: 650 }}>
                    <div>
                        <Title
                            backicon={true}
                            titleName="titles.priorityDistributionSchedule"
                            onClick={() => navigate('/priorityDistribution')}
                        />
                    </div>

                    <Grid container>
                        <Grid item xs={12} md={12} xl={9} lg={9}>
                            <div>
                                <PriorityDistributionScheduleDataTable
                                    predictions={predictions}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={12} xl={3} lg={3}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: 10,
                                    textAlign: 'center',
                                }}
                            >
                                <HeadLine4
                                    text={
                                        'priorityDistibutionSchedule.openingDates'
                                    }
                                    color={theme.palette.primary.main}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: 10,
                                    textAlign: 'center',
                                }}
                            >
                                <Calendar
                                    multiple
                                    value={selectedDates}
                                    onChange={setSelectedDates}
                                    format="MMMM DD YYYY"
                                    sort
                                />
                            </div>

                            {calenderErrorText && (
                                <div
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <HeadLine4
                                        text={calenderErrorText}
                                        color={theme.palette.error.main}
                                    />
                                </div>
                            )}

                            <Formik
                                initialValues={
                                    PriorityDistributionScheduleInitialValues
                                }
                                validationSchema={
                                    PriorityDistributionScheduleValidationSchema
                                }
                                onSubmit={(values) => {
                                    console.log(values)
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    values,
                                }) => (
                                    <Form>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginBottom: 10,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <HeadLine4
                                                text={
                                                    'priorityDistibutionSchedule.openingHours'
                                                }
                                                color={
                                                    theme.palette.primary.main
                                                }
                                            />
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 20,
                                                marginBottom: 30,
                                                marginLeft: 5,
                                                marginRight: 5,
                                            }}
                                        >
                                            <SelectField
                                                label={'selectField.hours'}
                                                placeholder={
                                                    'selectField.selectHours'
                                                }
                                                options={openingHours}
                                                name="hours"
                                                value={values.hours}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    setSelectedOpeningHours(
                                                        e.target.value
                                                    )
                                                }}
                                                onBlur={handleBlur}
                                                error={
                                                    (errors.hours &&
                                                        touched.hours) ||
                                                    undefined
                                                }
                                                errorText={errors.hours}
                                            />
                                        </div>

                                        {((errors.hours && touched.hours) ||
                                            undefined) && (
                                            <div
                                                style={{ marginTop: 50 }}
                                            ></div>
                                        )}

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginBottom: 10,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <HeadLine4
                                                text={
                                                    'priorityDistibutionSchedule.individualTimeSlot'
                                                }
                                                color={
                                                    theme.palette.primary.main
                                                }
                                            />
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 20,
                                                marginBottom: 30,
                                                marginLeft: 5,
                                                marginRight: 5,
                                            }}
                                        >
                                            <SelectField
                                                label={'selectField.timeSlot'}
                                                placeholder={
                                                    'selectField.selectTimeSlot'
                                                }
                                                options={timeSlot}
                                                name="timeSlot"
                                                value={values.timeSlot}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    setIndividualTimeSlot(
                                                        e.target.value
                                                    )
                                                }}
                                                onBlur={handleBlur}
                                                error={
                                                    (errors.timeSlot &&
                                                        touched.timeSlot) ||
                                                    undefined
                                                }
                                                errorText={errors.timeSlot}
                                            />
                                        </div>

                                        {((errors.timeSlot &&
                                            touched.timeSlot) ||
                                            undefined) && (
                                            <div
                                                style={{ marginTop: 50 }}
                                            ></div>
                                        )}

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginBottom: 10,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <HeadLine4
                                                text={
                                                    'priorityDistibutionSchedule.selectAgrarianDivision'
                                                }
                                                color={
                                                    theme.palette.primary.main
                                                }
                                            />
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 20,
                                                marginLeft: 5,
                                                marginRight: 5,
                                            }}
                                        >
                                            <SelectField
                                                label={
                                                    'selectField.agraianDivision'
                                                }
                                                placeholder={
                                                    'selectField.selectAgrarianDivision'
                                                }
                                                options={location}
                                                name="agrarianDivision"
                                                value={values.agrarianDivision}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    setAgrarianOffice(
                                                        e.target.value
                                                    )
                                                }}
                                                onBlur={handleBlur}
                                                error={
                                                    (errors.agrarianDivision &&
                                                        touched.agrarianDivision) ||
                                                    undefined
                                                }
                                                errorText={
                                                    errors.agrarianDivision
                                                }
                                            />
                                        </div>

                                        {((errors.agrarianDivision &&
                                            touched.agrarianDivision) ||
                                            undefined) && (
                                            <div
                                                style={{ marginBottom: 40 }}
                                            ></div>
                                        )}
                                        <div style={styles.button}>
                                            <ContainedButton
                                                title={
                                                    'containedButtonTitles.cteateSheet'
                                                }
                                                backgroundColor={
                                                    theme.palette.primary.main
                                                }
                                                width={220}
                                                height={50}
                                                onClick={() => {
                                                    allocateTimeSlots(
                                                        predictions
                                                    )
                                                }}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Grid>
                </Box>
            )}
            {steps === 2 && (
                <FinalizedTimeSchedulePage predictions={finalizedPredictions} />
            )}
            {errorModalVisibility && (
                <ErrorModal
                    handleCancel={() => setErrorModalVisibility(false)}
                />
            )}
        </>
    )
}

const styles = {
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
        marginBottom: 40,
    },
}
