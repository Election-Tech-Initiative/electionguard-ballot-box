import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import BallotBoxContext from '../contexts/ballotBoxContext'
import { BallotBoxType } from '../config/types'
import Button from './Button'
import SplashMessage from './NotificationOverlay'

const Line = styled.hr`
  width: 100%;
`

const Display = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`

const Type = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0;
  min-width: 12rem;
  font-size: 7rem;
`

const BigText = styled.p`
  display: flex;
  justify-content: center;
  margin: 0;
  font-size: 9rem;
`

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
`
const splashTimeout = 1000

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function renderSplashMessage(type: BallotBoxType) {
  switch (type) {
    case BallotBoxType.Cast:
      return (
        <SplashMessage primary>
          <h1>✓ Thanks for casting your ballot!</h1>
        </SplashMessage>
      )
    case BallotBoxType.Spoil:
      return (
        <SplashMessage warning>
          <h1>Spoiled ballot received.</h1>
        </SplashMessage>
      )
    default:
      return (
        <SplashMessage danger>
          <h1>Error</h1>
        </SplashMessage>
      )
  }
}

const Counter = () => {
  const { type, count, setCount, isLiveMode } = useContext(BallotBoxContext)
  const [displayCount, setDisplayCount] = useState(false)
  const [displaySplash, setDisplaySplash] = useState(false)

  useEffect(() => {
    if (count) {
      setDisplaySplash(true)
      setTimeout(() => {
        setDisplaySplash(false)
      }, splashTimeout)
    }
  }, [count])

  return (
    <Display>
      {displaySplash ? renderSplashMessage(type) : <></>}
      <Container>
        <Type>{BallotBoxType[type]}</Type>
        {displayCount ? (
          <>
            <Line />
            <BigText>{formatNumber(count)}</BigText>
          </>
        ) : (
          <></>
        )}
      </Container>
      <ButtonBar>
        <Button small onPress={() => setDisplayCount(!displayCount)}>
          {displayCount ? 'Hide Count' : 'Display Count'}
        </Button>
        {!isLiveMode ? (
          <Button small onPress={() => setCount(count + 1)}>
            Insert Ballot
          </Button>
        ) : (
          <></>
        )}
      </ButtonBar>
    </Display>
  )
}

export default Counter
