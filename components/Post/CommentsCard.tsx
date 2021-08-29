import styled from 'styled-components'
import Link from 'next/link'

interface PropsType {
  comments: {
    avatarLink: string
    body: string
    owner: string
    map: (arg0: {}) => JSX.Element
  }
}

interface ItemType {
  avatarLink: string
  body: string
  owner: string
}

/*---> Component <---*/
export default function CommentsCard({ comments }: PropsType) {

  function isValidImage(url: string) {
    let image = new Image()
    image.src = url
    if (image.width > 0 || image.height > 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <CommentsCardWrapper>
      <CommentsTitle>Comments</CommentsTitle>
      {comments.map((item: ItemType, index: number) => (
        <CommentWrapper key={index}>
          <Link href={`/public-profile/${item.owner}`}>
            <ImageWrapper>
              <GenericImage
                src={
                  isValidImage(item.avatarLink)
                    ? item.avatarLink
                    : '/images/avatar.png'
                }
              />
            </ImageWrapper>
          </Link>
          <CommentTextWrapper>{item.body}</CommentTextWrapper>
        </CommentWrapper>
      ))}
    </CommentsCardWrapper>
  )
}

/*---> Styles <---*/

export const CommentsCardWrapper = styled.div`
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

export const CommentsTitle = styled.div`
  /* border: 1px solid green; */
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  /* margin-bottom: 20px; */
  font-size: 30px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;
`

export const CommentWrapper = styled.div`
  /* border: 1px solid green; */
  border-bottom: 1px solid gray;
  padding: 20px 0px;
  display: flex;
`

export const ImageWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  /* align-items: center; */
`

export const GenericImage = styled.img`
  /* border: 1px solid yellow; */
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 12px;
`

export const CommentTextWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  word-break: break-word;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`
