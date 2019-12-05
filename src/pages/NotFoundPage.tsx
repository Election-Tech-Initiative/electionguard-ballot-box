import React, { useContext } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import ElectionContext from '../contexts/ballotBoxContext'
import Button from '../components/Button'

const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const NotFoundPage = (props: RouteComponentProps) => {
  const { reset } = useContext(ElectionContext)
  const { pathname } = props.location
  return (
    <Display>
      <h1>Page Not Found.</h1>
      <p>
        No page exists at <code>{pathname}</code>.
      </p>
      <p>
        <Button onPress={() => reset()}>Start Over</Button>
      </p>
    </Display>
  )
}

export default NotFoundPage
