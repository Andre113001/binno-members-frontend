import React , {useContext, useEffect, useState, } from 'react'
import useLoadProfile from '../hooks/useLoadProfile'
import { useNavigate } from 'react-router-dom'

const AccountContext = React.createContext({
    profileData: {},
    handleLogout: () => {}
})

export const AccountContextProvider = (props) => {
    const {profileData: profile, isLoading, handleDestroyToken} = useLoadProfile()
    // const navigate = useNavigate()'
    const [profileData, setProfileData] = useState(profile)

    useEffect(() => {
        const fetchData = async () => {
            setProfileData(profile)
        }
        fetchData()
    }, [profile])

    return <AccountContext.Provider 
    value={{
        profileData: profileData, handleLogout: handleDestroyToken
    }}>
        {props.children}
        
    </AccountContext.Provider>
}

export default AccountContext