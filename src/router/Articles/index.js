import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import { ArticleList, ArticleDetail } from '../../articles'

const Router = () => (
    <Switch>
        <Route exact path="/articles/:articleTitle" component={ArticleDetail} />

        <Route path="*" component={ArticleList} />
    </Switch>
)

export default Router