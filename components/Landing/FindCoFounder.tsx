import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import { Rocket } from "@styled-icons/ionicons-sharp/Rocket"

/*---> Component <---*/
export default function FindCoFounder() {
  return (
    <Wrapper>
      <Title>
        Find a business partner, startup co-founder and investments{' '}
        <RocketIcon />
      </Title>
      <SubTitle>
        Looking for a business partner or startup co-founder?
        <br />
        Looking for investment for your business or investment opportunities?
        <br />
        Find people who are interested about what you are doing and willing to
        do business with you.
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
    </Wrapper>
  )
}

/*---> Styles <---*/
export const Wrapper = styled.div`
  border: 1px solid #fafafa;
  background-color: #fafafa;
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
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 32px;
    letter-spacing: -0.64px;
    width: 90%;
    margin-top: 65px;
    margin-bottom: 30px;
  }
`

export const RocketIcon = styled(Rocket)`
  /* border: 1px solid red; */
  width: 100px;
  height: 100px;

  /* fill: #00401a; */

  fill: #56da19;
  opacity: 0.3;

  @media (max-width: 1024px) {
    width: 70px;
    height: 70px;
  }
`

export const SubTitle = styled.p`
  /* border: 1px solid yellow; */
  font-size: 20px;
  font-weight: 500;
  line-height: 1.45;
  text-align: center;
  width: 590px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 1.61;
    margin-bottom: 35px;
  }

  @media (max-width: 660px) {
    width: 83%;
  }
`

export const SectionButtonWrapper = styled.div`
  /* border: 1px solid red; */
  text-align: center;
  margin-bottom: 90px;
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
