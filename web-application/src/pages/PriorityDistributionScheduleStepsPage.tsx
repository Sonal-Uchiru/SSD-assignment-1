import * as React from 'react'
import theme from '../theme/hooks/CreateTheme'
import Box from '@mui/material/Box'
import PriorityDistributionStepsCard from '../components/organisms/cards/PriorityDistibutionStepsCard'
import Title from '../components/atoms/title/Title'
import FileUploadButton from '../components/atoms/buttons/FileUploadButton'
import PriorityDistributionSchedulePage from './PriorityDistributionSchedulePage'
import ErrorModal from '../components/modals/ErrorModal'
import PriorityDistributionService from '../api/services/PriorityDistributionService'

export default function PriorityDistributionScheduleStepsPage() {
    const [step, setStep] = React.useState<number>(1)
    const [predictions, setPredictions] = React.useState([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)

    const handleSubmit = async (file: File) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response =
                await PriorityDistributionService.generatePriorityDistributionAsync(
                    formData
                )
            setIsLoading(false)
            setPredictions(response.data)
            setStep(2)
        } catch (error) {
            setIsLoading(false)
            setErrorModalVisibility(true)
            //throw new Error('Failed to receive predictions')
        }
    }

    return (
        <>
            {step === 1 && (
                <Box sx={{ minHeight: 650 }}>
                    <div>
                        <Title
                            backicon={false}
                            titleName="titles.priorityDistributionSchedule"
                        />
                    </div>
                    <div style={styles.card}>
                        <div>
                            <PriorityDistributionStepsCard
                                steps={'priorityDistributionSteps.step1'}
                                stepTitle={
                                    'priorityDistributionSteps.step1Title'
                                }
                                description={
                                    'priorityDistributionSteps.step1Description'
                                }
                            />

                            <PriorityDistributionStepsCard
                                steps={'priorityDistributionSteps.step2'}
                                stepTitle={
                                    'priorityDistributionSteps.step2Title'
                                }
                                description={
                                    'priorityDistributionSteps.step2Description'
                                }
                            />
                            <PriorityDistributionStepsCard
                                steps={'priorityDistributionSteps.step3'}
                                stepTitle={
                                    'priorityDistributionSteps.step3Title'
                                }
                                description={
                                    'priorityDistributionSteps.step3Description'
                                }
                            />
                        </div>
                    </div>
                    <div style={styles.button}>
                        <FileUploadButton
                            title={'containedButtonTitles.upload'}
                            color={theme.palette.white.main}
                            backgroundColor={theme.palette.primary.main}
                            onChange={(selectedFile) => {
                                if (selectedFile) {
                                    handleSubmit(selectedFile[0])
                                }
                            }}
                            isLoading={isLoading}
                        />
                    </div>
                </Box>
            )}
            {step === 2 && (
                <PriorityDistributionSchedulePage predictions={predictions} />
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
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
    },

    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
}
