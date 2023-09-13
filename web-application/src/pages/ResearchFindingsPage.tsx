import * as React from 'react'
import Box from '@mui/material/Box'
import Title from '../components/atoms/title/Title'
import ResearchFindingsListDataTable from '../components/organisms/tables/ResearchFindingsListDataTable'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import theme from '../theme/hooks/CreateTheme'
import OfficerAddNewResearchPaperModal from '../components/modals/officer/OfficerAddNewResearchPaperModal'
import ResearchDisseminationProtectedApi from '../api/exclusive/ResearchDisseminationProtectedApi'
import { uploadResearchPaperAsync } from '../utils/firebase/UploadFile'
import Snackbar from '@mui/material/Snackbar'
import { Alert, AlertColor } from '@mui/material'
import { AxiosError } from 'axios'
import { t } from 'i18next'
import ResearchDisseminationService from '../api/services/ResearchDisseminationService'
import ErrorModal from '../components/modals/ErrorModal'
import SuccessModal from '../components/modals/SuccessModal'

enum SnackBarText {
    InProgress = 'snackBarMessage.researchPaperSubmissionInProgress',
    Success = 'snackBarMessage.researchPaperSubmissionSuccess',
    Error = 'snackBarMessage.researchPaperSubmissionError',
}

enum SnackBarSeverity {
    InProgress = 'info',
    Success = 'success',
    Error = 'error',
}

export default function ResearchFindingsPage() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)
    const [successModalVisibility, setSuccessModalVisibility] =
        React.useState(false)

    const [isSummarizationInProgress, setIsSummarizationInProgress] =
        React.useState(false)

    const [isDataUpdated, setIsDataUpdated] = React.useState(false)

    const [snackbarSeverity, setSnackbarSeverity] = React.useState<AlertColor>(
        SnackBarSeverity.InProgress
    )

    const [snackbarText, setSnackbarText] = React.useState(
        SnackBarText.InProgress
    )

    const handleClick = () => setIsOpen(!isOpen)

    const handleAddNewResearchPaperAsync = async (researchPaperDto: any) => {
        try {
            setSnackbarSeverity(SnackBarSeverity.InProgress)
            setSnackbarText(SnackBarText.InProgress)

            setIsOpen(!isOpen)
            setIsSummarizationInProgress(true)

            const researchPaperUrl = await uploadResearchPaperAsync(
                researchPaperDto.reseachPaperMediaFile
            )

            if (!researchPaperUrl) {
                setErrorModalVisibility(true)
                return
            }

            const response =
                await ResearchDisseminationService.generateSummaryAsync({
                    mediaFileUrl: researchPaperUrl,
                })

            if (response?.data?.summary === '') {
                setErrorModalVisibility(true)
                setIsSummarizationInProgress(false)
                setSnackbarSeverity(SnackBarSeverity.Error)
                setSnackbarText(SnackBarText.Error)
                return
            }

            const requestPayload = {
                mediaFileUrl: researchPaperUrl,
                topic: researchPaperDto?.topic,
                summerizedContent: response?.data?.summary,
                subCategory: researchPaperDto?.subCategory.split('-')[1],
            }

            await ResearchDisseminationProtectedApi.addResearchPaperAsync(
                requestPayload
            )

            setIsSummarizationInProgress(false)
            setSuccessModalVisibility(true)
            setIsDataUpdated(!isDataUpdated)
        } catch (err: any) {
            err as AxiosError
            setErrorModalVisibility(true)
            setSnackbarSeverity(SnackBarSeverity.Error)
            setSnackbarText(SnackBarText.Error)
            setIsSummarizationInProgress(false)
        }
    }

    return (
        <>
            <Box sx={{ minHeight: 650 }}>
                <div>
                    <Title
                        backicon={false}
                        titleName="titles.researchFindings"
                    />
                    <div style={styles.button}>
                        <ContainedButton
                            onClick={handleClick}
                            title={'containedButtonTitles.addNewPaper'}
                            backgroundColor={theme.palette.primary.main}
                            height={60}
                            width={200}
                            isLoading={isSummarizationInProgress}
                        />
                    </div>
                </div>

                <div>
                    <ResearchFindingsListDataTable
                        isDataUpdated={isDataUpdated}
                    />
                </div>

                {isOpen && (
                    <OfficerAddNewResearchPaperModal
                        handleCancel={handleClick}
                        handleSave={handleAddNewResearchPaperAsync}
                    />
                )}

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isSummarizationInProgress}
                >
                    <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {t(snackbarText)}
                    </Alert>
                </Snackbar>
            </Box>
            {errorModalVisibility && (
                <ErrorModal
                    handleCancel={() => setErrorModalVisibility(false)}
                />
            )}

            {successModalVisibility && (
                <SuccessModal
                    handleCancel={() => {
                        setSuccessModalVisibility(false)
                    }}
                />
            )}
        </>
    )
}

const styles = {
    button: {
        display: 'flex',
        justifyContent: 'end',
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
    },
}
