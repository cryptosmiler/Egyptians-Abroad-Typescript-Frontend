import React, { useContext, ReactNode } from 'react'
import { MainContext } from '../../context/MainContext'
import styled from 'styled-components'

interface PropsType {
  children: ReactNode
}

/*---> Component <---*/
export default function ProfileCardWrapper({ children }: PropsType) {
  const { showProfileCard, setShowProfileCard } = useContext(MainContext)

  return <>{showProfileCard ? <Wrapper>{children}</Wrapper> : null}</>
}

/*---> Styles <---*/
const Wrapper = styled.div`
  /* border: 1px solid red; */
  background: white;
  border-radius: 22.5px;
  box-shadow: 0 13px 20px 0 rgba(0, 0, 0, 0.05);
  width: 175px;
  /* height: 115px; */
  margin-top: 15px;
  margin-bottom: -130px;
  padding: 12px;
  z-index: 100;

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
    left: 48%;
  }
`
