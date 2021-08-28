import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import LandingPage from '../pages/landing'
// import HomePage from '../pages/home'

const Index: NextPage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('EgAbroadToken')
    if (token) {
      setUserLoggedIn(true)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <></>
  }

  if (userLoggedIn) {
    return (
      <>
        <Head>
          <title>Egyptians Abroad</title>
          <meta
            name='description'
            content='website to connect egyptians abroad and answer their questions'
          />
          <link rel='icon' href='/favicon.ico' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        {/* <HomePage /> */}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Egyptians Abroad</title>
        <meta
          name='description'
          content='website to connect egyptians abroad and answer their questions'
        />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <LandingPage />
    </>
  )
}

export default Index
