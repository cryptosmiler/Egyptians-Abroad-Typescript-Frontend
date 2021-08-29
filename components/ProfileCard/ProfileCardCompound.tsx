import EditProfile from './EditProfile'
import Logout from './Logout'
import MyProfile from './MyProfile'
import ProfileCardWrapper from './ProfileCardWrapper'

export default function ProfileCardCompound() {
  return (
    <>
      <ProfileCardWrapper>
        <MyProfile />
        <EditProfile />
        <Logout />
      </ProfileCardWrapper>
    </>
  )
}


