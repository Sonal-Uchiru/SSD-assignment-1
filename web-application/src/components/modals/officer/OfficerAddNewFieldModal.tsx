import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import theme from '../../../theme/hooks/CreateTheme'
import Avatar from '@mui/material/Avatar'
import ContainedButton from '../../atoms/buttons/ContainedButton'
import InputField from '../../atoms/inputFields/InputField'
import HeadLine4 from '../../atoms/typographies/HeadLine4'
import { Formik, Form } from 'formik'
import { OfficerAddNewFieldInitialValues } from './InitialValues'
import { OfficerAddNewFieldValidationSchema } from './ValidationSchema'
import SelectField from '../../atoms/selectField/SelectFieldAtom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store/Store'
import { getSelectFieldOptions } from '../../../types/selectFields/SelectFieldTypes'

interface IProps {
    handleCancel(): void
    handleNext(values: any): void
}

export default function OfficerAddNewFieldModal({
    handleCancel,
    handleNext,
}: IProps) {
    const locations = getSelectFieldOptions(
        useSelector(
            (state: RootState) => state.selectFields.locationSelectField
        )
    )

    const paddyTypes = getSelectFieldOptions(
        useSelector(
            (state: RootState) => state.selectFields.paddyTypeSelectField
        )
    )

    const slopes = getSelectFieldOptions(
        useSelector(
            (state: RootState) => state.selectFields.slopeLevelSelectField
        )
    )

    const waterInOutLocations = getSelectFieldOptions(
        useSelector(
            (state: RootState) =>
                state.selectFields.waterInOutLocationSelectField
        )
    )

    return (
        <Modal
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
                    <div style={{ textAlign: 'center', marginTop: -15 }}>
                        <HeadLine4
                            text={'officerAddNewFieldModal.title'}
                            color={theme.palette.primary.main}
                        />
                    </div>
                    <div style={styles.images}>
                        <Avatar
                            alt="Paddy Image"
                            src="./images/landscape.png"
                            style={{
                                marginTop: 10,
                                width: 110,
                                height: 110,
                                objectFit: 'contain',
                            }}
                            variant="rounded"
                        />
                    </div>
                    <Formik
                        initialValues={OfficerAddNewFieldInitialValues}
                        validationSchema={OfficerAddNewFieldValidationSchema}
                        onSubmit={(values) => {
                            handleNext(values)
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
                                <div style={styles.inputField}>
                                    <InputField
                                        id={'name'}
                                        label={'inputField.fieldName'}
                                        type={'text'}
                                        placeholder={'inputField.enterName'}
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            (errors.name && touched.name) ||
                                            undefined
                                        }
                                        helperText={
                                            errors.name && touched.name
                                                ? errors.name
                                                : ''
                                        }
                                        size="small"
                                    />
                                </div>
                                {((errors.name && touched.name) ||
                                    undefined) && (
                                    <div style={{ marginTop: 40 }}></div>
                                )}

                                <div style={styles.selectField}>
                                    <SelectField
                                        label={'selectField.location'}
                                        placeholder={
                                            'selectField.selectLocation'
                                        }
                                        options={locations}
                                        name="location"
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            (errors.location &&
                                                touched.location) ||
                                            undefined
                                        }
                                        errorText={errors.location}
                                        size="small"
                                    />
                                </div>
                                {((errors.slope && touched.slope) ||
                                    undefined) && (
                                    <div style={{ marginTop: 40 }}></div>
                                )}

                                <div style={styles.selectField}>
                                    <SelectField
                                        label={'selectField.paddy'}
                                        placeholder={'selectField.paddyType'}
                                        options={paddyTypes}
                                        name="paddyType"
                                        value={values.paddyType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            (errors.paddyType &&
                                                touched.paddyType) ||
                                            undefined
                                        }
                                        errorText={errors.paddyType}
                                        size="small"
                                    />
                                </div>

                                {((errors.paddyType && touched.paddyType) ||
                                    undefined) && (
                                    <div style={{ marginTop: 40 }}></div>
                                )}
                                <div style={styles.selectField}>
                                    <SelectField
                                        label={'selectField.slope'}
                                        placeholder={'selectField.selectSlope'}
                                        options={slopes}
                                        name="slope"
                                        value={values.slope}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            (errors.slope && touched.slope) ||
                                            undefined
                                        }
                                        errorText={errors.slope}
                                        size="small"
                                    />
                                </div>
                                {((errors.slope && touched.slope) ||
                                    undefined) && (
                                    <div style={{ marginTop: 40 }}></div>
                                )}

                                <div style={styles.selectField}>
                                    <SelectField
                                        label={'selectField.waterIn'}
                                        placeholder={
                                            'selectField.selectWaterIn'
                                        }
                                        options={waterInOutLocations}
                                        name="waterIn"
                                        value={values.waterIn}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            (errors.waterIn &&
                                                touched.waterIn) ||
                                            undefined
                                        }
                                        errorText={errors.waterIn}
                                        size="small"
                                    />
                                </div>
                                {((errors.waterIn && touched.waterIn) ||
                                    undefined) && (
                                    <div style={{ marginBottom: 15 }}></div>
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
                                            title={'containedButtonTitles.next'}
                                            color={theme.palette.white.main}
                                            backgroundColor={
                                                theme.palette.primary.main
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
                                            color={theme.palette.white.main}
                                            backgroundColor={
                                                theme.palette.neutral.main
                                            }
                                            onClick={handleCancel}
                                            width={100}
                                        />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    )
}

const styles = {
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: theme.palette.white.main,
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
        maxWidth: 400,
    },

    button: {
        marginTop: 18,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    buttonGroup2: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 20,
    },

    buttonGroup: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 20,
    },

    images: {
        justifyContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        marginBottom: 10,
    },

    selectField: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
    },

    selectField1: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
    },

    inputField: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
    },
}
