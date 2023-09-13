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
import { DeleteAccountConfirmationInitialValues } from './InitialValues'
import { DeleteAccountConfirmationValidationSchema } from './ValidationSchema'
import UserProtectedApi from '../../api/exclusive/userApis/UserProtectedApi'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import SuccessModal from './SuccessModal'
import BrowserLocalStorage from '../../utils/localStorage/BrowserLocalStorage'

interface IProps {
    handleCancel(): void
    handleDelete(): void
}

export default function DeleteAccountConfirmModal({
    handleCancel,
    handleDelete,
}: IProps) {
    const [password, setPassword] = React.useState('')
    const [isConfirmationModalOpened, setIsConfimationModalOpened] =
        React.useState(false)
    const [errorText, setErrorText] = React.useState('')
    const [isAccountDeleteSuccess, setIsAccountDeleteSuccess] =
        React.useState(false)

    const navigate = useNavigate()

    const handleAccountDelete = () => {
        setErrorText('')
        UserProtectedApi.deleteAsync({ password })
            .then((res) => {
                BrowserLocalStorage.RemoveAccessToken()
                setIsAccountDeleteSuccess(true)
            })
            .catch((err) => {
                err as AxiosError
                setErrorText(err?.response?.data?.message)
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
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs>
                                <div style={styles.text}>
                                    <HeadLine2
                                        text={
                                            'deleteAccountConfirmModal.deleteYour'
                                        }
                                        color={theme.palette.error.main}
                                    />
                                </div>
                                <div style={styles.text}>
                                    <HeadLine2
                                        text={
                                            'deleteAccountConfirmModal.account'
                                        }
                                        color={theme.palette.error.main}
                                    />
                                </div>
                                <div style={styles.text1}>
                                    <HeadLine4
                                        text={'deleteAccountConfirmModal.sorry'}
                                        color={theme.palette.black.main}
                                    />
                                </div>
                                <div style={styles.text2}>
                                    <ParagraphBold
                                        text={
                                            'deleteAccountConfirmModal.subText1'
                                        }
                                        color={theme.palette.error.main}
                                    />
                                </div>
                                <div style={styles.text}>
                                    <ParagraphBold
                                        text={
                                            'deleteAccountConfirmModal.subText2'
                                        }
                                        color={theme.palette.error.main}
                                    />
                                </div>

                                <div style={styles.text}>
                                    <ParagraphBold
                                        text={
                                            'deleteAccountConfirmModal.subText3'
                                        }
                                        color={theme.palette.error.main}
                                    />
                                </div>
                            </Grid>
                            <Formik
                                initialValues={
                                    DeleteAccountConfirmationInitialValues
                                }
                                validationSchema={
                                    DeleteAccountConfirmationValidationSchema
                                }
                                onSubmit={(values) => {
                                    setIsConfimationModalOpened(true)
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
                                            {errorText && (
                                                <div
                                                    style={{
                                                        marginTop: 20,
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <HeadLine4
                                                        text={errorText}
                                                        color={
                                                            theme.palette.error
                                                                .main
                                                        }
                                                    />
                                                </div>
                                            )}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    marginTop: 60,
                                                }}
                                            >
                                                <PasswordInputField
                                                    label={
                                                        'passwordInputField.password'
                                                    }
                                                    placeholder={
                                                        'passwordInputField.enterPassword'
                                                    }
                                                    name="password"
                                                    value={values.password}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                        setErrorText('')
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
                                                    style={{ marginBottom: 40 }}
                                                ></div>
                                            )}
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
                                                            'containedButtonTitles.deleteAccount'
                                                        }
                                                        color={
                                                            theme.palette.white
                                                                .main
                                                        }
                                                        backgroundColor={
                                                            theme.palette.error
                                                                .main
                                                        }
                                                        // onClick={handleDelete}
                                                        width={180}
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
            {isConfirmationModalOpened && (
                <DeleteConfirmationModal
                    handleCancel={() => {
                        setIsConfimationModalOpened(!isConfirmationModalOpened)
                    }}
                    handleDelete={() => {
                        handleAccountDelete()
                        setIsConfimationModalOpened(!isConfirmationModalOpened)
                    }}
                    subText="deleteConfirmationModal.deleteAccountText"
                />
            )}
            {isAccountDeleteSuccess && (
                <SuccessModal
                    handleCancel={() => {
                        setIsAccountDeleteSuccess(!isAccountDeleteSuccess)
                        handleCancel()
                        navigate('/')
                    }}
                    subText="successModal.accountDeleteSuccessText"
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
        marginTop: 35,
        display: 'flex',
        justifyContent: 'flex-start',
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

    text2: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'flex-start',
    },
}
