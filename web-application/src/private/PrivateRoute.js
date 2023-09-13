import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import BrowserLocalStorage from '../utils/localStorage/BrowserLocalStorage'

export const Private = ({ Component, Role }) => {
    const auth = BrowserLocalStorage.GetAccessToken()
    const authenticatedUserRole = BrowserLocalStorage.GetUserRole()

    if (auth && authenticatedUserRole == Role) {
        return <Component />
    }

    return <Navigate to="/" />
}

Private.propTypes = {
    Component: PropTypes.elementType.isRequired,
    Role: PropTypes.number.isRequired,
}
