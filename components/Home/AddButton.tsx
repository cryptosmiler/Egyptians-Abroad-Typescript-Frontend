import React, { useContext } from 'react'
import { MainContext } from '../../context/MainContext'
import styled from 'styled-components'
import Link from 'next/link'

interface PropsType {
  ButtonLink: string
}

/*---> Component <---*/
export default function AddButton({ ButtonLink }: PropsType) {
  const { showProfileCard, setShowProfileCard } = useContext(MainContext)

  function handleClick() {
    setShowProfileCard!(false)
  }

  return (
    <Link href={ButtonLink}>
      <PlusWrapper onClick={handleClick}>
        <PlusImage src='/images/open.svg' alt='Plus Icon' />
      </PlusWrapper>
    </Link>
  )
}

/*---> Styles <---*/

export const PlusWrapper = styled.div`
  box-shadow: 4px 4px 16px 0 rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(to bottom, #2bc9ff, #1399ff 100%);
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 20px 20px 20px 20px;
  display: flex;
  justify-content: center;
  margin-left: 130px;
  margin-top: 200px;

  position: fixed;
  bottom: 50px;
  left: 70%;

  @media (max-width: 700px) {
    left: 65%;
  }

  @media (max-width: 600px) {
    left: 60%;
  }

  @media (max-width: 520px) {
    left: 55%;
  }

  @media (max-width: 480px) {
    left: 50%;
  }

  @media (max-width: 420px) {
    left: 45%;
  }
`

export const PlusImage = styled.img`
  transform: rotate(45deg);
  width: 35px;
  outline: none;
`


