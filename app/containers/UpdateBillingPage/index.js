/* eslint-disable no-unused-vars */
/**
 *
 * UpdateBillingPage
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
} from '../CheckoutFormPage/selectors';

import {
  changePriceNumber,
  setPrice,
  changePaymentMethodId,
  changeInvoiceId,
  createSubscription,
  authenticationFailure,
  authenticationSuccess,
} from '../CheckoutFormPage/actions';
import reducer from './reducer';
import saga from './saga';

import Header from '../CheckoutFormPage/Header';

import PriceInput from '../CheckoutFormPage/PriceInput';
import CheckoutForm from '../CheckoutFormPage/CheckoutForm';

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

export function UpdateBillingPage({
  onChangePriceNumber,
  onChangePriceNumberClick,
  onSetPrice,
  setPriceBool,
  priceNumber,
  userData,
  subscription,
  onSubscribe,
  priceId,
  customerId,
  invoice,
  loading,
  setPaymentMethodId,
  callCreateSubscription,
  setInvoiceId,
  updatedInfo,
}) {
  useInjectReducer({ key: 'updateBillingPage', reducer });
  useInjectSaga({ key: 'updateBillingPage', saga });

  const stripe = useStripe();

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedInfo) {
      onSubscribe();
    }
  }, [updatedInfo]);

  return (
    <div>
      <Helmet>
        <title>Update Billing Info - ImpGG</title>
        <meta name="description" content="Update your billing info - ImpGG" />
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
            update
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
        </Paper>
      </Container>
    </div>
  );
}

UpdateBillingPage.propTypes = {
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
  loading: PropTypes.bool,
  callCreateSubscription: PropTypes.func,
  setPaymentMethodId: PropTypes.func,
  setInvoiceId: PropTypes.func,
  updatedInfo: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  checkoutFormPage: makeSelectCheckoutFormPage(),
  priceNumber: makeSelectPriceNumber(),
  priceId: makeSelectPriceId(),
  setPriceBool: makeSelectSetPrice(),
  subscription: makeSelectSubscription(),
  loading: makeSelectLoading(),
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
      dispatch(push('/settings/billing'));
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UpdateBillingPage);
