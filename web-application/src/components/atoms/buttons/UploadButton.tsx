import * as React from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import theme from '../../../theme/hooks/CreateTheme'

interface IProps {
    height?: number
    width?: number
    title: string
    color: string
    backgroundColor: string
}

export default function UploadButton({
    height = 40,
    width = 120,
    title,
    color,
    backgroundColor,
}: IProps) {
    const { t } = useTranslation()
    const [selectedImage, setSelectedImage] = React.useState<string>('')

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]
            setSelectedImage(file.name)
        }
    }
    return (
        <>
            <Button
                variant="contained"
                component="label"
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
            >
                {t(title)}
                <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                />
            </Button>
            {/* <div>{selectedImage}</div> */}
        </>
    )
}
