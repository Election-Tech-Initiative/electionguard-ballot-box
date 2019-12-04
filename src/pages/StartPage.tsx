import React, { useContext } from 'react'
import styled from 'styled-components'
import ElectionContext from '../contexts/ballotBoxContext'
import { BallotBoxType } from '../config/types'
import TypeChooser from '../components/TypeChooser'
import Counter from '../components/Counter'

const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const LogoImage = styled.img`
  position: absolute;
  top: 0;
  margin-top: 1rem;
  width: 18 rem;
`

const StartPage = () => {
  const { type, eject } = useContext(ElectionContext)

  const renderCurrentView = () => {
    switch (type) {
      case BallotBoxType.Unset:
        return <TypeChooser />
      case BallotBoxType.Cast:
      case BallotBoxType.Spoil:
        return <Counter />
      default:
        return <h1>Error</h1>
    }
  }

  return (
    <Display>
      {renderCurrentView()}
      <LogoImage
        onClick={() => eject()}
        alt="Election Guard Logo"
        src="/images/rock-county-wisconsin-logo.png"
      />
    </Display>
  )
}

export default StartPage
