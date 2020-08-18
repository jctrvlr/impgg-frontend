import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  billingSection: {
    margin: theme.spacing(2, 0),
  },
}));

function BillingInfoSection({
  address,
  setAddress,
  phone,
  setPhone,
  names,
  setNames,
}) {
  const classes = useStyles();

  return (
    <div className={classes.billingSection}>
      <Typography variant="button" gutterBottom>
        Billing Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={names.firstName}
            onChange={e => {
              setNames({ ...names, firstName: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={names.lastName}
            onChange={e => {
              setNames({ ...names, lastName: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="tel"
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address-line1"
            name="line1"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            value={address.line1}
            onChange={e => {
              setAddress({
                ...address,
                line1: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={address.city}
            onChange={e => {
              setAddress({
                ...address,
                city: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={address.state}
            onChange={e => {
              setAddress({
                ...address,
                state: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={address.country}
            onChange={e => {
              setAddress({
                ...address,
                country: e.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
BillingInfoSection.propTypes = {
  address: PropTypes.object,
  setAddress: PropTypes.func,
  phone: PropTypes.string,
  setPhone: PropTypes.func,
  names: PropTypes.object,
  setNames: PropTypes.func,
};

export default BillingInfoSection;
