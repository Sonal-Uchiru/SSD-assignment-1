import * as React from 'react'
import { useTranslation } from 'react-i18next'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'

export default function TabBar() {
    const { i18n } = useTranslation()

    const [value, setValue] = React.useState(i18n.language)

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginTop: 20,
                            marginLeft: 20,
                        }}
                    >
                        <img
                            src="/images/Agrivo-logo-circle.png"
                            alt="back"
                            style={styles.icon}
                        />

                        <div>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="primary"
                                indicatorColor="primary"
                                aria-label="secondary tabs example"
                            >
                                <Tab
                                    value="en"
                                    label="English"
                                    onClick={() => changeLanguage('en')}
                                    style={{ textTransform: 'capitalize' }}
                                />
                                <Tab
                                    value="sin"
                                    label="සිංහල"
                                    onClick={() => changeLanguage('sin')}
                                />
                                <Tab
                                    value="ta"
                                    label="தமிழ்"
                                    onClick={() => changeLanguage('ta')}
                                />
                            </Tabs>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}></Grid>
            </Grid>
        </Box>
    )
}

const styles = {
    icon: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
}
