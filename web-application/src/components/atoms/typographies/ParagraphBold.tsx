import * as React from 'react'
import theme from '../../../theme/hooks/CreateTheme'
import { useTranslation } from 'react-i18next'

interface IProps {
    text: string
    color: string
}

export default function ParagraphBold({
    text,
    color = theme.palette.black.main,
}: IProps) {
    const { t } = useTranslation()
    return (
        <div
            style={{
                color: color,
                fontWeight: theme.typography.fontWeightBold.fontWeight,
                fontSize: theme.typography.S1.fontSize,
                fontFamily: theme.typography.fontFamily1.fontFamily,
            }}
        >
            {t(text)}
        </div>
    )
}
