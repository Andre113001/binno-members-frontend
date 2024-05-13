import React from 'react'
import useLoadProfile from '../../hooks/useLoadProfile'

const testing = () => {
  const { profileData } = useLoadProfile();
  console.log(profileData);
  return (
    <div>
      <h1 className='text-9xl bold'>{profileData?.setting_institution}'s Data</h1>
    </div>
  )
}

export default testing
