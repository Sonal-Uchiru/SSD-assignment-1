import * as React from 'react'
import { Formik, Form } from 'formik'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import theme from '../../theme/hooks/CreateTheme'
import ContainedButton from '../atoms/buttons/ContainedButton'
import { Grid } from '@mui/material'
import PasswordInputField from '../atoms/inputFields/PasswordInputField'
import HeadLine2 from '../atoms/typographies/HeadLine2'
import ParagraphBold from '../atoms/typographies/ParagraphBold'
import HeadLine4 from '../atoms/typographies/HeadLine4'
import { ChangePasswordModalInitialValues } from './InitialValues'
import { ChangePasswordModalValidationSchema } from './ValidationSchema'
import { isPasswordComplex } from '../../extensions/form_fields/PasswordMeter'
import UserProtectedApi from '../../api/exclusive/userApis/UserProtectedApi'
import { AxiosError } from 'axios'
import SuccessModal from './SuccessModal'
import SaveConfirmationModal from './SaveConfirmationModal'

interface IProps {
    handleCancel(): void
    handleSave(): void
    isValidate?: boolean
}

export default function ChangePasswordModal({
    handleCancel,
    handleSave,
    isValidate = true,
}: IProps) {
    const [passwordErrorText, setPasswordErrorText] = React.useState('')
    const [isChangePasswordSuccess, setIsChangePasswordSuccess] =
        React.useState(false)
    const [isChangesConfirmed, setIsChangesConfirmed] = React.useState(false)
    const [newPassword, setNewPassword] = React.useState('')
    const [currentPassword, setCurrentPassword] = React.useState('')

    const handlePasswordChange = (
        newPassword: string,
        confirmPassword: string
    ) => {
        if (isPasswordComplex(newPassword)) {
            if (newPassword === confirmPassword) {
                setIsChangesConfirmed(true)
            } else {
                setPasswordErrorText(
                    'loginAndRegisterPage.passwordMismatchErrorText'
                )
            }
        } else {
            setPasswordErrorText('loginAndRegisterPage.weakPasswordErrorText')
        }
    }

    const handlePasswordChangeConfirmation = () => {
        UserProtectedApi.changePasswordAsync({
            newPassword,
            currentPassword,
        })
            .then((res) => {
                setIsChangesConfirmed(false)
                setIsChangePasswordSuccess(true)
            })
            .catch((err) => {
                err as AxiosError
                setPasswordErrorText(err?.response?.data?.message)
            })
    }

    return (
        <>
            <Modal
                style={{ margin: 10 }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={true}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={true}>
                    <Box sx={styles.box}>
                        <Grid container>
                            <Grid item xs>
                                <div style={styles.text}>
                                    <HeadLine2
                                        text={'changePasswordModal.change'}
                                        color={theme.palette.primary.main}
                                    />
                                </div>
                                <div style={styles.text}>
                                    <HeadLine2
                                        text={'changePasswordModal.password'}
                                        color={theme.palette.primary.main}
                                    />
                                </div>
                                <div style={styles.text1}>
                                    <HeadLine4
                                        text={
                                            'changePasswordModal.newPasswordContains'
                                        }
                                        color={theme.palette.black.main}
                                    />
                                </div>
                                <div style={styles.text2}>
                                    <ParagraphBold
                                        text={'changePasswordModal.rule1'}
                                        color={theme.palette.black.main}
                                    />
                                </div>
                                <div style={styles.text2}>
                                    <ParagraphBold
                                        text={'changePasswordModal.rule2'}
                                        color={theme.palette.black.main}
                                    />
                                </div>

                                <div style={styles.text2}>
                                    <ParagraphBold
                                        text={'changePasswordModal.rule3'}
                                        color={theme.palette.black.main}
                                    />
                                </div>

                                <div style={styles.text2}>
                                    <ParagraphBold
                                        text={'changePasswordModal.rule4'}
                                        color={theme.palette.black.main}
                                    />
                                </div>

                                <div style={styles.text2}>
                                    <ParagraphBold
                                        text={'changePasswordModal.rule5'}
                                        color={theme.palette.black.main}
                                    />
                                </div>
                            </Grid>

                            <Formik
                                initialValues={ChangePasswordModalInitialValues}
                                validationSchema={
                                    ChangePasswordModalValidationSchema
                                }
                                onSubmit={(values) => {
                                    handlePasswordChange(
                                        values.newPassword,
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
                                        <Grid item xs>
                                            <div
                                                style={{
                                                    marginTop: 40,
                                                }}
                                            >
                                                {passwordErrorText && (
                                                    <div
                                                        style={{
                                                            marginTop: 20,
                                                            marginBottom: 20,
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <HeadLine4
                                                            text={
                                                                passwordErrorText
                                                            }
                                                            color={
                                                                theme.palette
                                                                    .error.main
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                {isValidate && (
                                                    <div
                                                        style={{
                                                            justifyContent:
                                                                'center',
                                                            display: 'flex',
                                                        }}
                                                    >
                                                        <PasswordInputField
                                                            label={
                                                                'passwordInputField.currentPassword'
                                                            }
                                                            placeholder={
                                                                'passwordInputField.enterCurrentPassword'
                                                            }
                                                            name="currentPassword"
                                                            value={
                                                                values.currentPassword
                                                            }
                                                            onChange={(e) => {
                                                                setPasswordErrorText(
                                                                    ''
                                                                )
                                                                handleChange(e)
                                                                setCurrentPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }}
                                                            onBlur={handleBlur}
                                                            error={
                                                                (errors.currentPassword &&
                                                                    touched.currentPassword) ||
                                                                undefined
                                                            }
                                                            helperText={
                                                                errors.currentPassword &&
                                                                touched.currentPassword
                                                                    ? errors.currentPassword
                                                                    : ''
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                {((errors.currentPassword &&
                                                    touched.currentPassword) ||
                                                    undefined) && (
                                                    <div
                                                        style={{
                                                            marginTop: 50,
                                                        }}
                                                    ></div>
                                                )}
                                                <div
                                                    style={styles.passwordInput}
                                                >
                                                    <PasswordInputField
                                                        label={
                                                            'passwordInputField.newPassword'
                                                        }
                                                        placeholder={
                                                            'passwordInputField.enterNewPassword'
                                                        }
                                                        showMeter={true}
                                                        name="newPassword"
                                                        value={
                                                            values.newPassword
                                                        }
                                                        onChange={(e) => {
                                                            setPasswordErrorText(
                                                                ''
                                                            )
                                                            handleChange(e)
                                                            setNewPassword(
                                                                e.target.value
                                                            )
                                                        }}
                                                        onBlur={handleBlur}
                                                        error={
                                                            (errors.newPassword &&
                                                                touched.newPassword) ||
                                                            undefined
                                                        }
                                                        helperText={
                                                            errors.newPassword &&
                                                            touched.newPassword
                                                                ? errors.newPassword
                                                                : ''
                                                        }
                                                    />
                                                </div>

                                                {((errors.newPassword &&
                                                    touched.newPassword) ||
                                                    undefined) && (
                                                    <div
                                                        style={{
                                                            marginBottom: 85,
                                                        }}
                                                    ></div>
                                                )}

                                                <div
                                                    style={
                                                        styles.passwordInput2
                                                    }
                                                >
                                                    <PasswordInputField
                                                        label={
                                                            'passwordInputField.confirmPassword'
                                                        }
                                                        placeholder={
                                                            'passwordInputField.enterConfirmPassword'
                                                        }
                                                        name="confirmPassword"
                                                        value={
                                                            values.confirmPassword
                                                        }
                                                        onChange={(e) => {
                                                            setPasswordErrorText(
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
                                                            marginTop: 50,
                                                        }}
                                                    ></div>
                                                )}
                                            </div>
                                            <div
                                                style={styles.button}
                                                className="btn-toolbar"
                                                role="toolbar"
                                                aria-label="Toolbar with button groups"
                                            >
                                                <div
                                                    className="btn-group"
                                                    role="group"
                                                    aria-label="First group"
                                                    style={styles.buttonGroup}
                                                >
                                                    <ContainedButton
                                                        title={
                                                            'containedButtonTitles.save'
                                                        }
                                                        color={
                                                            theme.palette.white
                                                                .main
                                                        }
                                                        backgroundColor={
                                                            theme.palette
                                                                .primary.main
                                                        }
                                                        width={100}
                                                    />
                                                </div>
                                                <div
                                                    className="btn-group"
                                                    role="group"
                                                    aria-label="Third group"
                                                    style={styles.buttonGroup2}
                                                >
                                                    <ContainedButton
                                                        title={
                                                            'containedButtonTitles.cancel'
                                                        }
                                                        color={
                                                            theme.palette.white
                                                                .main
                                                        }
                                                        backgroundColor={
                                                            theme.palette
                                                                .neutral.main
                                                        }
                                                        onClick={handleCancel}
                                                        width={100}
                                                    />
                                                </div>
                                            </div>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            {isChangePasswordSuccess && (
                <SuccessModal
                    handleCancel={() => {
                        setIsChangePasswordSuccess(!isChangePasswordSuccess)
                        handleCancel()
                    }}
                    subText="successModal.changePasswordSuccessText"
                />
            )}

            {isChangesConfirmed && (
                <SaveConfirmationModal
                    handleCancel={() => {
                        setIsChangesConfirmed(!isChangesConfirmed)
                    }}
                    handleSave={() => {
                        handlePasswordChangeConfirmation()
                        setIsChangesConfirmed(!isChangesConfirmed)
                    }}
                />
            )}
        </>
    )
}

const styles = {
    box: {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: theme.palette.white.main,
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxWidth: 690,
    },

    button: {
        marginTop: 40,
        display: 'flex',
        marginLeft: 10,
        justifyContent: 'center',
    },

    buttonGroup2: {
        marginTop: 10,
    },

    buttonGroup: {
        marginRight: 21,
        marginTop: 10,
    },

    text: {
        display: 'flex',
        justifyContent: 'flex-start',
    },

    text1: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'flex-start',
    },

    passwordInput: {
        marginTop: 40,
        justifyContent: 'center',
        display: 'flex',
    },

    passwordInput2: {
        marginTop: 65,
        justifyContent: 'center',
        display: 'flex',
    },

    text2: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 10,
    },
}
