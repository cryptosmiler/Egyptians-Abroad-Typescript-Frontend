import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

body {
  padding: 0;
	margin: 0;
	margin: auto;
	/* font-family: 'Caveat', cursive; */
  font-family: Segoe -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
	Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	background-color: #fafafa;
	touch-action: manipulation;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
	outline: none !important;
	-webkit-tap-highlight-color: transparent;
	user-select: none;
}
`

export default GlobalStyles
