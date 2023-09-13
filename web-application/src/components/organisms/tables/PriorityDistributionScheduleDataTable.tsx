import * as React from 'react'
import MUIDataTable from 'mui-datatables'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { getDataArrayByJson } from '../../../utils/datatable/TransformData'

interface Props {
    predictions: any
}

export default function PriorityDistributionScheduleDataTable({
    predictions,
}: Props) {
    const { t } = useTranslation()
    const options: any = {
        responsive: 'standard',
        rowsPerPageOptions: [10, 15, 20],
        rowsPerPage: 10,

        onTableChange: (action: any, state: any) => {
            console.log(action)
            console.dir(state)
        },
    }

    const data = getDataArrayByJson(predictions)

    const columns = [
        t('DataTable.addressColumn'),
        t('DataTable.agraianDivisionColumn'),
        t('DataTable.areaInAcresColumn'),
        t('DataTable.mobileColumn'),
        t('DataTable.farmerNameColumn'),
        t('DataTable.nicColumn'),
        t('DataTable.priorityColumn'),
        t('DataTable.riceTypeColumn'),
        t('DataTable.riceVariantColumn'),
        t('DataTable.cultivationStartDateColumn'),
    ]

    return (
        <Box sx={styles.table}>
            <MUIDataTable
                title={t('DataTable.priorityDistributionSchedule')}
                data={data}
                columns={columns}
                options={options}
            />
        </Box>
    )
}

const styles = {
    table: {
        marginLeft: '20px',
        marginRight: '20px',
        marginTop: '20px',
        marginBottom: '30px',
    },
}
