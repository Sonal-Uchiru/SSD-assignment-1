import { Button } from '@mui/material'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import theme from '../../../theme/hooks/CreateTheme'
import COLORS from '../../../theme/styles/Colors'
import ButtonLoadingBar from '../Loadings/ButtonLoadingBar'

interface IProps {
    height?: number
    width?: number
    onClick?(): void
    title: string
    color?: string
    backgroundColor: string
    isLoading?: boolean | undefined
    isDisabled?: boolean | undefined
}

export default function ContainedButton({
    height = 40,
    width = 120,
    onClick,
    title,
    color = COLORS.WHITE,
    backgroundColor,
    isLoading = false,
    isDisabled = false,
}: IProps) {
    const { t } = useTranslation()

    return (
        <Button
            variant="contained"
            onClick={onClick}
            style={{
                color: color,
                backgroundColor: backgroundColor,
                fontFamily: theme.typography.fontFamily1.fontFamily,
                fontSize: theme.typography.S1.fontSize,
                fontWeight: theme.typography.fontWeightBold.fontWeight,
                textTransform: 'none',
                height: height,
                width: width,
            }}
            type="submit"
            disabled={isLoading || isDisabled}
        >
            {isLoading ? <ButtonLoadingBar /> : t(title)}
        </Button>
    )
}
