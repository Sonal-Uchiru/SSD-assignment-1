import * as React from 'react'
import { Formik, Form } from 'formik'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import HeadLine2 from '../../../atoms/typographies/HeadLine2'
import theme from '../../../../theme/hooks/CreateTheme'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import InputField from '../../../atoms/inputFields/InputField'
import ParagraphBold from '../../../atoms/typographies/ParagraphBold'
import HeadLine4 from '../../../atoms/typographies/HeadLine4'
import PasswordInputField from '../../../atoms/inputFields/PasswordInputField'
import { Grid, Link } from '@mui/material'
import ContainedButton from '../../../atoms/buttons/ContainedButton'
import Information from '../../../atoms/typographies/Information'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import UserAuthenticationApi from '../../../../api/exclusive/userApis/UserAuthenticationApi'
import { AxiosError } from 'axios'
import {
    LoginFormInitialValues,
    RegisterFormInitialValues,
} from './InitialValues'
import {
    LoginFormValidationSchema,
    RegisterFormValidationSchema,
} from './ValidationSchema'
import UserUnprotectedApi from '../../../../api/exclusive/userApis/UserUnprotectedApi'
import BrowserLocalStorage from '../../../../utils/localStorage/BrowserLocalStorage'
import { isPasswordComplex } from '../../../../extensions/form_fields/PasswordMeter'
import SuccessModal from '../../../modals/SuccessModal'
import { GetUserRoleByEmail } from '../../../../utils/email/UserRoleVerification'
import { UserRoles } from '../../../../types/enums/UserRoles'

interface IProps {
    marginTop?: number
    marginBottom?: number
    isError?: boolean
}

export default function LoginAndRegisterForm({
    marginTop = 20,
    marginBottom = 30,
    isError = false,
}: IProps) {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [value, setValue] = React.useState('one')
    const [isRegistrationSuccessful, setIsRegistrationSucessful] =
        React.useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = React.useState('')
    const [registerErrorMessage, setRegisterErrorMessage] = React.useState('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleLoginClick = (email: string, password: string) => {
        setIsLoading(true)
        setLoginErrorMessage('')
        UserAuthenticationApi.loginAsync({
            email,
            password,
        })
            .then((res) => {
                setIsLoading(false)
                BrowserLocalStorage.SetAccessToken(res.data.token)
                const userRole = BrowserLocalStorage.GetUserRole()

                switch (userRole) {
                    case UserRoles.Farmer:
                        navigate('/paddyFieldDetails')
                        break
                    case UserRoles.Officer:
                        navigate('/researchDisseminating')
                        break
                    default:
                        throw new Error(`Unsupported user role - ${userRole}`)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                err as AxiosError
                setLoginErrorMessage(err?.response?.data?.message)
            })
    }

    const handleRegisterClick = (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: number,
        confirmPassword: string
    ) => {
        setIsLoading(true)
        if (isPasswordComplex(password)) {
            if (password === confirmPassword) {
                UserUnprotectedApi.registrationAsync({
                    firstName,
                    lastName,
                    email,
                    password,
                    role,
                })
                    .then((res) => {
                        setIsLoading(false)
                        setIsRegistrationSucessful(true)
                    })
                    .catch((err) => {
                        setIsLoading(false)
                        err as AxiosError
                        setRegisterErrorMessage(err?.response?.data?.message)
                    })
            } else {
                setRegisterErrorMessage(
                    'loginAndRegisterPage.passwordMismatchErrorText'
                )
                setIsLoading(false)
            }
        } else {
            setRegisterErrorMessage(
                'loginAndRegisterPage.weakPasswordErrorText'
            )
            setIsLoading(false)
        }
    }

    const handleTabChange = (
        event: React.SyntheticEvent | string,
        newValue: string
    ) => {
        setValue(newValue)
    }

    return (
        <>
            <Card
                sx={{
                    maxWidth: 500,
                    borderRadius: 2,
                    boxShadow:
                        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                }}
                style={{
                    marginTop: marginTop,
                    marginBottom: marginBottom,
                    marginLeft: 10,
                    marginRight: 10,
                }}
            >
                <CardContent>
                    <div style={styles.contain}>
                        <HeadLine2
                            text={'loginAndRegisterPage.title'}
                            color={theme.palette.primary.main}
                        />
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                        >
                            <Tab
                                value="one"
                                label={t('loginAndRegisterPage.login')}
                                style={{ textTransform: 'capitalize' }}
                            />
                            <Tab
                                value="two"
                                label={t('loginAndRegisterPage.register')}
                                style={{ textTransform: 'capitalize' }}
                            />
                        </Tabs>
                    </div>
                    {value === 'one' && (
                        <div>
                            {loginErrorMessage && (
                                <div
                                    style={{
                                        marginTop: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <HeadLine4
                                        text={loginErrorMessage}
                                        color={theme.palette.error.main}
                                    />
                                </div>
                            )}

                            <Formik
                                initialValues={LoginFormInitialValues}
                                validationSchema={LoginFormValidationSchema}
                                onSubmit={(values) => {
                                    handleLoginClick(
                                        values.email,
                                        values.password
                                    )
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    values,
                                }) => (
                                    <Form>
                                        <div style={styles.input}>
                                            <InputField
                                                id={'email'}
                                                label={'Email'}
                                                type={'email'}
                                                placeholder={'Enter Email'}
                                                width={439}
                                                name="email"
                                                value={values.email}
                                                onChange={(e) => {
                                                    setLoginErrorMessage('')
                                                    handleChange(e)
                                                }}
                                                onBlur={handleBlur}
                                                error={
                                                    (errors.email &&
                                                        touched.email) ||
                                                    undefined
                                                }
                                                helperText={
                                                    errors.email &&
                                                    touched.email
                                                        ? errors.email
                                                        : ''
                                                }
                                            />
                                        </div>

                                        {((errors.email && touched.email) ||
                                            undefined) && (
                                            <div
                                                style={{ marginTop: 50 }}
                                            ></div>
                                        )}

                                        <div style={styles.passwordInput}>
                                            <PasswordInputField
                                                label={'Password'}
                                                placeholder={'Enter Password'}
                                                width={439}
                                                name="password"
                                                value={values.password}
                                                onChange={(e) => {
                                                    setLoginErrorMessage('')
                                                    handleChange(e)
                                                }}
                                                onBlur={handleBlur}
                                                error={
                                                    (errors.password &&
                                                        touched.password) ||
                                                    undefined
                                                }
                                                helperText={
                                                    errors.password &&
                                                    touched.password
                                                        ? errors.password
                                                        : ''
                                                }
                                            />
                                        </div>
                                        {((errors.password &&
                                            touched.password) ||
                                            undefined) && (
                                            <div
                                                style={{ marginTop: 40 }}
                                            ></div>
                                        )}
                                        <div style={styles.link}>
                                            <Link
                                                underline="always"
                                                fontSize={16}
                                                fontWeight={600}
                                                color={theme.palette.blue.main}
                                                onClick={() => {
                                                    navigate('/forgotPassword')
                                                }}
                                            >
                                                {t(
                                                    'loginAndRegisterPage.forgotPassword'
                                                )}
                                            </Link>
                                        </div>

                                        <div style={styles.button}>
                                            <ContainedButton
                                                title={
                                                    'containedButtonTitles.login'
                                                }
                                                backgroundColor={
                                                    theme.palette.primary.main
                                                }
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}

                    {value === 'two' && (
                        <>
                            {registerErrorMessage && (
                                <div
                                    style={{
                                        marginTop: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <HeadLine4
                                        text={registerErrorMessage}
                                        color={theme.palette.error.main}
                                    />
                                </div>
                            )}
                            <Formik
                                initialValues={RegisterFormInitialValues}
                                validationSchema={RegisterFormValidationSchema}
                                onSubmit={(values) => {
                                    handleRegisterClick(
                                        values.firstName,
                                        values.lastName,
                                        values.email,
                                        values.password,
                                        GetUserRoleByEmail(values.email),
                                        values.confirmPassword
                                    )
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    values,
                                }) => (
                                    <Form>
                                        <div>
                                            <div>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'center',
                                                                textAlign:
                                                                    'center',
                                                                marginTop: 30,
                                                            }}
                                                        >
                                                            <InputField
                                                                id={'firstName'}
                                                                label={
                                                                    'First Name'
                                                                }
                                                                type={'text'}
                                                                placeholder={
                                                                    'Enter First Names'
                                                                }
                                                                width={200}
                                                                name="firstName"
                                                                value={
                                                                    values.firstName
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setRegisterErrorMessage(
                                                                        ''
                                                                    )
                                                                    handleChange(
                                                                        e
                                                                    )
                                                                }}
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                error={
                                                                    (errors.firstName &&
                                                                        touched.firstName) ||
                                                                    undefined
                                                                }
                                                                helperText={
                                                                    errors.firstName &&
                                                                    touched.firstName
                                                                        ? errors.firstName
                                                                        : ''
                                                                }
                                                            />
                                                        </div>
                                                        {((errors.firstName &&
                                                            touched.firstName) ||
                                                            undefined) && (
                                                            <div
                                                                style={{
                                                                    marginTop: 10,
                                                                }}
                                                            ></div>
                                                        )}
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'center',
                                                                textAlign:
                                                                    'center',
                                                                marginTop: 30,
                                                            }}
                                                        >
                                                            <InputField
                                                                id={'lastName'}
                                                                label={
                                                                    'Last Name'
                                                                }
                                                                type={'text'}
                                                                placeholder={
                                                                    'Enter Last Name'
                                                                }
                                                                width={200}
                                                                name="lastName"
                                                                value={
                                                                    values.lastName
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setRegisterErrorMessage(
                                                                        ''
                                                                    )
                                                                    handleChange(
                                                                        e
                                                                    )
                                                                }}
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                error={
                                                                    (errors.lastName &&
                                                                        touched.lastName) ||
                                                                    undefined
                                                                }
                                                                helperText={
                                                                    errors.lastName &&
                                                                    touched.lastName
                                                                        ? errors.lastName
                                                                        : ''
                                                                }
                                                            />
                                                        </div>
                                                        {((errors.lastName &&
                                                            touched.lastName) ||
                                                            undefined) && (
                                                            <div
                                                                style={{
                                                                    marginTop: 10,
                                                                }}
                                                            ></div>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div style={styles.input}>
                                                <InputField
                                                    id={'email'}
                                                    label={'Email'}
                                                    type={'email'}
                                                    placeholder={'Enter Email'}
                                                    width={439}
                                                    name="email"
                                                    value={values.email}
                                                    onChange={(e) => {
                                                        setRegisterErrorMessage(
                                                            ''
                                                        )
                                                        handleChange(e)
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={
                                                        (errors.email &&
                                                            touched.email) ||
                                                        undefined
                                                    }
                                                    helperText={
                                                        errors.email &&
                                                        touched.email
                                                            ? errors.email
                                                            : ''
                                                    }
                                                />
                                            </div>

                                            {((errors.email && touched.email) ||
                                                undefined) && (
                                                <div
                                                    style={{
                                                        marginTop: '50px',
                                                    }}
                                                ></div>
                                            )}
                                            <div style={styles.passwordInput}>
                                                <PasswordInputField
                                                    label={'Password'}
                                                    placeholder={
                                                        'Enter Password'
                                                    }
                                                    width={439}
                                                    showMeter={true}
                                                    name="password"
                                                    value={values.password}
                                                    onChange={(e) => {
                                                        setRegisterErrorMessage(
                                                            ''
                                                        )
                                                        handleChange(e)
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={
                                                        (errors.password &&
                                                            touched.password) ||
                                                        undefined
                                                    }
                                                    helperText={
                                                        errors.password &&
                                                        touched.password
                                                            ? errors.password
                                                            : ''
                                                    }
                                                />
                                            </div>
                                            {((errors.password &&
                                                touched.password) ||
                                                undefined) && (
                                                <div
                                                    style={{
                                                        marginTop: '85px',
                                                    }}
                                                ></div>
                                            )}

                                            <div style={styles.confirmPassword}>
                                                <PasswordInputField
                                                    label={'Confirm Password'}
                                                    placeholder={
                                                        'Re-Enter Password'
                                                    }
                                                    width={439}
                                                    name="confirmPassword"
                                                    value={
                                                        values.confirmPassword
                                                    }
                                                    onChange={(e) => {
                                                        setRegisterErrorMessage(
                                                            ''
                                                        )
                                                        handleChange(e)
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={
                                                        (errors.confirmPassword &&
                                                            touched.confirmPassword) ||
                                                        undefined
                                                    }
                                                    helperText={
                                                        errors.confirmPassword &&
                                                        touched.confirmPassword
                                                            ? errors.confirmPassword
                                                            : ''
                                                    }
                                                />
                                            </div>

                                            {((errors.confirmPassword &&
                                                touched.confirmPassword) ||
                                                undefined) && (
                                                <div
                                                    style={{
                                                        marginBottom: '30px',
                                                    }}
                                                ></div>
                                            )}

                                            <div style={styles.button}>
                                                <ContainedButton
                                                    title={
                                                        'containedButtonTitles.createAccount'
                                                    }
                                                    backgroundColor={
                                                        theme.palette.primary
                                                            .main
                                                    }
                                                    width={200}
                                                    height={50}
                                                    isLoading={isLoading}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: 20,
                                                    textAlign: 'center',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Information
                                                    text={
                                                        'loginAndRegisterPage.informationText'
                                                    }
                                                    color={''}
                                                    fontSize={13}
                                                />
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </>
                    )}
                </CardContent>
            </Card>
            {isRegistrationSuccessful && (
                <SuccessModal
                    handleCancel={() => {
                        setIsRegistrationSucessful(!isRegistrationSuccessful)
                        handleTabChange('', 'one')
                    }}
                    subText="successModal.registrationSuccessText"
                />
            )}
        </>
    )
}

const styles = {
    contain: {
        display: 'flex',
        justifyContent: 'center',
    },

    input: {
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
    },

    passwordInput: {
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
    },

    confirmPassword: {
        marginTop: 75,
        display: 'flex',
        justifyContent: 'center',
    },

    link: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'flex-end',
    },

    button: {
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
    },

    or: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
    },

    googleButton: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
    },
}
