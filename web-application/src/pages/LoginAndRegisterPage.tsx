import * as React from 'react'
import { Avatar, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import LoginAndRegisterForm from '../components/organisms/forms/user/LoginAndRegisterForm'
import TabBar from '../components/organisms/tabBars/LanguageSelectionTabBar'
import BrowserLocalStorage from '../utils/localStorage/BrowserLocalStorage'
import { useNavigate } from 'react-router'
import { UserRoles } from '../types/enums/UserRoles'

export default function LoginAndRegisterPage() {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!BrowserLocalStorage.GetAccessToken()) return

        const userRole = BrowserLocalStorage.GetUserRole()

        switch (userRole) {
            case UserRoles.Farmer:
                navigate('/paddyFieldDetails')
                break
            case UserRoles.Officer:
                navigate('/researchDisseminating')
                break
            default:
                throw new Error(`Unsupported user role - ${userRole}`)
        }
    }, [])
    return (
        <Box>
            <div style={styles.container}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={7}>
                        <TabBar />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            <Avatar
                                alt="Cindy Baker"
                                src="/images/Agrivo-logo-circle.png"
                                sx={{
                                    width: '60%',
                                    height: '60%',
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                marginTop: 40,
                            }}
                        >
                            <LoginAndRegisterForm />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Box>
    )
}

const styles = {
    container: {
        display: 'flex',
        marginBottom: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
}
