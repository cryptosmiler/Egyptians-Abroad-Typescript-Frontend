import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

/*---> Component <---*/
export default function Footer() {
  return (
    <Wrapper>
      <FooterWrapper>
        <FooterLogo>EgyptiansAbroad</FooterLogo>
        <LinksWrapper>
          <Link href='/test' passHref>
            <FooterLink>About</FooterLink>
          </Link>
          <Link href='/test' passHref>
            <FooterLink>Terms</FooterLink>
          </Link>
          <Link href='/test' passHref>
            <FooterLink>privacy</FooterLink>
          </Link>
          <Link href='/test' passHref>
            <FooterLink>contact</FooterLink>
          </Link>
        </LinksWrapper>
      </FooterWrapper>
    </Wrapper>
  )
}

/*---> Styles <---*/

export const Wrapper = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  background: #fafafa;
`

export const FooterWrapper = styled.div`
  /* border: 1px solid yellow; */
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 940px;
  padding: 20px 4px 20px 4px;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 1024px) {
    width: 86%;
  }

  @media (max-width: 900px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    width: 84%;
  }

  @media (max-width: 600px) {
    width: 83%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`

export const FooterLogo = styled.p`
  /* border: 1px solid yellow; */
  font-size: 25px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #9b9b9b;
`

export const LinksWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

export const FooterLink = styled.a`
  /* border: 1px solid yellow; */
  color: #9b9b9b;
  font-size: 12px;
  margin-left: 28px;

  :first-of-type {
    margin-left: 0px;
  }
`