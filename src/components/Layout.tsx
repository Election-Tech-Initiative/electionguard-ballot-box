import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import StartPage from '../pages/StartPage'
import NotFoundPage from '../pages/NotFoundPage'

const Layout = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/start" />
      <Redirect exact path="/index.html" to="/start" />
      <Route path="/start" exact component={StartPage} />
      <Route path="/:path" component={NotFoundPage} />
    </Switch>
  )
}

export default Layout
