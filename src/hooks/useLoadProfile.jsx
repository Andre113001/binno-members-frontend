import { useState, useEffect } from 'react'
import useAccessToken from './useAccessToken'
import useHttp from './http-hook'
import { useNavigate } from 'react-router-dom'

const useLoadProfile = () => {
    const accessToken = useAccessToken()
    const [profileData, setProfileData] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState('initial')
    const { sendRequest, isLoading } = useHttp()

    useEffect(() => {
        const fetchProfile = async () => {
            // Check if accessToken is truthy before proceeding
            if (accessToken) {
                try {
                    const results = await fetch(
                        `${
                            import.meta.env.VITE_BACKEND_DOMAIN
                        }/members/profile/${accessToken}`
                    )
                    const data = await results.json()

                    setIsLoggedIn(true)
                    // Save the fetched data to the state
                    setProfileData(data[0])
                } catch (error) {
                    console.error('Error:', error)
                }
            } else {
                setIsLoggedIn(false)
            }
        }

        fetchProfile()
    }, [accessToken])

    function handleDestroyToken() {
        console.log('destroyed token')
        localStorage.removeItem('access')
        console.log('Token Destroyed')
        setProfileData(null)
        setIsLoggedIn(false)
        // navigate('/')
        // window.location.href = '/'
        location.reload()
    }

    // Return the profileData, so it can be used by the component using this hook
    return { isLoggedIn, profileData, isLoading, handleDestroyToken }
}

export default useLoadProfile
