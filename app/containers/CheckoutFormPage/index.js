/* eslint-disable no-unused-vars */
/**
 *
 * CheckoutFormPage
 *
 */

import React, { memo, useEffect } from 'react';
import { push } from 'connected-react-router';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useStripe } from '@stripe/react-stripe-js';

import { useSnackbar } from 'notistack';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import makeSelectCheckoutFormPage, {
  makeSelectPriceNumber,
  makeSelectPriceId,
  makeSelectSubscription,
  makeSelectLoading,
  makeSelectRequiresAction,
  makeSelectRetryPayment,
  makeSelectInvoice,
  makeSelectSetPrice,
} from './selectors';

import {
  changePriceNumber,
  setPrice,
  changePaymentMethodId,
  changeInvoiceId,
  createSubscription,
  authenticationFailure,
  authenticationSuccess,
  createSubscriptionRetryPayment,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import Header from './Header';

import PriceInput from './PriceInput';
import CheckoutForm from './CheckoutForm';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
  checkoutSection: {
    flexGrow: '1',
    flexBasis: '100%',
    padding: theme.spacing(5),
  },
  divider: {
    margin: theme.spacing(5),
    flexGrow: '1',
    flexBasis: '100%',
  },
  sectionHeader: {
    marginBottom: theme.spacing(2),
  },
  subscriptionFloatRight: {
    textAlign: 'right',
  },
  containerTax: {
    marginTop: theme.spacing(1),
  },
}));

export function CheckoutFormPage({
  onChangePriceNumber,
  onChangePriceNumberClick,
  onSetPrice,
  setPriceBool,
  priceNumber,
  userData,
  subscription,
  onSubscribe,
  requiresAction,
  retryPayment,
  priceId,
  customerId,
  paymentMethodId,
  onAuthenticationFailure,
  onAuthenticationSuccess,
  invoiceId,
  invoice,
  loading,
  setPaymentMethodId,
  callCreateSubscription,
  setInvoiceId,
  callRetryPayment,
}) {
  useInjectReducer({ key: 'checkoutFormPage', reducer });
  useInjectSaga({ key: 'checkoutFormPage', saga });

  const stripe = useStripe();

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // eslint-disable-next-line consistent-return
  const onRequiresAction = () => {
    const paymentIntent = invoice
      ? invoice.payment_intent
      : subscription.latest_invoice.payment_intent;

    if (
      paymentIntent.status === 'requires_action' ||
      (requiresAction === true &&
        paymentIntent.status === 'requires_payment_method')
    ) {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then(result => {
          if (result.error) {
            // start code flow to handle updating the payment details
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            onAuthenticationFailure();
          } else if (result.paymentIntent.status === 'succeeded') {
            setTimeout(() => onAuthenticationSuccess(), 5000);
          }
        });
    }
  };

  useEffect(() => {
    if (
      userData.user.subscription &&
      userData.user.subscription.subscriptionStatus === 'active'
    ) {
      onSubscribe();
    }
  }, [userData]);

  useEffect(() => {
    if (subscription.status === 'active') {
      enqueueSnackbar('Thanks for subscribing!', { variant: 'success' });
      onSubscribe();
    }
  }, [subscription]);

  useEffect(() => {
    if (requiresAction) {
      enqueueSnackbar('Action is required', { variant: 'error' });
      onRequiresAction();
    }
  }, [requiresAction]);

  useEffect(() => {
    if (retryPayment) {
      enqueueSnackbar(
        'Your card was declined. Please check and re-enter your card details.',
        { variant: 'error' },
      );
    }
  }, [retryPayment]);

  return (
    <div>
      <Helmet>
        <title>Checkout - ImpGG</title>
        <meta name="description" content="Checkout page for ImpGG" />
      </Helmet>
      <Header />
      <Container maxWidth="md" component="main" className={classes.container}>
        <Paper className={classes.checkoutSection}>
          <Typography variant="h5" className={classes.sectionHeader}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            How much do you want to pay?
          </Typography>
          <PriceInput
            onChangePriceNumber={onChangePriceNumber}
            onChangePriceNumberClick={onChangePriceNumberClick}
            priceNumber={priceNumber}
            onSetPrice={onSetPrice}
          />
          <Divider variant="inset" className={classes.divider} />
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6">Purchase Summary</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Subtotal</Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>Pro subscription</Typography>
            </Grid>
            <Grid item>
              <Typography>{`$${priceNumber} /month`}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="flex-end"
            spacing={2}
            className={classes.containerTax}
          >
            <Grid item>
              <Typography>Tax</Typography>
            </Grid>
            <Grid item>
              <Typography>$0.00</Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Typography variant="h6">Total</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">{`$${priceNumber} /month`}</Typography>
            </Grid>
          </Grid>
          <Divider variant="inset" className={classes.divider} />
          {priceId ? (
            <div>
              <Typography variant="h5" className={classes.sectionHeader}>
                Payment Information
              </Typography>
              <CheckoutForm
                retryInvoiceWithNewPaymentMethod={callCreateSubscription}
                createSubscription={callCreateSubscription}
                setPaymentMethodId={setPaymentMethodId}
                setInvoiceId={setInvoiceId}
                retryPayment={retryPayment}
                loading={loading}
                userData={userData}
                callRetryPayment={callRetryPayment}
              />
            </div>
          ) : null}
        </Paper>
      </Container>
    </div>
  );
}

CheckoutFormPage.propTypes = {
  onChangePriceNumber: PropTypes.func,
  onChangePriceNumberClick: PropTypes.func,
  onSetPrice: PropTypes.func,
  setPriceBool: PropTypes.bool,
  priceNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  invoice: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  subscription: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  priceId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  customerId: PropTypes.string,
  onSubscribe: PropTypes.func,
  onAuthenticationFailure: PropTypes.func,
  onAuthenticationSuccess: PropTypes.func,
  paymentMethodId: PropTypes.string,
  invoiceId: PropTypes.string,
  loading: PropTypes.bool,
  requiresAction: PropTypes.bool,
  retryPayment: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  callCreateSubscription: PropTypes.func,
  setPaymentMethodId: PropTypes.func,
  setInvoiceId: PropTypes.func,
  callRetryPayment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  checkoutFormPage: makeSelectCheckoutFormPage(),
  priceNumber: makeSelectPriceNumber(),
  priceId: makeSelectPriceId(),
  setPriceBool: makeSelectSetPrice(),
  subscription: makeSelectSubscription(),
  invoice: makeSelectInvoice(),
  loading: makeSelectLoading(),
  requiresAction: makeSelectRequiresAction(),
  retryPayment: makeSelectRetryPayment(),
  userData: makeSelectUserData(),
  loggedIn: makeSelectLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
      dispatch(push('/'));
    },
    onSubscribe: () => {
      dispatch(push('/dashboard'));
    },
    onChangePriceNumber: evt => {
      dispatch(changePriceNumber(evt.target.value));
    },
    onChangePriceNumberClick: price => {
      dispatch(changePriceNumber(price));
    },
    onSetPrice: priceNumber => {
      dispatch(setPrice(priceNumber));
    },
    onAuthenticationFailure: err => {
      dispatch(authenticationFailure(err));
    },
    onAuthenticationSuccess: () => {
      dispatch(authenticationSuccess());
    },
    callCreateSubscription: () => {
      dispatch(createSubscription());
    },
    callRetryPayment: () => {
      dispatch(createSubscriptionRetryPayment());
    },
    setPaymentMethodId: paymentMethodId => {
      dispatch(changePaymentMethodId(paymentMethodId));
    },
    setInvoiceId: invoiceId => {
      dispatch(changeInvoiceId(invoiceId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CheckoutFormPage);
