import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

/*---> Component <---*/
function MenuCard() {
  return (
    <>
      <Wrapper>
        <LinkWrapper>
          <Link href='/signup' passHref>
            <MenuLink>Network</MenuLink>
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href='/signup' passHref>
            <MenuLink>Ask Questions</MenuLink>
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href='/signup' passHref>
            <MenuLink>
              Answer Questions
            </MenuLink>
          </Link>
        </LinkWrapper>
        <ButtonsWrapper>
          <Link href='/login' passHref>
            <LoginButton variant='contained'>Login</LoginButton>
          </Link>
          <Link href='/signup' passHref>
            <SignupButton
              variant='contained'
            >
              Signup
            </SignupButton>
          </Link>
        </ButtonsWrapper>
      </Wrapper>
    </>
  )
}

/*---> Styles <---*/
const Wrapper = styled.div`
  /* border: 1px solid red; */
  background: white;
  width: 343px;
  height: 290px;
  padding: 31px 0 20px;
  border-radius: 21px;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 118px;
  z-index: 100;
`

export const LinkWrapper = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 32px;
`

export const MenuLink = styled.a`
  /* border: 1px solid yellow; */
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.44px;
  cursor: pointer;
`

export const ButtonsWrapper = styled.div`
  /* border: 1px solid yellow; */
`

export const SignupButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 142px !important;
  height: 38px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: white !important;
  font-size: 16px !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: normal !important;
  letter-spacing: normal !important;
  margin-left: 20px !important;
`

export const LoginButton = styled(Button)`
  background: #ececec !important;
  width: 142px !important;
  height: 38px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  font-size: 16px !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: normal !important;
  letter-spacing: normal !important;
`

export default MenuCard
