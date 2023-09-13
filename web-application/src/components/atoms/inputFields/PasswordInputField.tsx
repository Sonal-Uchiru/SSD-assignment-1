import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { PasswordStrengthMeter } from '../../../extensions/form_fields/PasswordMeter'
import FormHelperText from '@mui/material/FormHelperText'
import { useTranslation } from 'react-i18next'

interface IProps {
    width?: number
    height?: number
    label: string
    onChange?: (event: React.ChangeEvent<any>) => void
    onBlur?(event: React.FocusEvent<any>): void
    value?: string
    placeholder: string
    required?: boolean
    showMeter?: boolean
    error?: boolean
    helperText?: string
    name?: string
    size?: 'small' | 'medium'
}

export default function PasswordInputField({
    width = 300,
    height = 40,
    label,
    onChange,
    onBlur,
    value,
    placeholder,
    required = false,
    showMeter = false,
    error = false,
    helperText = '',
    name = 'password',
    size = 'medium',
}: IProps) {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = React.useState(false)
    const [password, setPassword] = React.useState(value || '')

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newPassword = event.target.value
        setPassword(newPassword)
        if (onChange) {
            onChange(event) // Invoke onChange only if it's defined
        }
    }

    const labelStyles = {
        ...styles.label,
        ...(error ? styles.errorLabel : null),
    }

    return (
        <FormControl
            style={{ width: width, height: height }}
            variant="outlined"
            required={required}
            size={size}
        >
            <InputLabel
                htmlFor="outlined-adornment-password"
                style={labelStyles}
            >
                {t(label)}
            </InputLabel>
            <OutlinedInput
                name={name}
                value={value}
                error={error}
                onChange={handlePasswordChange}
                onBlur={onBlur}
                placeholder={t(placeholder) ?? ''}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {error && (
                <FormHelperText id="component-error-text" style={styles.error}>
                    {t(helperText)}
                </FormHelperText>
            )}
            {showMeter ? <PasswordStrengthMeter password={password} /> : <></>}
        </FormControl>
    )
}
const styles = {
    label: {
        backgroundColor: 'white',
    },
    errorLabel: {
        backgroundColor: 'white',
        color: 'red',
    },

    error: {
        color: 'red',
    },
}
