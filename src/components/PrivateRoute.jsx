import React from 'react'
import { Route, Redirect } from 'react-router'

export default function PrivateRoute({component: Component}) {

    const token = sessionStorage.getItem("token");

    return (
        <Route render={() => token !== "undefined" ? <Component /> : <Redirect to="/login" />} />
    )
}
