import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { MainContext } from '../../context/MainContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axiosAPI from '../../api/axiosAPI'

/*---> Component <---*/
export default function Logout() {
  const router = useRouter()
  const [iconColor, setIconColor] = useState('blue')
  const { showProfileCard, setShowProfileCard } = useContext(MainContext)

  function handleHover() {
    iconColor === 'blue' ? setIconColor('white') : setIconColor('blue')
  }

  async function handleSignout() {
		try {
			await axiosAPI.user.logout()
			await localStorage.removeItem('EgAbroadToken')
			window.location.replace('/')
		} catch(e) {
			console.log(e)
		}
  }

  return (
    <Link href='#'>
      <Wrapper
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleHover()}
        onClick={handleSignout}
      >
        <Image
          src={`/images/profile-card/logout-${iconColor}.svg`}
          alt='logout logo'
        />
        <Text>Logout</Text>
      </Wrapper>
    </Link>
  )
}

/*---> Styles <---*/
export const Text = styled.p`
  /* border: solid red; */
  font-weight: 600;
  font-size: 16px;
`
export const Wrapper = styled.div`
  /* border: solid red; */
  display: flex;
  align-items: center;
  padding: 20px 10px 20px 20px;
  border-radius: 19px;
  height: 12px;
  cursor: pointer;

  :hover {
    background-color: #149bff;
    color: white;
  }
`
export const Image = styled.img`
  /* border: solid red; */
  width: 15px;
  height: 15px;
  margin-right: 15px;
`


