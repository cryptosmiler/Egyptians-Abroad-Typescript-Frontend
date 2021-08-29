import React, { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../context/MainContext'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Switch from '@material-ui/core/Switch'
import axiosAPI from '../../api/axiosAPI'
import Loader from 'react-loader-spinner'
import Link from 'next/link'

/*---> Component <---*/
export default function BasicInfo() {
  const { setShowProfileCard, userProfile } = useContext(MainContext)
  const [charsNumber, setCharsNumber] = useState(0)
  const [nameInputValue, setNameInputValue] = useState('')
  const [bioInputValue, setBioInputValue] = useState('')
  const [countryInputValue, setCountryInputValue] = useState('')
  const [cityInputValue, setCityInputValue] = useState('')
  const [phoneInputValue, setPhoneInputValue] = useState('')
  const [interestedIn, setInterestedIn] = useState<string[]>([])
  const [topicsOfInterest, setTopicsOfInterest] = useState<string[]>([])

  const [validInfo, setValidInfo] = useState(true)
  const [error, setError] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  useEffect(() => {
    async function getBasicInfo() {
      try {
        const user = await axiosAPI.user.getMyUserInfo()
        setNameInputValue(user.data.name)
        setBioInputValue(user.data.bio)
        setCountryInputValue(user.data.country)
        setCityInputValue(user.data.city)
        setPhoneInputValue(user.data.phone)
        setInterestedIn(user.data.interested_in)
        setTopicsOfInterest(user.data.topics_of_interest)
      } catch (e) {
        console.error(e)
      }
    }
    getBasicInfo()
  }, [])

  ////////////////////////////////

  function setNewName(event: React.ChangeEvent<HTMLInputElement>) {
    setNameInputValue(event.target.value)
  }

  function setNewBio(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setBioInputValue(event.target.value)
  }

  function setNewCountry(event: React.ChangeEvent<HTMLInputElement>) {
    setCountryInputValue(event.target.value)
  }

  function setNewCity(event: React.ChangeEvent<HTMLInputElement>) {
    setCityInputValue(event.target.value)
  }

  function setNewPhone(event: React.ChangeEvent<HTMLInputElement>) {
    setPhoneInputValue(event.target.value)
  }

  function setNewInterestedIn(event: React.ChangeEvent<HTMLInputElement>) {
    let newArr = []
    if (event.target.checked) {
      newArr = [...interestedIn, event.target.name]
      setInterestedIn(newArr)
    } else if (!event.target.checked) {
      newArr = interestedIn.filter((item) => item !== event.target.name)
      setInterestedIn(newArr)
    }
  }

  function setNewTopicsOfInterest(event: React.ChangeEvent<HTMLInputElement>) {
    let newArr = []
    if (event.target.checked) {
      newArr = [...topicsOfInterest, event.target.name]
      setTopicsOfInterest(newArr)
    } else if (!event.target.checked) {
      newArr = topicsOfInterest.filter((item) => item !== event.target.name)
      setTopicsOfInterest(newArr)
    }
  }

  ////////////////////////////////////////

  function isValidInfo() {
    if (
      countryInputValue?.length > 0 &&
      cityInputValue?.length > 0 &&
      nameInputValue?.length > 0
    ) {
      setValidInfo(true)
      return true
    } else {
      setValidInfo(false)
      setError(`Please enter the required info !`)
      setShowErrorMessage(true)
    }
  }

  async function hanldeUpdate(event: React.FormEvent) {
    event.preventDefault()
    isValidInfo()
    if (isValidInfo()) {
      try {
        await axiosAPI.user.updateMyUserInfo({
          name: nameInputValue,
          bio: bioInputValue,
          country: countryInputValue,
          city: cityInputValue,
          phone: phoneInputValue,
          interested_in: interestedIn,
          topics_of_interest: topicsOfInterest,
        })
        console.log('user updated sucessfully!')
        location.replace('/home')
        setShowProfileCard!(false)
      } catch (e) {
        console.error(e)
      }
    }
  }

  function limitBioInput(event: React.KeyboardEvent<any>) {
    let text = event.target.value
    setCharsNumber(text.length)
    if (text.length >= 160 && event.keyCode != 8) {
      event.preventDefault()
    }
  }

  function handleCloseAlert() {
    setShowErrorMessage(false)
  }

  if (Object.keys(userProfile!).length === 0) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <FixedWrapper>
      <StepWrapper>
        <FormBase onSubmit={hanldeUpdate}>
          <FieldWrapper>
            <FieldLabel>Name</FieldLabel>
            <InputWrapper>
              <FieldInput
                invalid={validInfo ? false : true}
                id='name'
                type='text'
                name='name'
                autoComplete='off'
                placeholder='Name'
                defaultValue={userProfile!.data?.name}
                onChange={(event) => setNewName(event)}
              />
            </InputWrapper>
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>Bio</FieldLabel>
            <BioInputWrapper>
              <BioInput
                id='bio'
                type='textarea'
                cols='40'
                name='bio'
                placeholder='Living for 3 years in London, graduated from Cairo University, working as a freelancer.'
                defaultValue={userProfile!.data?.bio}
                onChange={(event) => setNewBio(event)}
                onKeyDown={limitBioInput}
              />
            </BioInputWrapper>
          </FieldWrapper>
          <CharsWrapper>
            <CharsNumber>{charsNumber}/160</CharsNumber>
          </CharsWrapper>
          <FieldWrapper>
            <FieldLabel>Country</FieldLabel>
            <InputWrapper>
              <FieldInput
                invalid={validInfo ? false : true}
                id='country'
                type='text'
                name='country'
                autoComplete='off'
                placeholder='Country'
                defaultValue={userProfile!.data?.country}
                onChange={(event) => setNewCountry(event)}
              />
            </InputWrapper>
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>City</FieldLabel>
            <InputWrapper>
              <FieldInput
                invalid={validInfo ? false : true}
                id='country'
                type='text'
                name='country'
                autoComplete='off'
                placeholder='City'
                defaultValue={userProfile!.data?.city}
                onChange={(event) => setNewCity(event)}
              />
            </InputWrapper>
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>Phone</FieldLabel>
            <InputWrapper>
              <FieldInput
                id='phone'
                type='number'
                name='phone'
                autoComplete='off'
                placeholder='Phone'
                defaultValue={userProfile!.data?.phone}
                onChange={(event) => setNewPhone(event)}
              />
            </InputWrapper>
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>Interested In</FieldLabel>
            <SwitchWrapper>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name='social networking'
                      color='primary'
                      onChange={(event) => setNewInterestedIn(event)}
                      checked={
                        interestedIn?.includes('social networking')
                          ? true
                          : false
                      }
                    />
                  }
                  label='Social Networking'
                />
                <FormControlLabel
                  control={
                    <Switch
                      name='professional networking'
                      color='primary'
                      onChange={(event) => setNewInterestedIn(event)}
                      checked={
                        interestedIn?.includes('professional networking')
                          ? true
                          : false
                      }
                    />
                  }
                  label='Professional Networking'
                />
                <FormControlLabel
                  control={
                    <Switch
                      name='business partnership'
                      color='primary'
                      onChange={(event) => setNewInterestedIn(event)}
                      checked={
                        interestedIn?.includes('business partnership')
                          ? true
                          : false
                      }
                    />
                  }
                  label='Business Partnership'
                />
                <FormControlLabel
                  control={
                    <Switch
                      name='looking around'
                      color='primary'
                      onChange={(event) => setNewInterestedIn(event)}
                      checked={
                        interestedIn?.includes('looking around') ? true : false
                      }
                    />
                  }
                  label='Looking Around'
                />
              </FormGroup>
            </SwitchWrapper>
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>Topics of Interest</FieldLabel>
            <SwitchWrapper>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name='topic business and entrepreneurship'
                      color='primary'
                      onChange={(event) => setNewTopicsOfInterest(event)}
                      checked={
                        topicsOfInterest?.includes(
                          'topic business and entrepreneurship'
                        )
                          ? true
                          : false
                      }
                    />
                  }
                  label='Business and Entrepreneurship'
                />
                <FormControlLabel
                  control={
                    <Switch
                      name='topic visas and immigration'
                      color='primary'
                      onChange={(event) => setNewTopicsOfInterest(event)}
                      checked={
                        topicsOfInterest?.includes(
                          'topic visas and immigration'
                        )
                          ? true
                          : false
                      }
                    />
                  }
                  label='Visas and Immigration'
                />
                <FormControlLabel
                  control={
                    <Switch
                      name='topic business partnership'
                      color='primary'
                      onChange={(event) => setNewTopicsOfInterest(event)}
                      checked={
                        topicsOfInterest?.includes('topic business partnership')
                          ? true
                          : false
                      }
                    />
                  }
                  label='Business partnership'
                />
                <FormControlLabel
                  control={
                    <Switch
                      name='topic looking around'
                      color='primary'
                      onChange={(event) => setNewTopicsOfInterest(event)}
                      checked={
                        topicsOfInterest?.includes('topic looking around')
                          ? true
                          : false
                      }
                    />
                  }
                  label='Looking Around'
                />
                <FormControlLabel
                  control={
                    <Switch
                      name='topic other'
                      color='primary'
                      onChange={(event) => setNewTopicsOfInterest(event)}
                      checked={
                        topicsOfInterest?.includes('topic other') ? true : false
                      }
                    />
                  }
                  label='Other'
                />
              </FormGroup>
            </SwitchWrapper>
          </FieldWrapper>

          <NextButtonWrapper>
            <NextButton type='submit' variant='contained'>
              Update Profile
            </NextButton>
          </NextButtonWrapper>
          <CancelButtonWrapper>
            <Link href='/home' passHref>
              <CancelButton variant='contained'>Cancel</CancelButton>
            </Link>
          </CancelButtonWrapper>
        </FormBase>
      </StepWrapper>
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={2500}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ErrorMessage message={error} />
      </Snackbar>
    </FixedWrapper>
  )
}

/*---> Styles <---*/

export const FormBase = styled.form`
  /* border: 1px solid red; */
`

export const FixedWrapper = styled.div`
  /* border: 1px solid red; */
  min-height: calc((100vh) * 0.8);
`

export const StepWrapper = styled.div`
  /* border: solid yellow; */
  width: 460px;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 84%;
  }
`

export const Title = styled.p`
  /* border: solid yellow; */
  font-size: 18px;
  font-weight: bold;
  line-height: 1.11;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
`

export const SubTitle = styled.p`
  /* border: solid yellow; */
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  margin-bottom: 30px;
`

export const FieldWrapper = styled.div`
  /* border: 1px solid yellow; */
`

export const SwitchWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  flex-direction: column;
`

export const FieldLabel = styled.p`
  /* border: 1px solid red; */
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.25px;
  margin-bottom: 5px;
  margin-top: 16px;
`
export const InputWrapper = styled.div`
  /* border: 1px solid red; */
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  background-color: white;
`

export const FieldInput = styled.input<{ invalid?: boolean }>`
  /* border: 1px solid red; */
  border-radius: 8px;
  width: 100%;
  height: 40px;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  background-color: white;
  color: #495057;

  ::placeholder {
    color: #bebebe;
    font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  }

  :focus {
    border: 2px solid rgba(20, 155, 255, 0.5) !important;
  }

  border: ${(props) =>
    props.invalid &&
    `
		1px solid red;
		animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;

		@keyframes shake {
			10%, 90% {
				transform: translate3d(-1px, 0, 0);
			}
			
			20%, 80% {
				transform: translate3d(2px, 0, 0);
			}

			30%, 50%, 70% {
				transform: translate3d(-4px, 0, 0);
			}

			40%, 60% {
				transform: translate3d(4px, 0, 0);
			}
		}
	`};
`

export const BioInputWrapper = styled.div`
  /* border: 1px solid red; */
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  height: 127px;
  background-color: white;
`

export const BioInput = styled.textarea<{ cols: any, type: string }>`
  /* border: 1px solid red; */
  border-radius: 8px;
  border: none;
  height: 125px;
  max-height: 125px;
  min-height: 125px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  padding: 6px 12px;
  text-align: left;
  outline: none !important;
  max-width: 100%;
  min-width: 100%;
  background-color: white;
  color: #495057;

  ::placeholder {
    color: #bebebe;
  }

  :focus {
    border: 2px solid rgba(20, 155, 255, 0.5) !important;
  }
`

export const CharsWrapper = styled.div`
  /* border: 1px solid red; */
  text-align: right;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;

  @media (max-width: 485px) {
    width: 100%;
  }
`

export const CharsNumber = styled.p`
  /* border: 1px solid black; */
  font-size: 14px;
  font-weight: 500;
`

export const NextButtonWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
`

export const NextButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 100% !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: white !important;
  font-size: 16px !important;
`

export const CancelButtonWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
`

export const CancelButton = styled(Button)`
  background: #f0f0f0 !important;
  width: 100% !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: #5a5a5a !important;
  font-size: 16px !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: normal !important;
  letter-spacing: normal !important;
  margin-bottom: 70px !important;
`

export const ErrorMessage = styled(SnackbarContent)`
  background: orange !important;
  justify-content: center !important;
  flex-grow: unset !important;
  font-size: 16px !important;
  text-align: center !important;

  @media (max-width: 480px) {
    width: 90% !important;
  }
`

export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
