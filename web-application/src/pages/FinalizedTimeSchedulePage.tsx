import * as React from 'react'
import Box from '@mui/material/Box'
import Title from '../components/atoms/title/Title'
import FinalizedTimeScheduleDataTable from '../components/organisms/tables/FinalizedTimeScheduleDataTable'
import theme from '../theme/hooks/CreateTheme'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import { useNavigate } from 'react-router-dom'
import SmsService from '../utils/sms/SmsService'
import ErrorModal from '../components/modals/ErrorModal'
import SuccessModal from '../components/modals/SuccessModal'
import convertAndDownloadCSV from '../utils/priorityDistribution/DownloadCsv'
import ParagraphBold from '../components/atoms/typographies/ParagraphBold'
import HeadLine3 from '../components/atoms/typographies/HeadLine3'
import HeadLine4 from '../components/atoms/typographies/HeadLine4'

interface Props {
    predictions: any
}

export default function FinalizedTimeSchedulePage({ predictions }: Props) {
    const navigate = useNavigate()
    const [allocatedFarmers, setAllocatedFarmers] = React.useState<any>([])
    const [notAllocatedFarmers, setNotAllocatedFarmers] = React.useState<any>(
        []
    )
    const [isLoading, setIsLoading] = React.useState(false)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)
    const [isNotificationsSendSuccess, setIsNotificationsSendSuccess] =
        React.useState(false)
    const [isDownlaodSuccess, setIsDownloadSuccess] = React.useState(false)
    function handleClick() {
        setIsLoading(true)
        try {
            if (allocatedFarmers.length > 0) {
                SmsService.sendSMSAsync(allocatedFarmers)
                    .then(() => {
                        setIsLoading(false)
                        setIsNotificationsSendSuccess(true)
                    })
                    .catch((err) => {
                        setIsLoading(false)
                        setErrorModalVisibility(true)
                    })
            }
        } catch (err: any) {
            setIsLoading(false)
            setErrorModalVisibility(true)
        }
    }

    React.useEffect(() => {
        setAllocatedFarmers(
            predictions?.filter((farmer: any) => {
                return farmer?.allocatedDate !== 'Not Allocated'
            })
        )
        setNotAllocatedFarmers(
            predictions?.filter((farmer: any) => {
                return farmer?.allocatedDate === 'Not Allocated'
            })
        )
    }, [])

    const handleDownload = () => {
        setIsLoading(true)
        convertAndDownloadCSV(notAllocatedFarmers, 'notAllocatedFarmers')
            .then(() => {
                setIsLoading(false)
                setIsDownloadSuccess(true)
            })
            .catch((err) => {
                setIsLoading(false)
                setErrorModalVisibility(true)
            })
    }

    return (
        <>
            <Box sx={{ minHeight: 650 }}>
                <div>
                    <Title
                        backicon={true}
                        titleName="titles.finalzedTimeSchedule"
                        onClick={() =>
                            navigate('/priorityDistributionSchedule')
                        }
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: 10,
                            }}
                        >
                            <HeadLine4
                                text={'DataTable.totalFarmersCount'}
                                color={theme.palette.black.main}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: 20,
                            }}
                        >
                            <HeadLine4
                                text={predictions ? predictions.length : 0}
                                color={theme.palette.blue.main}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: 10,
                                marginLeft: 60,
                            }}
                        >
                            <HeadLine4
                                text={'DataTable.allocatedFarmersCount'}
                                color={theme.palette.black.main}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: 20,
                            }}
                        >
                            <HeadLine4
                                text={
                                    allocatedFarmers
                                        ? allocatedFarmers.length
                                        : 0
                                }
                                color={theme.palette.primary.main}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: 10,
                                marginLeft: 60,
                            }}
                        >
                            <HeadLine4
                                text={'DataTable.notAlloctedFarmersCount'}
                                color={theme.palette.black.main}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: 20,
                            }}
                        >
                            <HeadLine4
                                text={
                                    notAllocatedFarmers
                                        ? notAllocatedFarmers.length
                                        : 0
                                }
                                color={theme.palette.error.main}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <FinalizedTimeScheduleDataTable predictions={predictions} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                        marginBottom: 20,
                    }}
                >
                    <div style={{ marginRight: 20 }}>
                        <ContainedButton
                            onClick={handleClick}
                            title={'containedButtonTitles.distributeQR'}
                            backgroundColor={theme.palette.primary.main}
                            width={250}
                            isLoading={isLoading}
                        />
                    </div>

                    <div style={{ marginLeft: 20 }}>
                        <ContainedButton
                            onClick={handleDownload}
                            title={'DataTable.downloadNotAllocated'}
                            backgroundColor={theme.palette.warning.main}
                            width={250}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </Box>
            {errorModalVisibility && (
                <ErrorModal
                    handleCancel={() => setErrorModalVisibility(false)}
                />
            )}
            {isNotificationsSendSuccess && (
                <SuccessModal
                    handleCancel={() => {
                        setIsNotificationsSendSuccess(
                            !isNotificationsSendSuccess
                        )
                    }}
                    subText="successModal.notificationSendSuccessText"
                />
            )}
            {isDownlaodSuccess && (
                <SuccessModal
                    handleCancel={() => {
                        setIsDownloadSuccess(!isDownlaodSuccess)
                    }}
                    subText="successModal.downloadSuccessText"
                />
            )}
        </>
    )
}

const styles = {
    button: {},
}
