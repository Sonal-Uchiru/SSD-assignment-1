import * as React from 'react'
import { Formik, Form } from 'formik'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import HeadLine2 from '../../atoms/typographies/HeadLine2'
import theme from '../../../theme/hooks/CreateTheme'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import InputField from '../../atoms/inputFields/InputField'
import Information from '../../atoms/typographies/Information'
import ContainedButton from '../../atoms/buttons/ContainedButton'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordInitialValues } from './InitialValues'
import {
    ForgotPasswordStep1ValidationSchema,
    ForgotPasswordStep2ValidationSchema,
} from './ValidationSchema'
import { EmailContent } from '../../../types/email/EmailContent'
import { sendEmailAsync } from '../../../utils/email/EmailVerification'

interface IProps {
    marginTop?: number
    marginBottom?: number
    isGetCode?: boolean
    isVerifyCode?: boolean
}

export default function ForgotPasswordCard({
    marginTop = 20,
    marginBottom = 10,
    isGetCode = true,
    isVerifyCode = false,
}: IProps) {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [emailContent, setEmailContent] = React.useState<EmailContent>()

    const sendResetCodeAsync = async (values: any) => {
        const newEmailContent = new EmailContent(values.email)
        setEmailContent(newEmailContent)
        await sendEmailAsync(newEmailContent)
    }

    return (
        <Card
            sx={{
                maxWidth: 600,
                borderRadius: 3,
                boxShadow:
                    'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
            }}
            style={{
                marginTop: marginTop,
                marginBottom: marginBottom,
            }}
        >
            <CardContent>
                <div>
                    <Grid container>
                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src="/images/padlock.png"
                                    alt="padlock"
                                    style={styles.icon}
                                />
                                <div style={styles.title}>
                                    <HeadLine2
                                        text={
                                            'forgotPasswordPage.forgotPassword'
                                        }
                                        color={theme.palette.error.main}
                                        fontWeight={
                                            theme.typography.fontWeightBold
                                                .fontWeight
                                        }
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {isGetCode && (
                    <div>
                        <Formik
                            initialValues={ForgotPasswordInitialValues}
                            validationSchema={
                                ForgotPasswordStep1ValidationSchema
                            }
                            onSubmit={sendResetCodeAsync}
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
                                            width={320}
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                (errors.email &&
                                                    touched.email) ||
                                                undefined
                                            }
                                            helperText={
                                                errors.email && touched.email
                                                    ? errors.email
                                                    : ''
                                            }
                                        />
                                    </div>
                                    {((errors.email && touched.email) ||
                                        undefined) && (
                                        <div style={{ marginTop: 50 }}></div>
                                    )}
                                    <div
                                        style={{
                                            marginTop: 35,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Information
                                            fontSize={13}
                                            text={'forgotPasswordPage.subText1'}
                                            color={theme.palette.neutral.main}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 30,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ContainedButton
                                            // onClick={handleClick}
                                            title={
                                                'containedButtonTitles.sendCode'
                                            }
                                            backgroundColor={
                                                theme.palette.primary.main
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 15,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Link
                                            underline="always"
                                            color={theme.palette.blue.main}
                                            onClick={() => {
                                                navigate('/')
                                            }}
                                        >
                                            {t('containedButtonTitles.goHome')}
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}

                {isVerifyCode && (
                    <div>
                        <Formik
                            initialValues={ForgotPasswordInitialValues}
                            validationSchema={
                                ForgotPasswordStep2ValidationSchema
                            }
                            onSubmit={(values) => {
                                console.log(values)
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
                                            id={'code'}
                                            label={'Code'}
                                            type={'text'}
                                            placeholder={'Enter Code'}
                                            width={320}
                                            name="code"
                                            value={values.code}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                (errors.code && touched.code) ||
                                                undefined
                                            }
                                            helperText={
                                                errors.code && touched.code
                                                    ? errors.code
                                                    : ''
                                            }
                                        />
                                    </div>
                                    {((errors.code && touched.code) ||
                                        undefined) && (
                                        <div style={{ marginTop: 50 }}></div>
                                    )}
                                    <div
                                        style={{
                                            marginTop: 35,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Information
                                            fontSize={13}
                                            text={'forgotPasswordPage.subText2'}
                                            color={theme.palette.neutral.main}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 30,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ContainedButton
                                            // onClick={handleClick}
                                            title={
                                                'containedButtonTitles.verifyCode'
                                            }
                                            backgroundColor={
                                                theme.palette.primary.main
                                            }
                                            height={55}
                                            width={200}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 15,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Link
                                            underline="always"
                                            color={theme.palette.blue.main}
                                            onClick={() => {
                                                navigate('/')
                                            }}
                                        >
                                            {t('containedButtonTitles.back')}
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

const styles = {
    title: {
        marginTop: 25,
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'center',
    },

    icon: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
    },

    input: {
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
    },
}
