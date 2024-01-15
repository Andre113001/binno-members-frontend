import React , {useContext, useEffect, } from 'react'
import useLoadProfile from '../hooks/useLoadProfile'
import { useNavigate } from 'react-router-dom'

const AccountContext = React.createContext({
    profileData: {},
    handleLogout: () => {}
})

export const AccountContextProvider = (props) => {
    const {profileData, isLoading, handleDestroyToken} = useLoadProfile()
    // const navigate = useNavigate()



    return <AccountContext.Provider 
    value={{
        profileData: profileData, handleLogout: handleDestroyToken
    }}>
        {props.children}
        
    </AccountContext.Provider>
}

export default AccountContext