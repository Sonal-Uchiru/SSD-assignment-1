import Box from '@mui/material/Box'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import Title from '../components/atoms/title/Title'
import OfficerAddNewFieldModal from '../components/modals/officer/OfficerAddNewFieldModal'
import PaddyFieldDetailsDataTable from '../components/organisms/tables/PaddyFieldDetailsDataTable'
import theme from '../theme/hooks/CreateTheme'

export default function PaddyFieldDetailsPage() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Box sx={{ minHeight: 650 }}>
            <div>
                <Title backicon={false} titleName="titles.paddyFieldsDetails" />
                <div style={styles.button}>
                    <ContainedButton
                        onClick={handleClick}
                        title={'containedButtonTitles.addNewPaddy'}
                        backgroundColor={theme.palette.primary.main}
                        height={60}
                        width={200}
                    />
                </div>
            </div>

            <div>
                <PaddyFieldDetailsDataTable />
            </div>
            {isOpen && (
                <OfficerAddNewFieldModal
                    handleCancel={handleClick}
                    handleNext={(values) => {
                        setIsOpen(!isOpen)
                        const metaDataString = JSON.stringify(values)
                        navigate(`/paddyFieldDrawingTool/${metaDataString}`)
                    }}
                />
            )}
        </Box>
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
