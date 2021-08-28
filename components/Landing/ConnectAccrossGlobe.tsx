import React, { useContext } from 'react'
import { MainContext } from '../../context/MainContext'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { PlaneAlt } from '@styled-icons/boxicons-solid'
import { Menu } from "@styled-icons/heroicons-solid/Menu"
import { Close } from "@styled-icons/evaicons-solid/Close"

/*---> Component <---*/
export default function ConnectAccrossGlobe() {
  const { showMenuCard, setShowMenuCard } = useContext(MainContext)

  function hanldeMenuIconClick() {
    setShowMenuCard!(!showMenuCard)
  }

  return (
    <Wrapper>
      <FixedWrapper>
        <NavbarWrapper>
          <LogoWrapper>
            <Logo>EgyptiansAbroad</Logo>
          </LogoWrapper>
          <LinksWrapper>
            <Link href='/signup' passHref>
              <NavbarLink>
                Networking
              </NavbarLink>
            </Link>
            <Link href='/signup' passHref>
              <NavbarLink>
                Ask Questions
              </NavbarLink>
            </Link>
            <Link href='/signup' passHref>
              <NavbarLink>
                Answer Questions
              </NavbarLink>
            </Link>
          </LinksWrapper>
          <ButtonsWrapper>
            <Link href='/login' passHref>
              <LoginButton
                variant='contained'
              >
                Login
              </LoginButton>
            </Link>
            <Link href='/signup' passHref>
              <SignupButton
                variant='contained'
              >
                Sign Up
              </SignupButton>
            </Link>
          </ButtonsWrapper>
          {showMenuCard ? (
            <CloseIcon onClick={hanldeMenuIconClick} />
          ) : (
            <MobileMenuIcon onClick={hanldeMenuIconClick} />
          )}
        </NavbarWrapper>
      </FixedWrapper>

      <MainContent>
        <TextWrapper>
          <Title>Better Connect Egyptians Accross The Globe</Title>
          <SubTitle>
            There are more than <span>10 million</span> overseas egyptians
            living abroad! and they are eager to help other egyptians.{' '}
            <span>Connect now</span>, expand your social and professional
            network, ask anything you want to ask and get answers from egyptians{' '}
            <span>all over the world</span>.
          </SubTitle>
          <SectionButtonWrapper>
            <Link href='/signup' passHref>
              <SectionButton
                variant='contained'
              >
                Connect Now
              </SectionButton>
            </Link>
          </SectionButtonWrapper>
          <Link href='/login' passHref>
            <LoginLinkWrapper>
              Already have account ?{' '}
              <Link href='/login' passHref>
                <LoginLink>
                  Login
                </LoginLink>
              </Link>
            </LoginLinkWrapper>
          </Link>
        </TextWrapper>
        <PlaneImage />
      </MainContent>
    </Wrapper>
  )
}

/*---> Styles <---*/
export const Wrapper = styled.div`
  /* border: 1px solid red; */
  max-width: 1534px;
  margin-right: auto;
  margin-left: auto;
  background-color: #fafafa;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 100px auto;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`

export const MainContent = styled.div`
  /* border: 1px solid black; */
  display: flex;
  grid-column: 2/4;
  grid-row: 2/2;
  width: 100%;
  margin-bottom: 100px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }
`

export const TextWrapper = styled.div`
  /* border: 1px solid pink; */
  margin-top: 100px;
  padding-left: 15px;
  width: 50%;

  @media (min-width: 1470px) {
    padding-left: 25px;
  }

  /* @media (max-width: 1200px) {
    padding-left: 15px;
  } */

  @media (max-width: 1024px) {
    margin-top: 64px;
    margin-bottom: 25px;
    width: 93%;
    padding-left: initial;
  }
`

export const Title = styled.p`
  /* border: 1px solid yellow; */
  font-size: 50px;
  font-weight: 800;
  letter-spacing: -1px;
  text-align: left;
  margin-bottom: 16px;
  width: 120%;

  @media (max-width: 1024px) {
    font-size: 32px;
    letter-spacing: -0.64px;
    width: 100%;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 28px;
  }
`

export const SubTitle = styled.p`
  /* border: 1px solid green; */
  font-size: 20px;
  font-weight: 500;
  line-height: 1.45;
  text-align: left;
  width: 590px;
  margin-bottom: 30px;

  span {
    font-weight: 900;
  }

  @media (max-width: 1024px) {
    text-align: center;
    font-size: 18px;
    line-height: 1.61;
    margin-bottom: 35px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`

export const SectionButtonWrapper = styled.div`
  /* border: 1px solid red; */
  text-align: left;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    margin-bottom: 12px;
    text-align: center;
  }
`

export const SectionButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 295px !important;
  height: 46px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: normal !important;
  letter-spacing: normal !important;
`

export const LoginLinkWrapper = styled.div`
  /* border: 1px solid red; */
  font-size: 14x;

  @media (max-width: 1024px) {
    text-align: center;
  }
`

export const LoginLink = styled.a`
  /* border: 1px solid red; */
  text-decoration: underline;
`

export const PlaneImage = styled(PlaneAlt)`
  /* border: 1px solid red; */
  width: 400px;
  height: 400px;

  /* fill: #00401a; */

  fill: #56da19;
  opacity: 0.3;

  @media (max-width: 1500px) {
    margin-left: 5%;
  }

  @media (max-width: 1150px) {
    margin-left: 8%;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

export const FixedWrapper = styled.div`
  /* border: 1px solid black; */
  width: 980px;
  grid-column: 2/3;
  grid-row: 1/2;

  @media (max-width: 1024px) {
    width: 92%;
  }
`

export const NavbarWrapper = styled.div`
  /* border: 1px solid black; */
  height: 70px;
  width: 980px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
  border-radius: 21px;
  padding: 16px 18px 16px 15px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.05);
  background-color: rgba(255, 255, 255, 0.8);
  @-moz-document url-prefix() {
    background-color: white;
  }
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;

  grid-column: 2/3;
  grid-row: 1/2;

  position: fixed;
  top: 0;

  @media (min-width: 1500px) {
    margin-left: 20px;
  }

  @media (max-width: 1024px) {
    width: 92%;
    left: 4%;
  }
`

export const LogoWrapper = styled.div`
  /* border: 1px solid yellow; */
`

export const Logo = styled.p`
  /* border: 1px solid yellow; */
  font-size: 30px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;
`

export const LinksWrapper = styled.div`
  /* border: 1px solid red; */
  width: 50%;

  @media (max-width: 1024px) {
    display: none;
  }
`

export const NavbarLink = styled.a`
  margin-right: 45px;
  font-size: 17x;
  font-weight: 600;
  cursor: pointer;
`

export const ButtonsWrapper = styled.div`
  /* border: 1px solid yellow; */
  @media (max-width: 1024px) {
    display: none;
  }
`

export const SignupButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 100px !important;
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
  width: 100px !important;
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

export const MobileMenuIcon = styled(Menu)`
  width: 30px;
  cursor: pointer;

  @media (min-width: 1025px) {
    display: none;
  }
`

export const CloseIcon = styled(Close)`
  width: 40px;
  cursor: pointer;

  @media (min-width: 1025px) {
    display: none;
  }
`
