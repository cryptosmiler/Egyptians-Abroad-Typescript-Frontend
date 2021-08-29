import { useState, useEffect, useContext } from 'react'
import axiosAPI from '../../api/axiosAPI'
import PostCard from '../../components/Post/PostCard'
import styled from 'styled-components'
import CommentsCard from '../../components/Post/CommentsCard'
import AddButton from '../../components/Home/AddButton'
import Loader from 'react-loader-spinner'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

interface ItemType {
  avatarLink: string
  owner: string
}

interface PostType {
  data: {
    _id: string
    title: string
    body: string
    owner: string
  }
}

interface CommentType {
  data: {
    avatarLink: string
    body: string
    owner: string
    map: (arg0: {}) => JSX.Element
  }
}

export default function PostPage() {
  const [postData, setPostData] = useState<PostType | null>(null)
  const [postAvatar, setPostAvatar] = useState<string | null>(null)
  const [commentsData, setCommentsData] = useState<CommentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    async function getPostDetails() {
      try {
        setLoading(true)
        const postId = window.location.href.split('/')[4]
        const post = await axiosAPI.post.getOnePost(postId)
        const user = await axiosAPI.user.getOtherUserInfo(post.data.owner)
        const avatar = user.data.avatar
          ? axiosAPI.user.getUserAvatar(user.data._id)
          : null
        const comments = await axiosAPI.comment.getPostComments(
          postId,
          limit,
          skip
        )
        comments.data.forEach((item: ItemType) => {
          const avatar = axiosAPI.user.getUserAvatar(item.owner)
          item.avatarLink = avatar
        })
        setPostData(post)
        setPostAvatar(avatar)
        setCommentsData(comments)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    getPostDetails()
  }, [limit, skip])

  if (loading) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <>
      <PostPageWrapper>
        <PostCard
          postId={postData!.data._id}
          title={postData!.data.title}
          body={postData!.data.body}
          src={postAvatar || '/images/avatar.png'}
          ownerId={postData!.data.owner}
        />
        <CommentsCard comments={commentsData!.data} />
        <Link href='/home' passHref>
          <HomeButton variant='contained'>Back to Home</HomeButton>
        </Link>
      </PostPageWrapper>
      <AddButton ButtonLink={`/comments/${postData!.data._id}/new`} />
    </>
  )
}

/*---> Styles <---*/
export const PostPageWrapper = styled.div`
  /* border: 1px solid red; */
  /* max-width: 460px; */
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  min-height: calc((100vh) * 0.72);
  margin-top: 40px;
`

export const PostsWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HomeButton = styled(Button)`
  background: #f0f0f0 !important;
  width: 460px !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: #5a5a5a !important;
  font-size: 16px !important;
  margin-bottom: 70px !important;
  margin-top: 30px !important;
`
