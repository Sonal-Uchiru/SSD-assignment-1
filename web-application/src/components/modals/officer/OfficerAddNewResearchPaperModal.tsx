import * as React from 'react'
import { Formik, Form } from 'formik'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import theme from '../../../theme/hooks/CreateTheme'
import ParagraphBold from '../../atoms/typographies/ParagraphBold'
import Avatar from '@mui/material/Avatar'
import ContainedButton from '../../atoms/buttons/ContainedButton'
import HeadLine4 from '../../atoms/typographies/HeadLine4'
import SelectField from '../../atoms/selectField/SelectFieldAtom'
import CategoryProtectedApi from '../../../api/exclusive/CategoryProtectedApi'
import { AxiosError } from 'axios'
import {
    ISelectField,
    SelectFieldOptions,
    getSelectFieldOptions,
} from '../../../types/selectFields/SelectFieldTypes'
import { ExtractValueAndLabel } from '../../../utils/common/ValueLabelExtraction'
import FileUploadButton from '../../atoms/buttons/FileUploadButton'
import { uploadResearchPaperAsync } from '../../../utils/firebase/UploadFile'
import ResearchDisseminationService from '../../../api/services/ResearchDisseminationService'
import SuccessModal from '../SuccessModal'
import ResearchDisseminationProtectedApi from '../../../api/exclusive/ResearchDisseminationProtectedApi'
import InputField from '../../atoms/inputFields/InputField'
import { AddResearchPaperInitialValues } from './InitialValues'
import { AddResearchPaperValidationSchema } from './ValidationSchema'

interface IProps {
    handleCancel(): void
    handleSave(values: any): void
}

export default function OfficerAddNewResearchPaperModal({
    handleCancel,
    handleSave,
}: IProps) {
    const [categories, setCategories] = React.useState<SelectFieldOptions[]>([])
    const [subcategories, setSubcategories] = React.useState<
        SelectFieldOptions[]
    >([])
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const [subCategory, setSubCategory] = React.useState('')
    const [isAddResearchPaperSuccess, setIsAddResearchPaperSuccess] =
        React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState<FileList>()
    const [topic, setTopic] = React.useState('')

    React.useEffect(() => {
        CategoryProtectedApi.getListAsync()
            .then((res) => {
                res.data.items as ISelectField[]
                const selectFieldOptions = getSelectFieldOptions(res.data.items)
                setCategories(selectFieldOptions)
            })
            .catch((err) => {
                err as AxiosError
            })
    }, [])

    const getSubcategoriesByCategoryAsync = async (
        selectedCategory: string
    ) => {
        try {
            const category = ExtractValueAndLabel(selectedCategory)
            const res = await CategoryProtectedApi.getAsync(category.value)
            res.data.items as ISelectField[]
            const selectFieldOptions = getSelectFieldOptions(res.data.items)
            setSubcategories(selectFieldOptions)
        } catch (err) {
            err as AxiosError
        }
    }

    const addResearchPaper = (values: any) => {
        if (!selectedFile) return

        const researchPaperDto = {
            ...values,
            reseachPaperMediaFile: selectedFile,
            topic: topic,
        }

        handleSave(researchPaperDto)
    }

    return (
        <>
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
                                text={'officerAddNewResearchPaperModal.title'}
                                color={theme.palette.primary.main}
                            />
                        </div>
                        <div style={styles.images}>
                            <Avatar
                                alt="Research Image"
                                src="./images/analysis.png"
                                style={{
                                    marginTop: 20,
                                    width: 120,
                                    height: 120,
                                    objectFit: 'contain',
                                }}
                                variant="rounded"
                            />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <ParagraphBold
                                text={'officerAddNewResearchPaperModal.subText'}
                                color={theme.palette.primary.main}
                            />
                            <div style={{ marginTop: 10 }}>
                                <FileUploadButton
                                    title={
                                        'officerAddNewResearchPaperModal.uploadButtonText'
                                    }
                                    height={30}
                                    color={theme.palette.white.main}
                                    backgroundColor={theme.palette.primary.main}
                                    onChange={(selectedFile) =>
                                        setSelectedFile(selectedFile!)
                                    }
                                />
                            </div>
                        </div>

                        <Formik
                            initialValues={AddResearchPaperInitialValues}
                            validationSchema={AddResearchPaperValidationSchema}
                            onSubmit={(values) => addResearchPaper(values)}
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
                                            id={'topic'}
                                            label={'Researc Paper Topic'}
                                            type={'text'}
                                            placeholder={
                                                'Enter Research Paper Topic'
                                            }
                                            width={300}
                                            name="topic"
                                            onChange={(e) => {
                                                handleChange(e)
                                                setTopic(e.target.value)
                                            }}
                                            value={values?.topic}
                                            onBlur={handleBlur}
                                            error={
                                                (errors.topic &&
                                                    touched.topic) ||
                                                undefined
                                            }
                                            helperText={
                                                errors.topic && touched.topic
                                                    ? errors.topic
                                                    : ''
                                            }
                                        />
                                    </div>

                                    {((errors.topic && touched.topic) ||
                                        undefined) && (
                                        <div style={{ marginTop: 60 }}></div>
                                    )}

                                    <div style={styles.selectField1}>
                                        <SelectField
                                            label={'selectField.category'}
                                            placeholder={
                                                'selectField.selectCategory'
                                            }
                                            options={categories}
                                            name="category"
                                            value={values.category}
                                            onChange={async (e) => {
                                                setSelectedCategory(
                                                    e.target.value
                                                )
                                                handleChange(e)
                                                await getSubcategoriesByCategoryAsync(
                                                    e.target.value
                                                )
                                            }}
                                            onBlur={handleBlur}
                                            error={
                                                (errors.category &&
                                                    touched.category) ||
                                                undefined
                                            }
                                            errorText={errors.category}
                                        />
                                    </div>

                                    {((errors.category && touched.category) ||
                                        undefined) && (
                                        <div style={{ marginTop: 60 }}></div>
                                    )}

                                    <div style={styles.selectField2}>
                                        <SelectField
                                            label={'selectField.subCategory'}
                                            placeholder={
                                                'selectField.selectSubCategory'
                                            }
                                            options={subcategories}
                                            name="subCategory"
                                            value={values.subCategory}
                                            onChange={(e) => {
                                                setSubCategory(
                                                    e.target.value?.split(
                                                        '-'
                                                    )[1]
                                                )
                                                handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            error={
                                                (errors.subCategory &&
                                                    touched.subCategory) ||
                                                undefined
                                            }
                                            errorText={errors.subCategory}
                                            readOnly={selectedCategory == ''}
                                        />
                                    </div>

                                    {((errors.subCategory &&
                                        touched.subCategory) ||
                                        undefined) && (
                                        <div style={{ marginBottom: 50 }}></div>
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
                                                    'containedButtonTitles.save'
                                                }
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
            {isAddResearchPaperSuccess && (
                <SuccessModal
                    handleCancel={() => {
                        setIsAddResearchPaperSuccess(!isAddResearchPaperSuccess)
                        handleCancel()
                    }}
                    subText="successModal.addResearchPaperSuccessText"
                />
            )}
        </>
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
        p: 4,
        borderRadius: 2,
        maxWidth: 400,
    },

    button: {
        marginTop: 40,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    buttonGroup2: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },

    buttonGroup: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },

    images: {
        justifyContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        marginBottom: 10,
    },

    selectField1: {
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
    },

    selectField2: {
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
    },

    input: {
        marginTop: 40,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
    },
}
