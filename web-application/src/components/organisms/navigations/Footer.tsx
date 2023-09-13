import * as React from 'react'
import Box from '@mui/material/Box'
import { Avatar, Container, Grid } from '@mui/material'
import theme from '../../../theme/hooks/CreateTheme'
import ParagraphBold from '../../atoms/typographies/ParagraphBold'
import HeadLine4 from '../../atoms/typographies/HeadLine4'
import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()
    return (
        <Box sx={styles.root}>
            <Box component="footer" sx={styles.footer}>
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                        }}
                    >
                        <Grid item xs={12} sm={6} md={3} sx={styles.logo}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt="Cindy Baker"
                                    src="/images/Agrivo-logo-circle.png"
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} sx={styles.text}>
                            <div style={{ marginTop: 12 }}>
                                <HeadLine4
                                    text={t('footer.title')}
                                    color={theme.palette.white.main}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ marginTop: 15 }}>
                            <ParagraphBold
                                text={t('footer.paragraph')}
                                color={theme.palette.white.main}
                            />
                        </div>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '20vh',
    },

    footer: {
        backgroundColor: theme.palette.primary.main,
        p: 6,
        color: 'white',
        minHeight: '90px',
        marginTop: 'auto',
    },

    logo: {
        display: 'flex',
        justifyContent: 'flex-end',
        '@media (max-width: 600px)': {
            justifyContent: 'center',
        },
    },

    text: {
        display: 'flex',
        justifyContent: 'flex-start',
        '@media (max-width: 600px)': {
            justifyContent: 'center',
        },
    },
}
