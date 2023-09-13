import * as React from 'react'
import { useTranslation } from 'react-i18next'
import theme from '../../../theme/hooks/CreateTheme'
import HeadLine2 from '../../../components/atoms/typographies/HeadLine2'
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material'

interface IProps {
    backicon: boolean
    titleName: string
    onClick?: () => void
}

export default function Title({
    backicon = false,
    titleName,
    onClick,
}: IProps) {
    const { t } = useTranslation()

    return (
        <div style={styles.title}>
            <Grid container spacing={1}>
                <Grid item style={{ display: 'flex' }}>
                    {backicon ? (
                        <IconButton onClick={onClick}>
                            <img
                                src="/images/arrow.png"
                                alt="back"
                                style={styles.icon}
                            />
                        </IconButton>
                    ) : (
                        ''
                    )}

                    <HeadLine2
                        text={t(titleName)}
                        color={theme.palette.primary.main}
                        fontWeight={theme.typography.fontWeightSemi.fontWeight}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

const styles = {
    title: {
        marginTop: 15,
        marginLeft: 20,
    },

    icon: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
}
