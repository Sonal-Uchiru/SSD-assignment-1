import * as React from 'react'
import Box from '@mui/material/Box'
import ForgotPasswordCard from '../components/organisms/cards/ForgotPasswordCard'
import TabBar from '../components/organisms/tabBars/LanguageSelectionTabBar'

export default function ForgotPasswordPage() {
    return (
        <Box sx={{ minHeight: 650 }}>
            <TabBar />
            <div style={styles.container}>
                <ForgotPasswordCard isGetCode={true} isVerifyCode={false} />
            </div>
        </Box>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        height: '80vh',
        marginBottom: '35px', // Set the container height to occupy the full viewport height
    },
}
