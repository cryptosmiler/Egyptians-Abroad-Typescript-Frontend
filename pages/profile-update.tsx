import BasicInfo from '../components/Profile/BasicInfo'
import UploadPhoto from '../components/Profile/UploadPhoto'
import PrivateRoute from '../custom-routes/PrivateRoute'

export default function ProfileUpdatePage() {
  return (
    <PrivateRoute>
      <UploadPhoto />
      <BasicInfo />
    </PrivateRoute>
  )
}
