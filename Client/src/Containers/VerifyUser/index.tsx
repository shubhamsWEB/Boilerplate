import React from 'react'
import VerifyComponent from '../../Components/verifyComponent'
// import { verifyUser } from '../../api/actions' 
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';
type Iprops = {
    history: { push: Function },
    match:{params:{id:string}}
}

function Index({
    history,
    match
}:Iprops) {
    let axios = React.useContext(AxiosContext);
const {verifyUser} = apiCalls(axios);
    const [loading,setLoading] = React.useState(false)
    const handleVerifyEmail = async () => {
        setLoading(true)
        const response = await verifyUser({
            is_verified: true,
        }, match.params.id)
        setLoading(false)
        if (response) {
            history.push({
                pathname: '/login',
                verified: { value: true, message: 'Email has been verified please login', type: 'green' }
            })
        }
    }
    const headingText = "By clicking below you are agreeing to our terms and policies."

    const buttonDetails = [{ name: "verify", handler: handleVerifyEmail }]
    return (
        <VerifyComponent headingText={headingText} buttonDetails={buttonDetails} loading={loading}  />
    )
}

export default Index
