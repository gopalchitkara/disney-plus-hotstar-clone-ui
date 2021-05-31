import React, { Fragment } from 'react'
import Navbar from './Navbar'
import NotificationBar from './NotificationBar'

function Header() {
    return (
        <Fragment>
            <Navbar />
            <NotificationBar />
        </Fragment>
    )
}

export default Header
