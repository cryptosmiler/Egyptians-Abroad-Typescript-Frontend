import { useState, useEffect } from 'react'
import axiosAPI from '../api/axiosAPI'

export default function getData() {
  const [userProfile, setUserProfile] = useState({})
  const [avatarLink, setAvatarLink] = useState<string | null>(null)
	
  useEffect(() => {
    async function getUserProfile() {
      try {
        const user = await axiosAPI.user.getMyUserInfo()
        const avatar = user.data.avatar
          ? axiosAPI.user.getUserAvatar(user.data._id)
          : null
        setUserProfile(user)
        setAvatarLink(avatar)
      } catch (e) {
        console.error(e)
      }
    }
    getUserProfile()
  }, [])

  return { userProfile, avatarLink }
}
