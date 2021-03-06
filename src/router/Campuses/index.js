import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PageBuilderConnected } from 'ui-connected';
import PageBuilder from '../../page-builder';

const PropertyMapper = ({
  match: {
    params: { name },
  },
}) => <PageBuilderConnected url={`locations/${name}`} />;

const LocationsPage = () => <PageBuilder title="locations" theme="swoop" />;

const Router = () => (
  <Switch>
    <Route exact path="/locations/:name" component={PropertyMapper} />

    <Route path="*" component={LocationsPage} />
  </Switch>
);

export default Router;
