import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

/*---> Component <---*/
export default function ReadyToDive() {
  return (
    <Wrapper>
      <Title>Ready to Dive In ?</Title>
      <SubTitle>Get started now!</SubTitle>
      <SectionButtonWrapper>
        <Link href='/signup' passHref>
          <SectionButton
            variant='contained'
          >
            Get Started
          </SectionButton>
        </Link>
      </SectionButtonWrapper>
    </Wrapper>
  )
}

/*---> Styles <---*/
export const Wrapper = styled.div`
  border: 1px solid white;
  background-color: white;
`

export const Title = styled.p`
  /* border: 1px solid yellow; */
  font-size: 50px;
  font-weight: 800;
  letter-spacing: -1px;
  text-align: center;
  width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 90px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 32px;
    letter-spacing: -0.64px;
    width: 90%;
    margin-top: 65px;
    margin-bottom: 30px;
  }
`

export const SubTitle = styled.p`
  //   /* border: 1px solid yellow; */
  font-size: 50px;
  letter-spacing: -1px;
  text-align: center;
  color: #149bff;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 30px;
  font-weight: 900;

  @media (max-width: 1024px) {
    font-size: 32px;
    letter-spacing: -0.64px;
    width: 90%;
    margin-bottom: 30px;
  }
`

export const SectionButtonWrapper = styled.div`
  /* border: 1px solid red; */
  text-align: center;
  margin-bottom: 90px;
  width: 100%;
`

export const SectionButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 281px !important;
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
