import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface PropsType {
  children: ReactNode
}

/*---> Component <---*/
function MenuCardOverlay({ children }: PropsType) {
  return <Wrapper>{children}</Wrapper>
}

/*---> Styles <---*/
export const Wrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(250, 250, 250, 0.3);
  z-index: 99;
`

export default MenuCardOverlay
