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
import PrivateRoute from 'utils/PrivateRoute';

import CssBaseline from '@material-ui/core/CssBaseline';

import { useInjectReducer } from 'utils/injectReducer';

// Public routes
import HomePage from 'containers/HomePage/Loadable';
import PricingPage from 'containers/PricingPage';
import FeaturesPage from 'containers/FeaturesPage';

// Authentication routes
import SigninPage from 'containers/SigninPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

// Protected routes
import DashboardPage from 'containers/DashboardPage/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import reducer from './reducer';

import GlobalStyle from '../../global-styles';

export default function App() {
  useInjectReducer({ key: 'App', reducer });
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pricing" component={PricingPage} />
        <Route exact path="/features" component={FeaturesPage} />

        <Route exact path="/login" component={SigninPage} />
        <Route exact path="/register" component={RegisterPage} />

        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
