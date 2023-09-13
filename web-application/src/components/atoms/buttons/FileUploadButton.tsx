import * as React from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import theme from '../../../theme/hooks/CreateTheme'
import ButtonLoadingBar from '../Loadings/ButtonLoadingBar'

interface IProps {
    height?: number
    width?: number
    title: string
    color: string
    backgroundColor: string
    onChange: (selectedFile: FileList | null) => void
    isLoading?: boolean | undefined
}

export default function FileUploadButton({
    height = 40,
    width = 120,
    isLoading = false,
    title,
    color,
    backgroundColor,
    onChange,
}: IProps) {
    const { t } = useTranslation()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            onChange(files)
        } else {
            onChange(null) // No file selected
        }
    }

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    return (
        <>
            <Button
                variant="contained"
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
                onClick={handleClick} // Trigger input click
                disabled={isLoading}
            >
                {isLoading ? <ButtonLoadingBar /> : t(title)}
            </Button>
            <input
                ref={inputRef}
                hidden
                multiple
                type="file"
                onChange={handleFileChange} // Handle selected file
            />
        </>
    )
}
