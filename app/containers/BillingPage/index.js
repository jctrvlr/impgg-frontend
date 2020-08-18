/* eslint-disable no-unused-vars */
/**
 *
 * ProfilePage
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';

// import { useSnackbar } from 'notistack';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { push } from 'connected-react-router';

import { makeStyles } from '@material-ui/core/styles';

import Footer from 'components/Footer';
import Header from 'components/Header';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

import StarIcon from '@material-ui/icons/StarBorder';

// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

import {
  makeSelectPaymentMethod,
  makeSelectLoading,
  makeSelectError,
  makeSelectSubscriptionInvoice,
  makeSelectCancelSuccess,
  makeSelectCancelError,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import {
  getBillingInfo,
  cancelSubscription,
  cancelSubscriptionCleanup,
} from './actions';
import SettingsTabs from '../../components/SettingsTabs';

// import messages from './messages';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(1, 0),
    minHeight: '75vh',
    overflow: 'auto',
  },
  heroHeadTopText: {
    paddingTop: '25%',
  },
  nameSection: {
    margin: theme.spacing(3),
    padding: theme.spacing(0, 6),
  },
  paperText: {
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
    width: 100,
    height: 100,
  },
  avatarContainer: {
    display: 'flex',
  },
  pictureButton: {
    height: '25%',
    alignSelf: 'center',
  },
  saveButton: {
    height: '25%',
    float: 'right',
    margin: theme.spacing(2, 0),
  },
  pictureDeleteButton: {
    color: theme.palette.text.primary,
    height: '25%',
    alignSelf: 'center',
  },
  divider: {
    clear: 'both',
  },
  settingsMain: {
    padding: theme.spacing(2, 0),
  },
  verifiedEmail: {
    paddingLeft: theme.spacing(3),
  },
  changePasswordButton: {
    display: 'block',
    margin: theme.spacing(2, 0),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  pricingContainer: {
    marginBottom: theme.spacing(15),
  },
  container: {
    margin: theme.spacing(3, 0),
  },
  infoSection: {
    margin: theme.spacing(3),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function getDateStringFromUnixTimestamp(date) {
  const nextPaymentAttemptDate = new Date(date * 1000);
  const day = nextPaymentAttemptDate.getDate();
  const month = nextPaymentAttemptDate.getMonth() + 1;
  const year = nextPaymentAttemptDate.getFullYear();

  return `${month}/${day}/${year}`;
}

export function BillingPage({
  userData,
  loggedIn,
  onLogoutClick,
  onLoadUnauth,
  startGetBillingInfo,
  paymentMethod,
  loading,
  error,
  subscriptionInvoice,
  cancelSuccess,
  cancelError,
  onCancelSubscription,
  onCancelSuccess,
}) {
  useInjectReducer({ key: 'billingPage', reducer });
  useInjectSaga({ key: 'billingPage', saga });
  // const { enqueueSnackbar } = useSnackbar();

  const tiers = [
    {
      title: 'Free',
      price: '0',
      description: [
        'Unlimited links with Imp.GG and any custom domain',
        'View audience data',
        'Help center access',
        'Email support',
      ],
      buttonText: 'Go to dashboard',
      buttonVariant: 'outlined',
      buttonHref: '/dashboard',
    },
    {
      title: 'Pro',
      subheader: 'Most popular',
      price: '1+',
      description: [
        'Pay what you want',
        'Everything included from Free tier',
        // '2 users included in shared workspace',
        'Export audience data to CSV',
        'Priority email support',
        'Support a basically free service (buy the dev a coffee)',
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
      buttonHref: '/upgrade',
    },
    {
      title: 'Enterprise',
      price: '?',
      description: [
        'Everything included from Free tier & Pro tier',
        '10+ users included in shared workspace',
        'API access',
        'Phone & email support',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'outlined',
      buttonHref: '/contact',
    },
  ];

  useEffect(() => {
    if (userData.user.subscription) {
      startGetBillingInfo();
    }
  }, []);

  useEffect(() => {
    if (cancelSuccess) {
      onCancelSuccess();
    }
  }, [cancelSuccess]);

  if (!loggedIn) {
    onLoadUnauth();
  }

  const classes = useStyles();

  const total = (Math.round(subscriptionInvoice.total) / 100).toFixed(2);
  const dateDue = getDateStringFromUnixTimestamp(
    subscriptionInvoice.next_payment_attempt,
  );

  const cardBrand =
    paymentMethod &&
    paymentMethod.card &&
    paymentMethod.card.brand.toUpperCase();
  const cardLast4 =
    paymentMethod && paymentMethod.card && paymentMethod.card.last4;
  const cardExpMonth =
    paymentMethod && paymentMethod.card && paymentMethod.card.exp_month;
  const cardExpYear =
    paymentMethod && paymentMethod.card && paymentMethod.card.exp_year;

  return (
    <React.Fragment>
      <Helmet>
        <title>Billing - ImpGG</title>
        <meta
          name="description"
          content="Create shortened links that work for you and your business. ImpGG is your one stop shop for shortening links, creating QR codes, powerful link analytics, and custom branded domains. Try ImpGG for free now!"
        />
      </Helmet>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
        background
      />
      <Container maxWidth="md">
        <Typography variant="h3" align="left" className={classes.settingsMain}>
          Settings
        </Typography>
        <SettingsTabs tabValue={2} />
      </Container>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        {!loading ? (
          <div className={classes.nameSection}>
            {userData.user.subscription ? (
              <div>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.heroText}
                >
                  Billing
                </Typography>
                <Divider variant="fullWidth" className={classes.divider} />
                <Grid
                  container
                  justify="space-between"
                  spacing={3}
                  className={classes.container}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1" align="center">
                      Current monthly bill
                    </Typography>
                    <Typography variant="h5" align="center">
                      {`$${userData.user.subscription.subscriptionPrice.price}`}
                    </Typography>
                    {/*
                    <Button
                      className={classes.billingActionButton}
                      fullWidth
                      color="primary"
                      component={RouterLink}
                      to="/settings/billing/update"
                    >
                      Edit subscription amount
                    </Button>
                    */}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body1" align="center">
                      Payment Method
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                    >{`${cardBrand} ends with ${cardLast4}`}</Typography>
                    <Typography
                      variant="h5"
                      align="center"
                    >{`Exp: ${cardExpMonth}/${cardExpYear}`}</Typography>
                    {/*
                    <Button
                      className={classes.billingActionButton}
                      fullWidth
                      color="primary"
                      component={RouterLink}
                      to="/settings/billing/update"
                    >
                      Update payment method
                    </Button>
                    */}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body1" align="center">
                      Next payment due
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                    >{`$${total} due on ${dateDue}`}</Typography>
                    {/*
                    <Button
                      className={classes.billingActionButton}
                      fullWidth
                      color="primary"
                      component={RouterLink}
                      to="/"
                    >
                      View payment history
                    </Button>
                    */}
                  </Grid>
                </Grid>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={4}>
                    <Button
                      className={classes.billingActionButton}
                      fullWidth
                      color="primary"
                      onClick={onCancelSubscription}
                    >
                      Cancel subscription
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
                  Choose the right pricing plan for you, no matter your size or
                  reach
                </Typography>
                <Grid container spacing={1} alignItems="flex-end">
                  {tiers.map(tier => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid
                      item
                      key={tier.title}
                      xs={12}
                      sm={tier.title === 'Enterprise' ? 12 : 6}
                      md={4}
                    >
                      <Card>
                        <CardHeader
                          title={tier.title}
                          subheader={tier.subheader}
                          titleTypographyProps={{ align: 'center' }}
                          subheaderTypographyProps={{ align: 'center' }}
                          action={tier.title === 'Pro' ? <StarIcon /> : null}
                          className={classes.cardHeader}
                        />
                        <CardContent>
                          <div className={classes.cardPricing}>
                            <Typography
                              component="h2"
                              variant="h3"
                              color="textPrimary"
                            >
                              ${tier.price}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              /mo
                            </Typography>
                          </div>
                          <ul>
                            {tier.description.map(line => (
                              <Typography
                                component="li"
                                variant="subtitle1"
                                align="center"
                                key={line}
                              >
                                {line}
                              </Typography>
                            ))}
                          </ul>
                        </CardContent>
                        <CardActions>
                          <Button
                            fullWidth
                            variant={tier.buttonVariant}
                            color="primary"
                            component={RouterLink}
                            to={tier.buttonHref}
                          >
                            {tier.buttonText}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </div>
        ) : (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )}
      </Container>
      <Footer />
    </React.Fragment>
  );
}

BillingPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
  onLoadUnauth: PropTypes.func,
  paymentMethod: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  subscriptionInvoice: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loading: PropTypes.bool,
  startGetBillingInfo: PropTypes.func,
  onCancelSubscription: PropTypes.func,
  cancelSuccess: PropTypes.bool,
  cancelError: PropTypes.bool,
  onCancelSuccess: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  paymentMethod: makeSelectPaymentMethod(),
  error: makeSelectError(),
  loading: makeSelectLoading(),
  cancelSuccess: makeSelectCancelSuccess(),
  cancelError: makeSelectCancelError(),
  subscriptionInvoice: makeSelectSubscriptionInvoice(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCancelSuccess: () => {
      dispatch(push('/sorry'));
      dispatch(cancelSubscriptionCleanup());
    },
    onCancelSubscription: () => {
      dispatch(cancelSubscription());
    },
    startGetBillingInfo: () => {
      dispatch(getBillingInfo());
    },
    onLogoutClick: () => {
      dispatch(logoutUser());
      dispatch(push('/'));
    },
    onLoadUnauth: () => {
      dispatch(logoutUser());
      dispatch(push('/'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BillingPage);
