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
        {/* <HomePage /> */}
      </>
    )
  }

  return (
    <>
      <LandingPage />
    </>
  )
}

export default Index
