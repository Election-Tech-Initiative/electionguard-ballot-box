import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import ElectionContext from '../contexts/ballotBoxContext'

import Button from '../components/Button'

const NotFoundPage = (props: RouteComponentProps) => {
  const { reset } = useContext(ElectionContext)
  const { pathname } = props.location
  return (
    <div>
      <h1>Page Not Found.</h1>
      <p>
        No page exists at <code>{pathname}</code>.
      </p>
      <p>
        <Button onPress={() => reset()}>Start Over</Button>
      </p>
    </div>
  )
}

export default NotFoundPage
