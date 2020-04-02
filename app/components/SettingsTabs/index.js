/**
 *
 * SettingsTabs
 *
 */

import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LinkTab(props) {
  return <Tab component={RouterLink} {...props} />;
}

function SettingsTabs({ tabValue }) {
  return (
    <AppBar position="static" component="div">
      <Tabs variant="fullWidth" aria-label="nav tabs example" value={tabValue}>
        <LinkTab
          label={<FormattedMessage {...messages.profile} />}
          to="/settings/profile"
        />
        <LinkTab
          label={<FormattedMessage {...messages.security} />}
          to="/settings/security"
        />
        <LinkTab
          label={<FormattedMessage {...messages.subscription} />}
          to="/settings/billing"
        />
      </Tabs>
    </AppBar>
  );
}

SettingsTabs.propTypes = {
  tabValue: PropTypes.number,
};

export default memo(SettingsTabs);
