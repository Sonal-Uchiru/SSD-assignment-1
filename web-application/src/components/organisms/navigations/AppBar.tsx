import MenuIcon from '@mui/icons-material/Menu'
import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Switch, { SwitchProps } from '@mui/material/Switch'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { Form, Formik } from 'formik'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks/ReduxHooks'
import {
    getAgrarianDivisionSelectFields,
    getLocationSelectFields,
    getOpeningHourSelectFields,
    getPaddyTypeSelectFields,
    getSlopeLevelSelectFields,
    getSoilTypeSelectFields,
    getWaterInOutLocationSelectFields,
} from '../../../redux/selectFields/SelectFieldActionsRedux'
import theme from '../../../theme/hooks/CreateTheme'
import ContainedButton from '../../atoms/buttons/ContainedButton'
import InputField from '../../atoms/inputFields/InputField'
import HeadLine3 from '../../atoms/typographies/HeadLine3'
import ParagraphBold from '../../atoms/typographies/ParagraphBold'
import ChangePasswordModal from '../../modals/ChangePasswordModal'
import DeleteAccountConfirmModal from '../../modals/DeleteAccountConfirmModal'
import { EditProfileValidationSchema } from './ValidationSchema'
import BrowserLocalStorage from '../../../utils/localStorage/BrowserLocalStorage'
import UserProtectedApi from '../../../api/exclusive/userApis/UserProtectedApi'
import { AxiosError } from 'axios'
import HeadLine4 from '../../atoms/typographies/HeadLine4'
import SuccessModal from '../../modals/SuccessModal'
import SaveConfirmationModal from '../../modals/SaveConfirmationModal'
import { UserRoles } from '../../../types/enums/UserRoles'

interface Payload {
    firstName: string
    lastName: string
    mobile?: number
}

type Anchor = 'right'

export default function AgrivoAppBar() {
    const dispatch = useAppDispatch()
    const [userRole, setUserRole] = React.useState(UserRoles.Unspecified)

    React.useEffect(() => {
        setUserRole(BrowserLocalStorage.GetUserRole())

        dispatch(getSoilTypeSelectFields())
        dispatch(getWaterInOutLocationSelectFields())
        dispatch(getLocationSelectFields())
        dispatch(getSlopeLevelSelectFields())
        dispatch(getPaddyTypeSelectFields())
        dispatch(getOpeningHourSelectFields())
        dispatch(getAgrarianDivisionSelectFields())
    }, [])

    React.useEffect(() => {
        changeLanguage('en') // Set the initial language to English
    }, [])

    const navigate = useNavigate()

    const { i18n } = useTranslation()
    const { t } = useTranslation()
    // const [checked, setChecked] = React.useState(true)
    const [value, setValue] = React.useState('one')
    const [selectedLanguage, setSelectedLanguage] = React.useState('en')
    const [selectedPage, setSelectedPage] = React.useState<null | string>()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )

    const [viewProfile, setViewProfile] = React.useState(true)
    const [editProfile, setEditProfile] = React.useState(false)
    const [state, setState] = React.useState({
        right: false,
    })

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [mobile, setMobile] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [userRetrievalError, setUserRetrievalError] = React.useState('')
    const [userUpdateError, setUserUpdateError] = React.useState('')
    const [isConfirmModalOpened, setIsConfirmedModalOpened] =
        React.useState(false)
    const [isProfileUpdateSuccess, setIsProfileUpdateSuccess] =
        React.useState(false)

    // toogle
    // const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked(event.target.checked)
    // }

    const [openChangePassword, setOpenChangePassword] = React.useState(false)
    function handleOpenChangePassword() {
        setOpenChangePassword(!openChangePassword)
    }

    const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false)
    function handleOpenDeleteConfirm() {
        setOpenDeleteConfirm(!openDeleteConfirm)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const handleSelectPage = (page: string) => {
        setSelectedPage(page) // Update the selected page when changed
        if (userRole == UserRoles.Farmer) {
            if (getPages().indexOf(page) === 0) {
                navigate('/paddyFieldDetails')
            }
        } else {
            if (getPages().indexOf(page) === 0) {
                navigate('/researchDisseminating')
            } else if (getPages().indexOf(page) === 1) {
                navigate('/priorityDistribution')
            } else {
                navigate('/*')
            }
        }
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleLogOut = () => {
        BrowserLocalStorage.RemoveAccessToken()
        navigate('/')
    }

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language)
        setSelectedLanguage(language)
    }

    const editProfileDetails = () => {
        setViewProfile(false)
        setEditProfile(true)
    }

    const viewProfileDetails = () => {
        UserProtectedApi.getAsync()
            .then((res) => {
                setFirstName(res?.data?.user?.firstName)
                setLastName(res?.data?.user?.lastName)
                setMobile(res?.data?.user?.mobile)
                setEmail(res?.data?.user?.email)
                setViewProfile(true)
                setEditProfile(false)
            })
            .catch((err) => {
                err as AxiosError
                setUserRetrievalError(err?.response?.data?.message)
            })
    }

    const [selectedImage, setSelectedImage] = React.useState<string>('')
    const [previewImage, setPreviewImage] = React.useState('')

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]
            setSelectedImage(file.name)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleProfileUpdate = () => {
        console.log('Calling')
        const payload: Payload = { firstName, lastName }

        if (mobile !== '') {
            const mobileNumber = Number(mobile)
            if (!isNaN(mobileNumber)) {
                payload.mobile = mobileNumber
            }
        }

        UserProtectedApi.updateAsync(payload)
            .then((res) => {
                setIsProfileUpdateSuccess(true)
            })
            .catch((err) => {
                err as AxiosError
                setUserUpdateError(err?.response?.data?.message)
            })
    }

    React.useEffect(() => {
        UserProtectedApi.getAsync()
            .then((res) => {
                setFirstName(res?.data?.user?.firstName)
                setLastName(res?.data?.user?.lastName)
                setMobile(res?.data?.user?.mobile)
                setEmail(res?.data?.user?.email)
            })
            .catch((err) => {
                err as AxiosError
                setUserRetrievalError(err?.response?.data?.message)
            })
    }, [])

    const getPages = () => {
        if (userRole == UserRoles.Farmer) {
            return [t('appBar.furrowIrrigation')]
        }

        if (userRole == UserRoles.Officer) {
            return [
                t('appBar.researchDisseminating'),
                t('appBar.priorityDistibution'),
            ]
        }

        return []
    }

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
        />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor:
                        theme.palette.mode === 'dark' ? '#03C988' : '#03C988',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#03C988',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor:
                theme.palette.mode === 'light' ? '#F34E4E' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }))

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return
            }

            setState({ ...state, [anchor]: open })
            setValue('one')
        }

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                maxWidth: 400,
            }}
            role="presentation"
        >
            <div>
                <IconButton
                    onClick={toggleDrawer(anchor, false)}
                    sx={{
                        p: 0,
                        width: '43px',
                        height: '43px',
                        margin: '10px',
                        backgroundColor: 'white',
                        border: '2px solid #03C988',
                    }}
                >
                    <Avatar
                        alt="profile"
                        src="./images/right-arrow.png"
                        sx={{
                            width: '20px',
                            height: '20px',
                        }}
                    />
                </IconButton>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Avatar
                    alt="profile"
                    src={previewImage ? previewImage : './images/user (1).png'}
                    sx={{
                        width: 200,
                        height: 200,
                        objectFit: 'contain',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginLeft: 200,
                    marginTop: -20,
                }}
            >
                <IconButton
                    component="label"
                    style={{
                        color: 'white',
                        backgroundColor: 'transparent',
                        width: 25,
                        height: 25,
                        textTransform: 'none',
                    }}
                >
                    <Avatar
                        alt="profile"
                        src="./images/editing.png"
                        sx={{
                            width: 25,
                            height: 25,

                            imageFit: 'contain',
                        }}
                        variant="rounded"
                    />

                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                    />
                </IconButton>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginTop: 20,
                }}
            >
                <HeadLine3
                    text={`${firstName} ${lastName}`}
                    color={'black'}
                ></HeadLine3>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginTop: 10,
                }}
            >
                <ParagraphBold
                    text={email}
                    color={theme.palette.primary.main}
                ></ParagraphBold>
            </div>

            <div style={{ marginTop: 20 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    <Tab
                        value="one"
                        label={t('drawer.profile')}
                        style={{ textTransform: 'capitalize' }}
                    />
                    <Tab
                        value="two"
                        label={t('drawer.notifications')}
                        style={{ textTransform: 'capitalize' }}
                    />
                </Tabs>
            </div>
            {value === 'one' && (
                <div>
                    {viewProfile && (
                        <div>
                            {userRetrievalError && (
                                <div
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <HeadLine4
                                        text={userRetrievalError}
                                        color={theme.palette.error.main}
                                    />
                                </div>
                            )}
                            <div
                                style={{
                                    marginTop: 30,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginLeft: 25,
                                    marginRight: 25,
                                }}
                            >
                                <InputField
                                    id={'firstName'}
                                    label={'First Name'}
                                    type={'text'}
                                    onChange={undefined}
                                    value={firstName}
                                    placeholder={'Enter First Name'}
                                    readOnly={true}
                                />
                            </div>

                            <div
                                style={{
                                    marginTop: 40,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginLeft: 25,
                                    marginRight: 25,
                                }}
                            >
                                <InputField
                                    id={'lastName'}
                                    label={'Last Name'}
                                    type={'text'}
                                    onChange={undefined}
                                    value={lastName}
                                    placeholder={'Enter Last Name'}
                                    readOnly={true}
                                />
                            </div>

                            <div
                                style={{
                                    marginTop: 40,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginLeft: 25,
                                    marginRight: 25,
                                }}
                            >
                                <InputField
                                    id={'mobile'}
                                    label={'Mobile Number'}
                                    type={'text'}
                                    onChange={undefined}
                                    value={mobile}
                                    placeholder={'Enter Mobile Number'}
                                    required={false}
                                    readOnly={true}
                                />
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
                                            'containedButtonTitles.editProfile'
                                        }
                                        color={theme.palette.white.main}
                                        backgroundColor={
                                            theme.palette.primary.main
                                        }
                                        onClick={editProfileDetails}
                                        width={140}
                                        height={47}
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
                                            'containedButtonTitles.changePassword'
                                        }
                                        color={theme.palette.white.main}
                                        backgroundColor={
                                            theme.palette.neutral.main
                                        }
                                        onClick={handleOpenChangePassword}
                                        width={140}
                                        height={47}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',

                                    marginBottom: 35,
                                }}
                            >
                                <ContainedButton
                                    title={
                                        'containedButtonTitles.deleteAccount2'
                                    }
                                    color={theme.palette.white.main}
                                    backgroundColor={theme.palette.error.main}
                                    onClick={handleOpenDeleteConfirm}
                                    width={200}
                                    height={47}
                                />
                            </div>
                        </div>
                    )}

                    {editProfile && (
                        <Formik
                            initialValues={{ firstName, lastName, mobile }}
                            validationSchema={EditProfileValidationSchema}
                            onSubmit={(values) => {
                                setIsConfirmedModalOpened(true)
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
                                        {userUpdateError && (
                                            <div
                                                style={{
                                                    marginTop: 20,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <HeadLine4
                                                    text={userUpdateError}
                                                    color={
                                                        theme.palette.error.main
                                                    }
                                                />
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                marginTop: 30,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: 25,
                                                marginRight: 25,
                                            }}
                                        >
                                            <InputField
                                                id={'firstName'}
                                                label={'First Name'}
                                                type={'text'}
                                                defaultValue={firstName}
                                                placeholder={'Enter First Name'}
                                                name="firstName"
                                                value={values.firstName}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    setUserUpdateError('')
                                                    setFirstName(e.target.value)
                                                }}
                                                onBlur={handleBlur}
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
                                                style={{ marginTop: 50 }}
                                            ></div>
                                        )}

                                        <div
                                            style={{
                                                marginTop: 40,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: 25,
                                                marginRight: 25,
                                            }}
                                        >
                                            <InputField
                                                id={'lastName'}
                                                label={'Last Name'}
                                                type={'text'}
                                                defaultValue={lastName}
                                                placeholder={'Enter Last Name'}
                                                name="lastName"
                                                value={values.lastName}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    setUserUpdateError('')
                                                    setLastName(e.target.value)
                                                }}
                                                onBlur={handleBlur}
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
                                                style={{ marginTop: 50 }}
                                            ></div>
                                        )}

                                        <div
                                            style={{
                                                marginTop: 40,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: 25,
                                                marginRight: 25,
                                            }}
                                        >
                                            <InputField
                                                id={'mobile'}
                                                label={'Mobile'}
                                                type={'text'}
                                                defaultValue={mobile}
                                                placeholder={
                                                    'Enter Mobile Number'
                                                }
                                                required={false}
                                                name="mobile"
                                                value={values.mobile}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    setUserUpdateError('')
                                                    setMobile(e.target.value)
                                                }}
                                                onBlur={handleBlur}
                                                error={
                                                    (errors.mobile &&
                                                        touched.mobile) ||
                                                    undefined
                                                }
                                                helperText={
                                                    errors.mobile &&
                                                    touched.mobile
                                                        ? errors.mobile
                                                        : ''
                                                }
                                            />
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
                                                style={styles.buttonGroup2}
                                            >
                                                <ContainedButton
                                                    title={
                                                        'containedButtonTitles.save'
                                                    }
                                                    color={
                                                        theme.palette.white.main
                                                    }
                                                    backgroundColor={
                                                        theme.palette.primary
                                                            .main
                                                    }
                                                    width={140}
                                                    height={47}
                                                />
                                            </div>
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Third group"
                                                style={styles.buttonGroup}
                                            >
                                                <ContainedButton
                                                    title={
                                                        'containedButtonTitles.cancel'
                                                    }
                                                    color={
                                                        theme.palette.white.main
                                                    }
                                                    backgroundColor={
                                                        theme.palette.neutral
                                                            .main
                                                    }
                                                    onClick={() => {
                                                        viewProfileDetails()
                                                    }}
                                                    width={140}
                                                    height={47}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            )}

            {value === 'two' && (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 30,
                        }}
                    >
                        <ParagraphBold
                            text={t('drawer.notificationSettings')}
                            color={theme.palette.neutral.main}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: 40,
                        }}
                    >
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Grid item style={{ display: 'flex' }}>
                                <ParagraphBold
                                    text={'drawer.pushNotifications'}
                                    color={'black'}
                                />

                                <div style={{ marginTop: -11, marginLeft: 50 }}>
                                    <FormControlLabel
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                defaultChecked
                                            />
                                        }
                                        label=""
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div
                        style={{
                            marginTop: 30,
                        }}
                    >
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Grid item style={{ display: 'flex' }}>
                                <ParagraphBold
                                    text={'drawer.emailService'}
                                    color={'black'}
                                />

                                <div style={{ marginTop: -11, marginLeft: 85 }}>
                                    <FormControlLabel
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                defaultChecked
                                            />
                                        }
                                        label=""
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )}
        </Box>
    )

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: theme.palette.white.main,
                width: '100%',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar
                        src="./images/Agrivo-logo-circle.png"
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {getPages().map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        textTransform={'capitalize'}
                                        onClick={() => handleSelectPage(page)}
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {getPages().map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleSelectPage(page)}
                                sx={{
                                    my: 2,
                                    textTransform: 'capitalize',
                                    display: 'block',
                                    color:
                                        selectedPage === page
                                            ? 'warning.main' // Set the color to 'warning.main' if selected page matches the current page
                                            : 'white',
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, marginLeft: 20 }}>
                        <Tooltip title="English">
                            <IconButton
                                onClick={() => changeLanguage('en')}
                                sx={{
                                    p: 0,
                                    width: '43px',
                                    height: '43px',
                                    backgroundColor:
                                        selectedLanguage === 'en'
                                            ? 'warning.main' // Set the background color to 'warning.main' if selected language is 'en'
                                            : 'primary.main',
                                    marginRight: '5px',
                                    ':hover': {
                                        backgroundColor: 'warning.main',
                                    },
                                }}
                            >
                                <ParagraphBold
                                    text={'En'}
                                    color={theme.palette.white.main}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="සිංහල">
                            <IconButton
                                onClick={() => changeLanguage('sin')}
                                sx={{
                                    p: 0,
                                    width: '43px',
                                    height: '43px',
                                    backgroundColor:
                                        selectedLanguage === 'sin'
                                            ? 'warning.main' // Set the background color to 'warning.main' if selected language is 'en'
                                            : 'primary.main',
                                    marginRight: '5px',
                                    ':hover': {
                                        backgroundColor: 'warning.main',
                                    },
                                }}
                            >
                                <ParagraphBold
                                    text={'සිං'}
                                    color={theme.palette.white.main}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="தமிழ்">
                            <IconButton
                                onClick={() => changeLanguage('ta')}
                                sx={{
                                    p: 0,
                                    width: '43px',
                                    height: '43px',
                                    backgroundColor:
                                        selectedLanguage === 'ta'
                                            ? 'warning.main' // Set the background color to 'warning.main' if selected language is 'en'
                                            : 'primary.main',
                                    marginRight: '20px',
                                    ':hover': {
                                        backgroundColor: 'warning.main',
                                    },
                                }}
                            >
                                <ParagraphBold
                                    text={'தமி'}
                                    color={theme.palette.white.main}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="My Profile">
                            <IconButton
                                onClick={toggleDrawer('right', true)}
                                sx={{
                                    p: 0,
                                    width: '50px',
                                    height: '50px',

                                    marginRight: '10px',
                                }}
                            >
                                <Avatar
                                    alt="profile"
                                    src={
                                        previewImage
                                            ? previewImage
                                            : './images/user (1).png'
                                    }
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                        imageFit: 'cover',
                                    }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Log Out">
                            <IconButton
                                onClick={handleLogOut}
                                sx={{
                                    p: 0,
                                    width: '40px',
                                    height: '40px',
                                }}
                            >
                                <Avatar
                                    alt="Logout"
                                    src="./images/exit.png"
                                    variant="rounded"
                                    sx={{
                                        width: '28px',
                                        height: '28px',
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
            <div>
                {(['right'] as const).map((anchor) => (
                    <React.Fragment key={anchor}>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                        >
                            {list(anchor)}
                        </SwipeableDrawer>
                    </React.Fragment>
                ))}
            </div>
            {openChangePassword && (
                <ChangePasswordModal
                    handleCancel={handleOpenChangePassword}
                    handleSave={handleOpenChangePassword}
                />
            )}

            {openDeleteConfirm && (
                <DeleteAccountConfirmModal
                    handleCancel={handleOpenDeleteConfirm}
                    handleDelete={handleOpenDeleteConfirm}
                />
            )}

            {isProfileUpdateSuccess && (
                <SuccessModal
                    handleCancel={() => {
                        setIsProfileUpdateSuccess(!isProfileUpdateSuccess)
                        viewProfileDetails()
                    }}
                    subText="successModal.profileUpdateSuccessText"
                />
            )}

            {isConfirmModalOpened && (
                <SaveConfirmationModal
                    handleCancel={() => {
                        setIsConfirmedModalOpened(!isConfirmModalOpened)
                    }}
                    handleSave={() => {
                        handleProfileUpdate()
                        setIsConfirmedModalOpened(!isConfirmModalOpened)
                    }}
                />
            )}
        </AppBar>
    )
}

const styles = {
    button: {
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    buttonGroup: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 30,
    },

    buttonGroup2: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 30,
        marginBottom: 30,
    },
}
