import Head from 'next/head'
import React, { useState } from 'react'
import PrivateRoute from '../custom-routes/PrivateRoute'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import axiosAPI from '../api/axiosAPI'
import Link from 'next/link'
import router from 'next/router'

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [titleCharsNumber, setTitleCharsNumber] = useState(0)
  const [bodyCharsNumber, setBodyCharsNumber] = useState(0)
  const [validInfo, setValidInfo] = useState(true)

  function isValidInfo() {
    if (title.length > 0 && body.length > 0) {
      setValidInfo(true)
      return true
    } else {
      setValidInfo(false)
      setError(`Please enter the required info !`)
      setShowErrorMessage(true)
    }
  }

  function handleCloseAlert() {
    setShowErrorMessage(false)
  }

  function limitTitleInput(event: React.KeyboardEvent<HTMLImageElement>) {
    let text = event.target.value
    setTitleCharsNumber(text.length)
    if (text.length >= 140 && event.keyCode != 8) {
      event.preventDefault()
    }
  }

  function limitBodyInput(event: any) {
    let text = event.target.value
    setBodyCharsNumber(text.length)
    if (text.length >= 560 && event.keyCode != 8) {
      event.preventDefault()
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    await isValidInfo()

    if (isValidInfo()) {
      try {
        await axiosAPI.post.addNewPost({ title, body })
        console.log('Post Added sucessfully!')
        router.replace('/home')
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <PrivateRoute>
      <PageWrapper>
        <FixedWrapper>
          <FormWrapper>
            <FormBase onSubmit={handleSubmit}>
              <PageTitle>New Post</PageTitle>
              <FieldWrapper>
                <FieldLabel>Post Title</FieldLabel>
                <InputWrapper>
                  <FieldInput
                    invalid={validInfo ? false : true}
                    id='title'
                    type='text'
                    name='title'
                    autoComplete='off'
                    placeholder='Question about US B1 Visa'
                    onChange={(event) => setTitle(event.target.value)}
                    onKeyDown={limitTitleInput}
                  />
                </InputWrapper>
                <CharsWrapper>
                  <CharsNumber>{titleCharsNumber}/140</CharsNumber>
                </CharsWrapper>
              </FieldWrapper>
              <FieldWrapper>
                <FieldLabel>Post Body</FieldLabel>
                <BodyInputWrapper>
                  <BodyInput
                    invalid={validInfo ? false : true}
                    id='body'
                    type='textarea'
                    cols='40'
                    name='body'
                    placeholder='I want to know detailed information about US B1 Visa,  if anybody has a previuos experinece in this process.'
                    onChange={(event) => setBody(event.target.value)}
                    onKeyDown={limitBodyInput}
                  />
                </BodyInputWrapper>
                <CharsWrapper>
                  <CharsNumber>{bodyCharsNumber}/560</CharsNumber>
                </CharsWrapper>
              </FieldWrapper>
              <SubmitButtonWrapper>
                <SubmitButton type='submit' variant='contained'>
                  Submit
                </SubmitButton>
              </SubmitButtonWrapper>
              <CancelButtonWrapper>
                <Link href='/home' passHref>
                  <CancelButton variant='contained'>Cancel</CancelButton>
                </Link>
              </CancelButtonWrapper>
            </FormBase>
          </FormWrapper>
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
      </PageWrapper>
    </PrivateRoute>
  )
}

/*---> Styles <---*/

export const PageWrapper = styled.div`
  /* border: solid red; */
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  min-height: calc((100vh) * 0.25);
`

export const PageTitle = styled.div`
  /* border: 1px solid green; */
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 30px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;
`

export const FormBase = styled.form`
  /* border: 1px solid red; */
`

export const FixedWrapper = styled.div`
  /* border: 1px solid red; */
  min-height: calc((100vh) * 0.8);
  display: flex;
  justify-content: center;
`

export const FormWrapper = styled.div`
  border: 1px solid #1399ff;
  width: 600px;
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

export const FieldWrapper = styled.div`
  /* border: 1px solid yellow; */
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

export const FieldInput = styled.input<{ invalid: boolean; type: string }>`
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

export const BodyInputWrapper = styled.div`
  /* border: 1px solid red; */
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  height: 127px;
  background-color: white;
`

export const BodyInput = styled.textarea<{ cols: any; invalid: boolean; type: string }>`
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

export const SubmitButtonWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
`

export const SubmitButton = styled(Button)`
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
  margin-top: 20px !important;
`

export const CancelButtonWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
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
