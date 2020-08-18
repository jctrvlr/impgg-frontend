import React from 'react';
import PropTypes from 'prop-types';

import { CardElement } from '@stripe/react-stripe-js';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import ErrorMessageHolder from '../../components/ErrorMessageHolder';

const useStyles = makeStyles(theme => ({
  billingSection: {
    margin: theme.spacing(2, 0),
  },
}));

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function CardSection({ retryPayment }) {
  const classes = useStyles();

  return (
    <div className={classes.billingSection}>
      <Typography variant="button">Credit Card Information</Typography>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <ErrorMessageHolder error={retryPayment} />
      </label>
    </div>
  );
}

CardSection.propTypes = {
  retryPayment: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CardSection;
