import { TextField } from '@mui/material'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
    width?: number
    height?: number
    id: string
    label: string
    type: string
    onChange?: (event: React.ChangeEvent<any>) => void
    onBlur?(event: React.FocusEvent<any>): void
    value?: string
    placeholder: string
    required?: boolean
    error?: boolean | undefined
    helperText?: string
    defaultValue?: string
    name?: string
    size?: 'small' | 'medium'
    readOnly?: boolean
}

export default function InputField({
    width = 300,
    height = 40,
    id,
    label,
    type,
    onChange,
    onBlur,
    value,
    placeholder,
    required = false,
    error = false,
    helperText = '',
    defaultValue = '',
    name = '',
    size = 'medium',
    readOnly = false,
}: IProps) {
    const { t } = useTranslation()
    const showHelperText = t(helperText)

    return (
        <TextField
            size={size}
            id={id}
            label={t(label)}
            placeholder={t(placeholder) ?? ''}
            type={type}
            onChange={onChange}
            error={error}
            defaultValue={defaultValue}
            helperText={showHelperText}
            onBlur={onBlur}
            value={value}
            variant="outlined"
            style={{ width: width, height: height }}
            InputLabelProps={{
                classes: {
                    asterisk: 'required-asterisk',
                },
            }}
            name={name}
            required={required}
            aria-readonly={readOnly}
        />
    )
}
