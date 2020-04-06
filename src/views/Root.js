import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Favorites from './Favorites';
import { routes } from '../routes';
import MainTemplate from '../templates/MainTemplate';
import DataProvider from '../context/DataContext';

const Root = () => (
  <DataProvider>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} render={() => <Redirect to="/main" />} />
          <Route exact path={routes.main} component={Home} />
          <Route exact path={routes.favorites} component={Favorites} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </DataProvider>
);

export default Root;
