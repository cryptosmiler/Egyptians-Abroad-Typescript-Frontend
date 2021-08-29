import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import AvatarEditor from 'react-avatar-editor'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt'
import axiosAPI from '../../api/axiosAPI'
import { MainContext } from '../../context/MainContext'
import Loader from 'react-loader-spinner'

/*---> Component <---*/
export default function UploadPhoto() {
  const [newImageAdded, setNewImageAdded] = useState(false)
  const [newImage, setNewImage] = useState<string | File>('')
  const [loading, setLoading] = useState(false)
  const [editor, setEditor] = useState<AvatarEditor | null>(null)
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })
  const [scale, setScale] = useState<number>(1)
  const { userProfile, avatarLink } = useContext(MainContext)

  function handleNewImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    setNewImageAdded(true)
    setNewImage(event.target.files![0])
    setScale(1)
  }

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('avatar', newImage)
    await axiosAPI.user.uploadMyUserAvatar(formData)
    location.reload()
    setTimeout(() => {
      setNewImageAdded(false)
      setLoading(false)
    }, 1000)
  }

  function handleCancel() {
    setNewImageAdded(false)
    setLoading(false)
  }

  if (Object.keys(userProfile!).length === 0) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <>
      <StepWrapper>
        <Title>Let’s Get Started</Title>
        <SubTitle>
          Upload a photo to display on your profile and add some basic
          information to introduce yourself.
        </SubTitle>
        <ProfilePhotoWrapper>
          <ImageWrapper>
            {newImageAdded ? (
              <AvatarEditor
                ref={(editor) => setEditor(editor)}
                image={newImageAdded ? newImage : avatarLink!}
                width={250}
                height={250}
                border={10}
                color={[255, 255, 255, 0.5]} // RGBA
                rotate={0}
                borderRadius={500}
                scale={scale}
                position={position}
                onPositionChange={() => handlePositionChange(position)}
              />
            ) : (
              <Image
                src={avatarLink || '/images/avatar.png'}
                alt='avatar big'
              />
            )}
          </ImageWrapper>
          <UploadButtonWrapper
            newImageAdded={newImageAdded}
            photoLoading={loading}
          >
            <UploadInput
              id='upload-photo'
              type='file'
              accept='image/*'
              onChange={(event) => handleNewImageSelect(event)}
            />
            <UploadLabel htmlFor='upload-photo'>
              <CameraButton
                color='primary'
                aria-label='upload picture'
                component='span'
                size='medium'
              >
                <CameraIcon />
              </CameraButton>
            </UploadLabel>
          </UploadButtonWrapper>
          <Spinner photoLoading={loading} src='/images/spinner.gif' />
          <ZoomWrapper newImageAdded={newImageAdded} loading={loading}>
          </ZoomWrapper>
          <ButtonsWrapper newImageAdded={newImageAdded}>
            <CancelButton
              variant='contained'
              color='secondary'
              onClick={handleCancel}
            >
              Cancel
            </CancelButton>
            <SaveImageButton
              variant='contained'
              onClick={(event) => handleSave(event)}
            >
              Save
            </SaveImageButton>
          </ButtonsWrapper>
        </ProfilePhotoWrapper>
      </StepWrapper>
    </>
  )
}

/*---> Styles <---*/
export const FixedWrapper = styled.div`
  /* border: 1px solid red; */
  min-height: calc((100vh) * 0.8);
`

export const StepWrapper = styled.div`
  /* border: solid yellow; */
  width: 460px;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 520px) {
    width: 84%;
  }
`

export const BackIcon = styled(LeftArrowAlt)`
  /* border: 1px solid red; */
  width: 42px;
  height: 41px;
  margin-left: -10px;
  margin-bottom: 20px;
  margin-top: 30px;
  cursor: pointer;
`

export const Title = styled.p`
  /* border: solid yellow; */
  font-size: 18px;
  font-weight: bold;
  line-height: 1.11;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 20px;
`

export const SubTitle = styled.p`
  /* border: solid yellow; */
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  margin-bottom: 40px;
`

export const ProfilePhotoWrapper = styled.div`
  /* border: 1px solid red; */
  margin-right: auto;
  margin-left: auto;
  text-align: center;

  @media (max-width: 1024px) {
    width: 90%;
  }
`

export const ImageWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-bottom: 0px;
  display: inline-block;
  margin-left: 60px;

  @media (max-width: 515px) {
    margin-left: initial;
    display: flex;
    justify-content: center;
  }
`

export const Image = styled.img`
  /* border: 1px solid red; */
  width: 128px;
  height: 128px;
  border-radius: 50%;
`

export const CameraButton = styled(IconButton)<{ component: string }>`
  /* border: 1px solid red !important; */
  border: 1px solid #ced4da !important;
  background: white !important;
`

export const CameraIcon = styled(PhotoCamera)`
  /* width: 50px !important; */
  color: gray !important;
  font-size: 30px !important;
`

export const UploadButtonWrapper = styled.div<{
  newImageAdded: boolean
  photoLoading: boolean
}>`
  /* border: 1px solid black; */
  display: inline;

  position: relative;
  bottom: ${(props) => (props.newImageAdded ? '230px' : '95px')};
  right: 40px;

  @media (max-width: 515px) {
    left: ${(props) =>
      props.photoLoading ? '225px' : props.newImageAdded ? '125px' : '55px'};
    bottom: ${(props) =>
      props.photoLoading ? '431px' : props.newImageAdded ? '263px' : '128px'};
  }
`
export const UploadInput = styled.input`
  /* border: 1px solid yellow; */
  display: none;
`

export const UploadLabel = styled.label`
  /* border: 1px solid yellow; */
`

export const Spinner = styled.img<{ photoLoading: boolean; src: string }>`
  /* border: 1px solid green; */
  width: 200px;
  position: relative;
  bottom: 260px;
  display: ${(props) => (props.photoLoading ? 'initial' : 'none')};

  @media (max-width: 515px) {
    right: 30px;
    bottom: 235px;
  }
`

export const ButtonsWrapper = styled.div<{ newImageAdded: boolean }>`
  /* border: 1px solid yellow; */
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  display: ${(props) => (props.newImageAdded ? 'flex' : 'none')};
`

export const CancelButton = styled(Button)`
  /* background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important; */
  width: 125px !important;
  height: 36px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
  margin-right: 20px !important;
`

export const SaveImageButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 125px !important;
  height: 36px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
`

export const ZoomWrapper = styled.div<{
  newImageAdded: boolean
  loading: boolean
}>`
  /* border: 1px solid red; */
  margin-bottom: 20px;
  text-align: center;
  margin-top: ${(props) => (props.loading ? '-205px' : 'initial')};
  display: ${(props) => (props.newImageAdded ? 'block' : 'none')};

  @media (max-width: 515px) {
    margin-top: ${(props) => (props.loading ? '-203px' : '-35px')};
  }
`

export const ZoomLabel = styled.p`
  /* border: 1px solid yellow; */
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`

export const ZoomBar = styled.input`
  /* border: 1px solid yellow; */
  cursor: grab;
  width: 200px;
`

export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
