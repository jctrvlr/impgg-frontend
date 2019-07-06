/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from 'containers/HomePage/Loadable';

import PricingPage from 'containers/PricingPage';

import SigninPage from 'containers/SigninPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pricing" component={PricingPage} />

        <Route exact path="/login" component={SigninPage} />
        <Route exact path="/register" component={RegisterPage} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
