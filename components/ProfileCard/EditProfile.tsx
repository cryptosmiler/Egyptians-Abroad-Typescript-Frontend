import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { MainContext } from '../../context/MainContext'

/*---> Component <---*/
export default function EditProfile() {
  const [iconColor, setIconColor] = useState('blue')
  const { showProfileCard, setShowProfileCard } = useContext(MainContext)

  function handleHover() {
    iconColor === 'blue' ? setIconColor('white') : setIconColor('blue')
  }

  return (
    <Link href='/profile-update'>
      <Wrapper
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleHover()}
        onClick={() => setShowProfileCard!(false)}
      >
        <Image
          src={`/images/profile-card/edit-profile-${iconColor}.svg`}
          alt='Edit logo'
        />
        <Text>Edit Profile</Text>
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
