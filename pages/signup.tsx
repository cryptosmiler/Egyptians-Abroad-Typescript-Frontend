import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import validator from 'validator'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import SignupNavbar from '../components/Navbar/SignupNavbar'
import Footer from '../components/Footer/Footer'
import Link from 'next/link'
import axiosAPI from '../api/axiosAPI'

interface InputFieldProps {
  invalid: boolean
}

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [validEmail, setValidEmail] = useState(true)
  const [validName, setValidName] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [error, setError] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

  function isValidEmail() {
    if (validator.isEmail(email)) {
      setValidEmail(true)
      return true
    } else {
      setValidEmail(false)
      setError(`This doesn't look like a valid email !`)
      setShowErrorMessage(true)
      return false
    }
  }

  function isValidName() {
    if (name.length > 0) {
      setValidName(true)
      return true
    } else {
      setValidName(false)
      setError(`You forgot to add a display name !`)
      setShowErrorMessage(true)
      return false
    }
  }

  function isValidPassword() {
    if (password.length >= 6) {
      setValidPassword(true)
      return true
    } else {
      setValidPassword(false)
      setError(`Password must be at least 6 characters`)
      setShowErrorMessage(true)
      return false
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    isValidEmail()
    isValidName()
    isValidPassword()

    if (isValidEmail() && isValidName() && isValidPassword()) {
      try {
        const user = await axiosAPI.user.signup({ name, email, password })
        localStorage.setItem(
          'EgAbroadToken',
          user.data.tokens[user.data.tokens.length - 1].token
        )
        setName('')
        setEmail('')
        setPassword('')
        window.location.replace('/profile-update')
      } catch (e) {
        setError(e.message)
        setShowErrorMessage(true)
      }
    }
  }

  function handleCloseAlert() {
    setShowErrorMessage(false)
    setShowConfirmMessage(false)
  }

  return (
    <>
      <SignupNavbar />
      <FixedWrapper>
        <FormWrapper>
          <FormBase onSubmit={handleSubmit}>
            <FormTitle>Sign up</FormTitle>
            <FieldWrapper>
              <FieldLabel>Name</FieldLabel>
              <InputWrapper>
                <FieldInput
                  invalid={validName ? false : true}
                  id='name'
                  type='text'
                  name='name'
                  autoComplete='off'
                  placeholder='Name'
                  onChange={(event) => setName(event.target.value)}
                />
              </InputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>Email</FieldLabel>
              <InputWrapper>
                <FieldInput
                  invalid={validEmail ? false : true}
                  id='email'
                  type='text'
                  name='email'
                  autoComplete='off'
                  placeholder='Email'
                  onChange={(event) => setEmail(event.target.value)}
                />
              </InputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>Password</FieldLabel>
              <InputWrapper>
                <FieldInput
                  invalid={validPassword ? false : true}
                  id='password'
                  type='password'
                  name='password'
                  autoComplete='off'
                  placeholder='Password'
                  onChange={(event) => setPassword(event.target.value)}
                />
              </InputWrapper>
            </FieldWrapper>
            <SignupButtonWrapper>
              <SignupButton type='submit' variant='contained'>
                Sign Up
              </SignupButton>
            </SignupButtonWrapper>
            <LoginButtonWrapper>
              <Link href='/login' passHref>
                <LoginButton variant='contained'>Login</LoginButton>
              </Link>
            </LoginButtonWrapper>
          </FormBase>
        </FormWrapper>
        <Snackbar
          open={showConfirmMessage}
          autoHideDuration={2500}
          onClose={handleCloseAlert}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <ConfirmMessage message={'User has been created successfully!'} />
        </Snackbar>
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
      <Footer />
    </>
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

export const FormWrapper = styled.div`
  border: 1px solid #1399ff;
  width: 350px;
  height: fit-content;
  margin-right: auto;
  margin-left: auto;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    width: 84%;
  }
`

export const FormTitle = styled.p`
  /* border: 1px solid red; */
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-bottom: 28px;
`

export const FieldWrapper = styled.div`
  /* border: 1px solid red; */
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
`

export const FieldInput = styled.input<InputFieldProps>`
  /* border: 1px solid red; */
  border-radius: 8px;
  width: 100%;
  height: 40px;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  background-color: white;
  color: black;

  ::placeholder {
    color: #bebebe;
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

export const SignupButtonWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
`

export const SignupButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 100% !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: white !important;
  font-size: 16px !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: normal !important;
  letter-spacing: normal !important;
`

export const LoginButtonWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
`

export const LoginButton = styled(Button)`
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
`

export const ConfirmMessage = styled(SnackbarContent)`
  background: #4caf50 !important;
  justify-content: center !important;
  flex-grow: unset !important;
  font-size: 16px !important;
  text-align: center !important;

  @media (max-width: 480px) {
    width: 90% !important;
  }
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
