import React, { useContext } from 'react'
import styled from 'styled-components'
import BallotBoxContext from '../contexts/ballotBoxContext'
import { BallotBoxType } from '../config/types'
import Button from './Button'
import { Wobble } from './Animations'

const Line = styled.hr`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  > * {
    margin: 1rem;
  }
`

const TypeChooser = () => {
  const { setType } = useContext(BallotBoxContext)
  return (
    <Container>
      <h1>Ballot Box</h1>
      <Line />
      <p>Select Ballot Box Type</p>
      <ButtonOptions>
        <Wobble>
          <Button
            primary
            big
            onPress={() => setType(BallotBoxType.Cast)}
            aria-label="Select cast as ballot box type"
          >
            {BallotBoxType[BallotBoxType.Cast]}
          </Button>
        </Wobble>
        <Wobble>
          <Button
            primary
            big
            onPress={() => setType(BallotBoxType.Spoil)}
            aria-label="Select spoil as ballot box type"
          >
            {BallotBoxType[BallotBoxType.Spoil]}
          </Button>
        </Wobble>
      </ButtonOptions>
    </Container>
  )
}

export default TypeChooser
