import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axiosAPI from '../../api/axiosAPI'
// import GenericCard from '../Post/GenericCard'
import Button from '@material-ui/core/Button'
import Loader from 'react-loader-spinner'
import Link from 'next/link'

interface PropsType {
  avatarLink: string
}

/*---> Component <---*/
export default function ProfileBody({ avatarLink }: PropsType) {
  const [userPosts, setUserPosts] = useState([])
  const [userPostsCount, setUserPostsCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true)
        const userNewPosts = await axiosAPI.post.getMyUserPosts(limit, skip)
        const AllPosts = await axiosAPI.post.getMyUserPosts()
        setUserPosts(userPosts.concat(userNewPosts.data))
        setUserPostsCount(AllPosts.data.length)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    getPosts()
  }, [limit, skip])

  async function handleShowMore() {
    setSkip(skip + 10)
  }

  if (loading) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  if (userPostsCount === 0) {
    return (
      <ProfileBodyWrapper>
        <PostsTitle>My Posts</PostsTitle>
        <NoPostsWrapper>You do not have any posts yet !</NoPostsWrapper>
        <Link href='/home' passHref>
          <HomeButton variant='contained'>Back to Home</HomeButton>
        </Link>
      </ProfileBodyWrapper>
    )
  }

  return (
    <ProfileBodyWrapper>
      <PostsTitle>My Posts</PostsTitle>
      <PostsWrapper>
        {/* {userPosts?.map((item, index) => (
          <GenericCard
            key={index}
            src={avatarLink || '/images/avatar.png'}
            title={item.title}
            ownerId={item.owner}
            postId={item._id}
          />
        ))} */}
      </PostsWrapper>
      {userPosts.length < userPostsCount ? (
        <ShowMoreButton onClick={handleShowMore} variant='contained'>
          Show More
        </ShowMoreButton>
      ) : null}
      <Link href='/home' passHref>
        <HomeButton variant='contained'>Back to Home</HomeButton>
      </Link>
    </ProfileBodyWrapper>
  )
}

/*---> Styles <---*/
export const ProfileBodyWrapper = styled.div`
  /* border: solid red; */
  max-width: 460px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  min-height: calc((100vh) * 0.25);
`

export const PostsWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const PostsTitle = styled.div`
  /* border: 1px solid green; */
  font-size: 35px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;
`

export const ShowMoreButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 100% !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
`

export const HomeButton = styled(Button)`
  background: #f0f0f0 !important;
  width: 100% !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: #5a5a5a !important;
  font-size: 16px !important;
  margin-bottom: 70px !important;
  margin-top: 30px !important;
`

export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const NoPostsWrapper = styled.div`
  /* border: 1px solid green; */
  font-size: 18px;
  margin-top: 20px;
`
