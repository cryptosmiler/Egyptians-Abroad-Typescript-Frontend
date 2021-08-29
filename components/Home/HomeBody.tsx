import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axiosAPI from '../../api/axiosAPI'
import GenericCard from '../Post/GenericCard'
import Button from '@material-ui/core/Button'
import Loader from 'react-loader-spinner'

interface ItemType {
  avatarLink: string
  owner: string
  _id: string
  title: string
}

/*---> Component <---*/
export default function HomeBody() {
  const [allPosts, setAllPosts] = useState([])
  const [totalPostsCount, setTotalPostsCount] = useState(0)
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
		async function getPosts() {
			try {
        setLoading(true)
        const totalPosts = await axiosAPI.post.getAllPosts()
        const allNewPosts = await axiosAPI.post.getAllPosts(limit, skip)
        const arr = allPosts.concat(allNewPosts.data)

        arr.forEach((item: ItemType) => {
          const avatar = axiosAPI.user.getUserAvatar(item.owner)
          item.avatarLink = avatar
        })
        setAllPosts(arr)
        setTotalPostsCount(totalPosts.data.length)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
		}
    getPosts()
  }, [limit, skip])

  function handleShowMore() {
    setSkip(skip + 20)
  }

  if (loading) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <ProfileBodyWrapper>
      <PostsTitle>All Posts</PostsTitle>
      <PostsWrapper>
        {allPosts.map((item: ItemType, index) => (
          <GenericCard
            key={index}
            ownerId={item.owner}
            postId={item._id}
            title={item.title}
            src={item.avatarLink}
          />
        ))}
      </PostsWrapper>
      {allPosts.length < totalPostsCount ? (
        <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
      ) : null}
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
  width: 125px !important;
  height: 36px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
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
