import React , {useContext, useEffect, } from 'react'
import useLoadProfile from '../hooks/useLoadProfile'

const AccountContext = React.createContext({
    profileData: {},
})

export const AccountContextProvider = (props) => {
    const {profileData, isLoading} = useLoadProfile()
    
    return <AccountContext.Provider 
    value={{
        profileData: profileData,
    }}>
        {props.children}
    </AccountContext.Provider>
}

export default AccountContext