import Head from 'next/head'
import React, { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import PageWrapper from '../components/Landing/PageWrapper'
import ConnectAccrossGlobe from '../components/Landing/ConnectAccrossGlobe'
import Footer from '../components/Footer/Footer'
import FindCoFounder from '../components/Landing/FindCoFounder'
import StudyWorkAbroad from '../components/Landing/StudyWorkAbroad'
import VisaImmigration from '../components/Landing/VisaImmigration'
import ExpandYourNetwork from '../components/Landing/ExpandYourNetwork'
import ReadyToDive from '../components/Landing/ReadyToDive'
import AskAboutAnything from '../components/Landing/AskAboutAnything'
import FindPeopleToHelp from '../components/Landing/FindPeopleToHelp'

import MenuCard from '../components/Landing/MenuCard'
import MenuCardOverlay from '../components/Landing/MenuCardOverlay'

export default function LandingPage() {
  const { showMenuCard } = useContext(MainContext)

  return (
    <>
      <PageWrapper>
        {showMenuCard ? (
          <MenuCardOverlay>
            <MenuCard />
          </MenuCardOverlay>
        ) : null}
        <ConnectAccrossGlobe />
        <AskAboutAnything />
        <FindPeopleToHelp />
        <ExpandYourNetwork />
        <FindCoFounder id='FindCoFounder' />
        <StudyWorkAbroad />
        <VisaImmigration />
        <ReadyToDive />
        <Footer />
      </PageWrapper>
    </>
  )
}
