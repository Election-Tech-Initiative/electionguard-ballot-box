import React, { useContext } from 'react'
import styled from 'styled-components'
import BallotBoxContext from '../contexts/ballotBoxContext'
import { BallotBoxType } from '../config/types'

const Line = styled.hr`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`

const Count = styled.p`
  display: flex;
  justify-content: center;
  margin: 0;
  min-width: 12rem;
  font-size: 9rem;
`

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const Counter = () => {
  const { type, count } = useContext(BallotBoxContext)
  return (
    <Container>
      <h1>{BallotBoxType[type]}</h1>
      <Line />
      <Count>{formatNumber(count)}</Count>
    </Container>
  )
}

export default Counter
