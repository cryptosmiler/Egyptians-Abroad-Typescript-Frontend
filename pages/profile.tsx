import React, { useContext } from 'react'
import PrivateRoute from '../custom-routes/PrivateRoute'
import ProfileHeader from '../components/Profile/ProfileHeader'
import HomeNavbar from '../components/Navbar/HomeNavbar'
import Footer from '../components/Footer/Footer'
import ProfileBody from '../components/Profile/ProfileBody'
import { MainContext } from '../context/MainContext'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

export default function ProfilePage() {
  const { userProfile, avatarLink } = useContext(MainContext)

  if (Object.keys(userProfile!).length === 0) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <PrivateRoute>
      <HomeNavbar userProfile={userProfile} avatarLink={avatarLink} />
      <ProfileHeader userProfile={userProfile} avatarLink={avatarLink} />
      <ProfileBody avatarLink={avatarLink} />
      <Footer />
    </PrivateRoute>
  )
}

/*---> Styles <---*/
export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
