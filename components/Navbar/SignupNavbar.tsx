import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { MainContext } from '../../context/MainContext'

/*---> Component <---*/
export default function SignNavbar() {
	const { setShowMenuCard } = useContext(MainContext)
  return (
    <NavbarWrapper>
      <LogoWrapper>
        <Link href='/'>
          <Logo onClick={() => setShowMenuCard!(false)}>EgyptiansAbroad</Logo>
        </Link>
      </LogoWrapper>
    </NavbarWrapper>
  )
}

/*---> Styles <---*/

export const NavbarWrapper = styled.div`
  /* border: 1px solid black; */
  height: 70px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const LogoWrapper = styled.div`
  /* border: 1px solid yellow; */
`

export const Logo = styled.p`
  /* border: 1px solid yellow; */
  font-size: 40px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;
	cursor: pointer;
`
