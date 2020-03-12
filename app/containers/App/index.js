/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'utils/PrivateRoute';

import CssBaseline from '@material-ui/core/CssBaseline';

import { useInjectReducer } from 'utils/injectReducer';

// Public routes
import HomePage from 'containers/HomePage/Loadable';
import PricingPage from 'containers/PricingPage';
import FeaturesPage from 'containers/FeaturesPage';
import TermsPage from 'containers/TermsPage';
import PrivacyPage from 'containers/PrivacyPage';
// Authentication routes
import SigninPage from 'containers/SigninPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

// Protected routes
import DashboardPage from 'containers/DashboardPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import SecurityPage from 'containers/SecurityPage/Loadable';

import DomainsPage from 'containers/DomainsPage/Loadable';
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
        <Route exact path="/terms" component={TermsPage} />
        <Route exact path="/privacy" component={PrivacyPage} />

        <Route exact path="/login" component={SigninPage} />
        <Route exact path="/register" component={RegisterPage} />

        <PrivateRoute exact path="/dashboard" component={DashboardPage} />

        <Redirect exact from="/settings" to="/settings/profile" />
        <Redirect exact from="/profile" to="/settings/profile" />
        <PrivateRoute exact path="/settings/profile" component={ProfilePage} />
        <PrivateRoute
          exact
          path="/settings/security"
          component={SecurityPage}
        />
        <PrivateRoute exact path="/domains" component={DomainsPage} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
