import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/GlobalStyles'
import { MainContextProvider } from '../context/MainContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainContextProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </MainContextProvider>
  )
}
export default MyApp
