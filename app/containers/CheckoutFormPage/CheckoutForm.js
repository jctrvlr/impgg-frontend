import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';

import CardSection from './CardSection';
import BillingInfoSection from './BillingInfoSection';

const useStyles = makeStyles(theme => ({
  confirmButton: {
    margin: theme.spacing(4),
  },
  paymentDescription: {
    marginTop: theme.spacing(4),
  },
  buttonContainer: {
    float: 'right',
  },
}));

// TODO: Create createSubcription function passing the customer, payment method, and price IDs to a backend endpoint.
// Some payment
export default function CheckoutForm({
  retryInvoiceWithNewPaymentMethod,
  retryPayment,
  createSubscription,
  loading,
  setPaymentMethodId,
  setInvoiceId,
  userData,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();

  const [names, setNames] = useState({
    firstName: '',
    lastName: '',
  });

  const [address, setAddress] = useState({
    city: '',
    country: '',
    state: '',
    line1: '',
    postal_code: '',
  });

  const [phone, setPhone] = useState('');

  const handleSubmit = async event => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // If a previous payment was attempted, get the lastest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      'latestInvoicePaymentIntentStatus',
    );

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: names.firstName + names.lastName,
        phone,
        address,
        email: userData.user.email,
      },
    });

    if (error) {
      console.log('[createPaymentMethod error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const paymentMethodId = paymentMethod.id;
      setPaymentMethodId(paymentMethodId);
      if (
        retryPayment &&
        latestInvoicePaymentIntentStatus === 'requires_payment_method'
      ) {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem('latestInvoiceId');
        setInvoiceId(invoiceId);
        retryInvoiceWithNewPaymentMethod();
      } else {
        // Create the subscription
        createSubscription();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <BillingInfoSection
        setPhone={setPhone}
        phone={phone}
        setAddress={setAddress}
        address={address}
        setNames={setNames}
        names={names}
      />
      <CardSection retryPayment={retryPayment} />
      <div className={classes.paymentDescription}>
        <Typography variant="caption">
          {`By clicking "Complete Purchase", you agree to ImpGG's `}
          <Link to="/terms" color="textSecondary" component={RouterLink}>
            Terms of Service
          </Link>
          {' and acknowledge our '}
          <Link to="/privacy" color="textSecondary" component={RouterLink}>
            Privacy Policy
          </Link>
          {
            ' applies. Your payment method will be saved for future purchases, and, if applicable, recurring subscription payments.'
          }
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <span>
          <LockIcon /> Secure
        </span>
        <Button
          className={classes.confirmButton}
          variant="contained"
          type="submit"
          disabled={!stripe || loading}
          color="primary"
        >
          Complete Purchase
        </Button>
      </div>
    </form>
  );
}

CheckoutForm.propTypes = {
  retryInvoiceWithNewPaymentMethod: PropTypes.func,
  createSubscription: PropTypes.func,
  loading: PropTypes.bool,
  retryPayment: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setInvoiceId: PropTypes.func,
  setPaymentMethodId: PropTypes.func,
  userData: PropTypes.object,
};
