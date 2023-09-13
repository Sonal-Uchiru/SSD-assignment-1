import React from 'react'
import PasswordValidator from 'password-validator'
import COLORS from '../../theme/styles/Colors'

interface IProps {
    password: string
}

export const PasswordStrengthMeter = ({ password }: IProps) => {
    const num = 100 - (getScore(password) * 100) / 4

    const createPassLabel = () => {
        let message = ''
        const score = getScore(password)

        switch (score) {
            case 5:
                message = 'Very weak'
                break
            case 4:
                message = 'Very weak'
                break
            case 3:
                message = 'Weak'
                break
            case 2:
                message = 'Fair'
                break
            case 1:
                message = 'Good'
                break
            case 0:
                message = 'Strong'
                break
        }

        return message
    }

    const funcProgressColor = () => {
        let color = COLORS.GREY
        const score = getScore(password)

        switch (score) {
            case 5:
                color = COLORS.GREY
                break
            case 4:
                color = COLORS.ERROR
                break
            case 3:
                color = COLORS.WARNING
                break
            case 2:
                color = COLORS.WARNING
                break
            case 1:
                color = COLORS.PRIMARY
                break
            case 0:
                color = COLORS.PRIMARY
                break
        }

        return color
    }

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '7px',
    })

    return (
        <div style={{ marginTop: 10 }}>
            <div className="progress" style={{ height: '7px' }}>
                <div className="progress-bar" style={changePasswordColor()} />
            </div>
            <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
        </div>
    )
}

const getScore = (password: string) => {
    const schema: any = new PasswordValidator()

    schema
        .is()
        .min(8) // Minimum length 8
        .is()
        .max(100) // Maximum length 100
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .symbols(1)
        .has()
        .digits(2) // Must have at least 2 digits
        .has()
        .not()
        .spaces() // Should not have spaces
        .is()
        .not()
        .oneOf(['Passw0rd', 'Password123', 'Email123'])

    return schema.validate(password, { details: true }).length
}

export const isPasswordComplex = (password: string) => {
    return getScore(password) === 0
}
