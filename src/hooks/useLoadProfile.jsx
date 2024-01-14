import { useState, useEffect } from 'react'
import useAccessToken from './useAccessToken'
import useHttp from './http-hook'

const useLoadProfile = () => {
    const accessToken = useAccessToken()
    const [profileData, setProfileData] = useState(null)
    const { sendRequest, isLoading } = useHttp();

    useEffect(() => {
        const fetchProfile = async () => {
            // Check if accessToken is truthy before proceeding
            if (accessToken) {
                try {
                    const results = await sendRequest({ 
                        url: `https://binno-members-repo-production-b8c4.up.railway.app/api/members/profile/${accessToken}`,
                        headers: {Authorization: `Bearer ${accessToken}`,},
                    })
                    setProfileData(results[0])
                } catch (error) {
                    console.error('Error:', error)
                }
            }
        }

        fetchProfile()
    }, [accessToken])

    // Return the profileData, so it can be used by the component using this hook
    return { profileData , isLoading}
}

export default useLoadProfile
