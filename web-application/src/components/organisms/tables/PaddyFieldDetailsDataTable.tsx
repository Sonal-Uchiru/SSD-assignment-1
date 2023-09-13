import { Box, IconButton } from '@mui/material'
import { AxiosError } from 'axios'
import MUIDataTable from 'mui-datatables'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PaddyFieldProtectedApi from '../../../api/exclusive/PaddyFieldProtectedApi'
import { getDataArrayByJson } from '../../../utils/datatable/TransformData'
import ContentLoadingBar from '../../atoms/Loadings/ContentLoadingBar'
import ErrorModal from '../../modals/ErrorModal'
import { getFormattedDate } from '../../../utils/common/DateFormatter'

class PaddyFieldData {
    name: string
    acres: number
    slopeLevel: string
    noOfIrrigations: number
    spaceBetweenIrrigations: number
    createdAt: string

    constructor(
        name: string,
        acres: number,
        slopeLevel: string,
        noOfIrrigations: number,
        spaceBetweenIrrigations: number,
        createdAt: string
    ) {
        this.name = name
        this.acres = acres
        this.slopeLevel = slopeLevel
        this.noOfIrrigations = noOfIrrigations
        this.spaceBetweenIrrigations = spaceBetweenIrrigations
        this.createdAt = getFormattedDate(createdAt)
    }
}

export default function PaddyFieldDetailsDataTable() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [dataTablePaddyFields, setDataTablePaddyFields] =
        React.useState<any>(null)
    const [paddyFields, setPaddyFields] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)

    React.useEffect(() => {
        setErrorModalVisibility(false)
        PaddyFieldProtectedApi.getListAsync()
            .then((res) => {
                const paddyList = res.data.items.map(
                    (item: any) =>
                        new PaddyFieldData(
                            item.name,
                            item.acres.toFixed(4),
                            item.slopeLevel.name,
                            item.numberOfIrrigations,
                            item.spaceBetweenIrrigations.toFixed(4),
                            item.createdAt
                        )
                )
                setPaddyFields(res.data.items)
                setDataTablePaddyFields(getDataArrayByJson(paddyList))
                setIsLoading(false)
            })
            .catch((err) => {
                err as AxiosError
                setIsLoading(false)
                setErrorModalVisibility(true)
                console.log(err)
            })
    }, [])

    const options: any = {
        responsive: 'standard',
        rowsPerPageOptions: [5, 10, 15, 20],
        rowsPerPage: 10,

        onTableChange: (action: any, state: any) => {
            //console.log(action)
            //console.dir(state)
        },
    }

    const columns = [
        t('DataTable.paddyFieldNameColumn'),
        t('DataTable.acresColumn'),
        t('DataTable.slopeLevelColumn'),
        t('DataTable.noOfIrrigationsColumn'),
        t('DataTable.spaceBetweenIrrigationsColumn'),
        t('DataTable.createdDateColumn'),
        {
            name: t('DataTable.actionColumn'),
            options: {
                customBodyRender: (
                    value: any,
                    tableMeta: any,
                    updateValue: any
                ) => {
                    return (
                        <IconButton
                            onClick={() => {
                                navigate(
                                    `/viewPaddyFieldDrawing/${
                                        paddyFields[tableMeta.rowIndex]._id
                                    }`
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
                    )
                },
            },
        },
    ]

    return (
        <>
            {!isLoading ? (
                <Box sx={styles.table}>
                    {dataTablePaddyFields && (
                        <MUIDataTable
                            title={t('DataTable.paddyFieldList')}
                            data={dataTablePaddyFields}
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
