import React from 'react'
import {
    Switch, Route
} from 'react-router-dom'

import DefaultPage, { UIPage } from '../components/Page'
import HomePage from './Home'
import Login from './Login'
import Events from './Events'
import Articles from './Articles'
import Animations from './Animations'

const Router = () => (
    <Switch>
        <Route exact path="/animations" component={Animations} />

        <Route exact path="/ui" component={UIPage} />

        <Route path="/login" component={Login} />
        <Route path="/events" component={Events} />
        <Route path="/articles" component={Articles} />

        <Route exact path="/:page" component={DefaultPage} />

        <Route path="*" component={HomePage} />
    </Switch>
)

export default Router