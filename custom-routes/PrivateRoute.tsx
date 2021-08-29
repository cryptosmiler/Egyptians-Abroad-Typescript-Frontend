import React, { useState, useEffect, ReactNode } from 'react'
import router from 'next/router'

interface PropsType {
  children: ReactNode
}

/*---> Component <---*/
export default function PrivateRoute({ children }: PropsType) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('EgAbroadToken')
    if (token) {
      setUserLoggedIn(true)
    } else {
      router.replace('/')
    }
  }, [])

  return <>{userLoggedIn ? children : null}</>
}


