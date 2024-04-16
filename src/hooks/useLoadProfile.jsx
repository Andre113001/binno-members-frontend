import { useState, useEffect } from 'react'
import useAccessToken from './useAccessToken'
import useHttp from './http-hook'
import { useNavigate } from 'react-router-dom'

const useLoadProfile = () => {
    const accessToken = useAccessToken()
    const [profileData, setProfileData] = useState(null)
    const { sendRequest, isLoading } = useHttp()

    useEffect(() => {
        const fetchProfile = async () => {
            // Check if accessToken is truthy before proceeding
            if (accessToken) {
                try {
                    const results1 = await fetch(
                        `${
                            import.meta.env.VITE_BACKEND_DOMAIN
                        }/members/profile/${accessToken}`
                    )
                    const data = await results1.json()

                    const results2 = await fetch(
                        `${
                            import.meta.env.VITE_BACKEND_DOMAIN
                        }/members/company_links/${data[0].member_id}`
                    );

                    const data1 = await results2.json();

                    const combinedData = {
                        ...data[0],
                        companyLinks: data1
                    }

                    // Save the fetched data to the state
                    setProfileData(combinedData)
                } catch (error) {
                    console.error('Error:', error)
                }
            }
        }

        fetchProfile()
    }, [accessToken])

    function handleDestroyToken() {
        console.log('destroyed token')
        localStorage.removeItem('access')
        console.log('Token Destroyed')
        setProfileData(null)
        navigate('/')
        // window.location.href = '/'
        // location.reload()
    }

    // Return the profileData, so it can be used by the component using this hook
    return { profileData, isLoading, handleDestroyToken }
}

export default useLoadProfile
