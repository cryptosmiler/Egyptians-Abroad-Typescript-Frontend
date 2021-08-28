import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import ProfileCardCompound from '../../components/ProfileCard/ProfileCardCompound'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { MainContext } from '../../context/MainContext'

interface PropsType {
  userProfile: {
    data: {
      name: string
    }
  }
  avatarLink: string
}

/*---> Component <---*/
export default function HomeNavbar({ userProfile, avatarLink }: PropsType) {
  const { showProfileCard, setShowProfileCard } = useContext(MainContext)

  function handleClickAway() {
    setShowProfileCard!(false)
  }

  function handleProfileClick() {
    setShowProfileCard!(!showProfileCard)
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <NavbarWrapper>
          <LogoWrapper>
            <Link href='/'>
              <LogoIcon>EgyptiansAbroad</LogoIcon>
            </Link>
          </LogoWrapper>
          <UserInfoWrapper>
            <LinksWrapper onClick={handleProfileClick}>
              <UsernameWrapper>
                <Username>{userProfile?.data.name}</Username>
              </UsernameWrapper>
              <AvatarWrapper>
                <Avatar
                  src={avatarLink || '/images/avatar.png'}
                  alt='small avatar'
                />
              </AvatarWrapper>
            </LinksWrapper>
            <ProfileCardCompound />
          </UserInfoWrapper>
        </NavbarWrapper>
      </ClickAwayListener>
    </>
  )
}

/*---> Styles <---*/
export const NavbarWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 940px;
  padding: 20px 10px 20px 10px;
  margin: auto;
`

export const LogoWrapper = styled.div`
  /* border: 1px solid yellow; */
  cursor: pointer;
`

export const LogoIcon = styled.p`
  /* border: 1px solid yellow; */
  font-size: 30px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;

  @media (max-width: 550px) {
    font-size: 25px;
  }
`

export const UserInfoWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 45px;
`

export const LinksWrapper = styled.div`
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 175px;
`

export const UsernameWrapper = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Username = styled.p`
  font-weight: bold;
  font-size: 16px;
  font-weight: 600;
  color: #363636;
  margin-right: 5px;
`

export const AvatarWrapper = styled.div`
  /* border: 1px solid yellow; */
`

export const Avatar = styled.img`
  width: 42px;
  height: 42px;
  cursor: pointer;
  border-radius: 50%;
`
