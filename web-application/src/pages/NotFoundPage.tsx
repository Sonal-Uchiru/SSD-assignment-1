import * as React from 'react'
import theme from '../theme/hooks/CreateTheme'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import HeadLine1 from '../components/atoms/typographies/HeadLine1'
import HeadLine3 from '../components/atoms/typographies/HeadLine3'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import TabBar from '../components/organisms/tabBars/LanguageSelectionTabBar'
import { Avatar } from '@mui/material'

export default function NotFoundPage() {
    function handleClick() {
        console.log('Button clicked!')
    }

    return (
        <Box sx={{ minHeight: 650 }}>
            <TabBar />

            <Grid container>
                <Grid item xs={12} md={6}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt="Cindy Baker"
                            src="/images/farmhouse.png"
                            sx={{
                                width: '70%',
                                height: '70%',
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadLine1
                            text={'404'}
                            color={theme.palette.error.main}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadLine1
                            text={'notFoundPage.page'}
                            color={theme.palette.error.main}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadLine1
                            text={'notFoundPage.notFound'}
                            color={theme.palette.error.main}
                        />
                    </div>

                    <div
                        style={{
                            marginTop: 20,
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadLine3
                            text={'notFoundPage.subText1'}
                            color={theme.palette.blue.main}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadLine3
                            text={'notFoundPage.subText2'}
                            color={theme.palette.blue.main}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadLine3
                            text={'notFoundPage.subText3'}
                            color={theme.palette.blue.main}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadLine3
                            text={'notFoundPage.subText4'}
                            color={theme.palette.blue.main}
                        />
                    </div>
                    <div style={styles.button}>
                        <ContainedButton
                            width={220}
                            title={'containedButtonTitles.goHome'}
                            color={theme.palette.white.main}
                            backgroundColor={theme.palette.primary.main}
                            onClick={handleClick}
                            height={55}
                        />
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

const styles = {
    button: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
    },
}
