import React from 'react'
import ReactLoading from 'react-loading'
import COLORS from '../../../theme/styles/Colors'

export default function ButtonLoadingBar() {
    return (
        <ReactLoading
            type={'spin'}
            color={COLORS.WHITE}
            height={30}
            width={30}
        />
    )
}
