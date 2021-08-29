import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface PropsType {
  src: string
  title: string
	body: string
	postId: string
	ownerId: string
}


/*---> Component <---*/
export default function PostCard({ src, title, body, postId, ownerId }: PropsType) {
  return (
    <Link href={`/posts/${postId}`}>
      <PostWrapper>
        <PostTitleWrapper>
          <Link href={`/public-profile/${ownerId}`}>
            <ImageWrapper>
              <GenericImage src={src} />
            </ImageWrapper>
          </Link>
          <TitleTextWrapper>{title}</TitleTextWrapper>
        </PostTitleWrapper>
        <BodyTextWrapper>{body}</BodyTextWrapper>
      </PostWrapper>
    </Link>
  )
}




/*---> Styles <---*/

export const PostWrapper = styled.div`
  /* border: 1px solid green; */
  width: 100%;
  background-color: white;
  border-radius: 18px;
  margin-bottom: 20px;
  padding: 20px;
  width: 700px;
  margin-bottom: 40px;
  cursor: pointer;

  @media (max-width: 500px) {
    width: 90%;
  }
`

export const PostTitleWrapper = styled.div`
  /* border: 1px solid green; */
  border-bottom: 1px solid gray;
  display: flex;
  padding-bottom: 20px;
`

export const ImageWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
`

export const GenericImage = styled.img`
  /* border: 1px solid yellow; */
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 12px;
`

export const TitleTextWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 5px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  word-break: break-word;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`

export const BodyTextWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  margin-top: 20px;
`