import React, { useContext, useState, useEffect } from 'react'
import PrivateRoute from '../../custom-routes/PrivateRoute'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import Footer from '../../components/Footer/Footer'
import { MainContext } from '../../context/MainContext'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import axiosAPI from '../../api/axiosAPI'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import router from 'next/router'

export default function PublicProfilePage() {
  const { userProfile, avatarLink } = useContext(MainContext)
  const [userPublicProfile, setUserPublicProfile] = useState({})
  const [userPublicAvatar, setUserPublicAvatar] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState('')

  useEffect(() => {
		async function getPublicProfile() {
			try {
        setLoading(true)
        const userId: string = window.location.href.split('/')[4]
        setUserId(userId)
        const user = await axiosAPI.user.getOtherUserInfo(userId)
        const avatar = user.data.avatar
          ? axiosAPI.user.getUserAvatar(user.data._id)
          : null
        setUserPublicProfile(user)
        setUserPublicAvatar(avatar)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
		}
    getPublicProfile()
  }, [])

  if (loading) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <PrivateRoute>
      <HomeNavbar userProfile={userProfile} avatarLink={avatarLink} />
      <ProfileHeader
        userProfile={userPublicProfile}
        avatarLink={userPublicAvatar}
      />
      <ButtonsWrapper>
        <Link href={`/public-profile/${userId}/message`} passHref>
          <MessageButton variant='contained'>Send Message</MessageButton>
        </Link>
        <BackButton variant='contained' onClick={() => router.back()}>
          Back
        </BackButton>
      </ButtonsWrapper>
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

export const ButtonsWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const MessageButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 460px !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
  margin-top: 30px !important;

  @media (max-width: 550px) {
    width: 80% !important;
  }
`

export const BackButton = styled(Button)`
  background: #f0f0f0 !important;
  width: 460px !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: #5a5a5a !important;
  font-size: 16px !important;
  margin-bottom: 50px !important;
  margin-top: 30px !important;

  @media (max-width: 550px) {
    width: 80% !important;
  }
`
