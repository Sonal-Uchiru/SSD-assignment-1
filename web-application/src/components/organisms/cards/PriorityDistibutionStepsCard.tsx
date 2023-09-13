import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import HeadLine2 from '../../atoms/typographies/HeadLine2'
import theme from '../../../theme/hooks/CreateTheme'
import Grid from '@mui/material/Grid'
import Paragraph from '../../atoms/typographies/Paragraph'

interface IProps {
    steps: string
    stepTitle: string
    description: string
    marginTop?: number
    marginBottom?: number
}

export default function PriorityDistributionStepsCard({
    steps,
    stepTitle,
    description,
    marginTop = 20,
    marginBottom = 10,
}: IProps) {
    return (
        <Card
            sx={{
                maxWidth: 1000,
                border: '1px solid #03C988',
                borderRadius: 3,
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
            }}
            style={{
                marginTop: marginTop,
                marginBottom: marginBottom,
            }}
        >
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item>
                        <HeadLine2
                            text={steps}
                            color={theme.palette.black.main}
                            fontWeight={
                                theme.typography.fontWeightBold.fontWeight
                            }
                        />
                    </Grid>
                    <Grid item>
                        <HeadLine2
                            text={stepTitle}
                            color={theme.palette.black.main}
                            fontWeight={
                                theme.typography.fontWeightNormal.fontWeight
                            }
                        />
                    </Grid>
                </Grid>
                <div>
                    <Paragraph
                        text={description}
                        color={theme.palette.black.main}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
