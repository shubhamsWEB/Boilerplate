import React from 'react'
import Dashboard from '../Dashboard';

function Subscriptions({loggedinUser}:any) {
    return (
        <Dashboard loggedinUser={loggedinUser} filter={true}/>
    )
}

export default Subscriptions
