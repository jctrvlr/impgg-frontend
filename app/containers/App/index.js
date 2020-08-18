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

// Public routes
import HomePage from 'containers/HomePage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import PricingPage from 'containers/PricingPage';
import TermsPage from 'containers/TermsPage';
import PrivacyPage from 'containers/PrivacyPage';
import ContactPage from 'containers/ContactPage';
import ResetPasswordPage from 'containers/ResetPasswordPage';

// Authentication routes
import SigninPage from 'containers/SigninPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import OAuthCallback from 'containers/OAuthCallback/Loadable';

// Protected routes
import DashboardPage from 'containers/DashboardPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import SecurityPage from 'containers/SecurityPage/Loadable';
import BillingPage from 'containers/BillingPage/Loadable';
import UpdateBillingPage from 'containers/UpdateBillingPage/Loadable';
import DomainsPage from 'containers/DomainsPage/Loadable';
import ReportsPage from 'containers/ReportsPage/Loadable';
import CheckoutFormPage from 'containers/CheckoutFormPage/Loadable';
import SorryPage from 'containers/SorryPage/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/pricing" component={PricingPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/terms" component={TermsPage} />
        <Route exact path="/privacy" component={PrivacyPage} />

        <Route exact path="/login" component={SigninPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/password/reset" component={ResetPasswordPage} />
        <Route exact path="/auth/callback/:service" component={OAuthCallback} />

        <PrivateRoute exact path="/sorry" component={SorryPage} />

        <PrivateRoute path="/dashboard" component={DashboardPage} />

        <Redirect exact from="/settings" to="/settings/profile" />
        <Redirect exact from="/profile" to="/settings/profile" />
        <PrivateRoute exact path="/settings/profile" component={ProfilePage} />
        <PrivateRoute
          exact
          path="/settings/security"
          component={SecurityPage}
        />
        <PrivateRoute exact path="/settings/billing" component={BillingPage} />
        <PrivateRoute
          exact
          path="/settings/billing/update"
          component={UpdateBillingPage}
        />

        <PrivateRoute exact path="/upgrade" component={CheckoutFormPage} />
        <PrivateRoute path="/domains" component={DomainsPage} />
        <PrivateRoute path="/reports" component={ReportsPage} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
