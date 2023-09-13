import * as React from 'react'
import MUIDataTable from 'mui-datatables'
import { useTranslation } from 'react-i18next'
import { Box, IconButton } from '@mui/material'
import { getDataArrayByJson } from '../../../utils/datatable/TransformData'
import OfficerEditResearchCategoryModal from '../../modals/officer/OfficerEditResearchCategoryModal'
import { getFormattedDate } from '../../../utils/common/DateFormatter'
import ResearchDisseminationProtectedApi from '../../../api/exclusive/ResearchDisseminationProtectedApi'
import { AxiosError } from 'axios'
import ContentLoadingBar from '../../atoms/Loadings/ContentLoadingBar'
import ErrorModal from '../../modals/ErrorModal'
import SummarizedContentPreviewModal from '../../modals/officer/SummarizedContentPreviewModal'

class ResearchPaperData {
    researchName: string
    subCategory: string
    formattedSummary: string
    createdAt: string
    mediaFileUrl: string
    summerizedContent: string
    subCategoryID: string

    constructor(
        researchName: string,
        subCategory: string,
        formattedSummary: string,
        createdAt: string,
        mediaFileUrl: string,
        summerizedContent: string,
        subCategoryID: string
    ) {
        this.researchName = researchName
        this.subCategory = subCategory
        this.formattedSummary = formattedSummary
        this.createdAt = getFormattedDate(createdAt)
        this.summerizedContent = summerizedContent
        this.mediaFileUrl = mediaFileUrl
        this.subCategoryID = subCategoryID
    }
}

interface IProp {
    isDataUpdated: boolean
}

export default function ResearchFindingsListDataTable({
    isDataUpdated,
}: IProp) {
    const [id, setId] = React.useState(null)
    const [dataTableResearchPapers, setDataTableResearchPapers] =
        React.useState<any>(null)
    const [researchPapers, setResearchPapers] = React.useState<any>([])
    const [selectedResearchPaper, setSelectedResearchPaper] =
        React.useState<any>({})
    const [isLoading, setIsLoading] = React.useState(false)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)
    const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(false)
    const { t } = useTranslation()
    const options: any = {
        responsive: 'standard',
        rowsPerPageOptions: [5, 10, 15, 20],
        rowsPerPage: 10,

        onTableChange: (action: any, state: any) => {
            console.log(action)
            console.log(state)
        },
    }

    const [isOpen, setIsOpen] = React.useState(false)
    const [isPreview, setIsPreview] = React.useState(false)

    function handleClick(rId: any, researchPaper: any) {
        setSelectedResearchPaper(researchPaper)
        setIsOpen(!isOpen)
        setId(rId) // Set the selected item ID
    }

    function handlePreview(rId: any, researchPaper: any) {
        setSelectedResearchPaper(researchPaper)
        setIsPreview(!isPreview)
        setId(rId)
    }

    const formatSummary = (summary: string) => {
        if (summary.length > 100) {
            return `${summary.substring(0, 100)}...`
        }

        return summary
    }

    React.useEffect(() => {
        setErrorModalVisibility(false)
        setIsLoading(true)
        ResearchDisseminationProtectedApi.getListAsync()
            .then((res) => {
                const researchPaperList = res.data.items.map(
                    (item: any) =>
                        new ResearchPaperData(
                            item?.topic,
                            item?.subCategory?.name,
                            formatSummary(item?.summerizedContent),
                            item?.createdAt,
                            item?.summerizedContent,
                            item?.mediaFileUrl,
                            item?.subCategory?._id
                        )
                )
                setResearchPapers(res.data.items)
                setDataTableResearchPapers(
                    getDataArrayByJson(researchPaperList)
                )
                setIsLoading(false)
            })
            .catch((err) => {
                err as AxiosError
                setIsLoading(false)
                setErrorModalVisibility(true)
            })
    }, [isUpdateSuccess, isDataUpdated])

    const columns = [
        t('DataTable.researchNameColumn'),
        t('DataTable.subCategoryColumn'),
        t('DataTable.summaryColumn'),
        t('DataTable.createdDateColumn'),
        {
            name: t('DataTable.actionColumn'),
            options: {
                customBodyRender: (
                    value: any,
                    tableMeta: any,
                    updateValue: any
                ) => {
                    const rId = dataTableResearchPapers[tableMeta.rowIndex][0]
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <IconButton
                                    onClick={() => {
                                        handleClick(
                                            rId,
                                            researchPapers[tableMeta.rowIndex]
                                        )
                                    }}
                                >
                                    <img
                                        alt="Edit Icon"
                                        src="./images/editing.png"
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </IconButton>
                                {isOpen && id === rId && (
                                    <OfficerEditResearchCategoryModal
                                        handleCancel={() => {
                                            handleClick(
                                                rId,
                                                researchPapers[
                                                    tableMeta.rowIndex
                                                ]
                                            )
                                        }}
                                        handleSave={() => {
                                            setIsUpdateSuccess(!isUpdateSuccess)
                                        }}
                                        researchPaper={selectedResearchPaper}
                                    />
                                )}
                            </div>
                            <div>
                                <IconButton
                                    onClick={() => {
                                        handlePreview(
                                            rId,
                                            researchPapers[tableMeta.rowIndex]
                                        )
                                    }}
                                >
                                    <img
                                        alt="Edit Icon"
                                        src="./images/eye.png"
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </IconButton>
                                {isPreview && id === rId && (
                                    <SummarizedContentPreviewModal
                                        handleCancel={() => {
                                            handlePreview(
                                                rId,
                                                researchPapers[
                                                    tableMeta.rowIndex
                                                ]
                                            )
                                        }}
                                        researchPaper={selectedResearchPaper}
                                    />
                                )}
                            </div>
                        </div>
                    )
                },
            },
        },
    ]

    return (
        <>
            {!isLoading ? (
                <Box sx={styles.table}>
                    {dataTableResearchPapers && (
                        <MUIDataTable
                            title={t('DataTable.researchList')}
                            data={dataTableResearchPapers}
                            columns={columns}
                            options={options}
                        />
                    )}
                </Box>
            ) : (
                <ContentLoadingBar />
            )}

            {errorModalVisibility && (
                <ErrorModal
                    handleCancel={() => setErrorModalVisibility(false)}
                />
            )}
        </>
    )
}

const styles = {
    table: {
        marginLeft: '20px',
        marginRight: '20px',
        marginTop: '20px',
        marginBottom: '10px',
    },
}
