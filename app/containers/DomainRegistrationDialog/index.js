/**
 *
 * DomainRegistrationDialog
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { push } from 'connected-react-router';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import CloseIcon from '@material-ui/icons/Close';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectDomain,
  makeSelectSubdomain,
  makeSelectURIValidation,
  makeSelectLoading,
  makeSelectAddDomainSuccess,
  makeSelectAddDomainError,
} from './selectors';

import {
  addDomain,
  changeDomain,
  validateURI,
  changeSubdomain,
  resetState,
} from './actions';

import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  modalPaper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  domainLabel: {
    fontSize: '1rem',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.00938em',
  },
  linkAdornment: {
    fontSize: '14px',
    width: '165px',
    padding: '6px 0 7px',
    paddingTop: '3px',
  },
  socialButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    display: 'flex',
    flexFlow: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  dnsTable: {
    marginTop: theme.spacing(3),
  },
}));

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const steps = [
  'Connect a domain name you already own',
  'Is it in use?',
  'Next steps',
];

export function DomainRegistrationDialog({
  openModal,
  onChangeDomain,
  onChangeSubdomain,
  uriValidation,
  domain,
  subdomain,
  loading,
  addDomainSuccess,
  addDomainError,
  onSubmitForm,
  modalClose,
}) {
  useInjectReducer({ key: 'domainRegistrationDialog', reducer });
  useInjectSaga({ key: 'domainRegistrationDialog', saga });

  const classes = useStyles();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleModalClose = () => {
    // Redirect user to /domains
    modalClose();
  };

  const ip = '138.68.254.217';

  const handleChangeDomainType = event => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (addDomainError) {
      enqueueSnackbar('That domain is already registered', {
        variant: 'error',
      });
      handleModalClose();
      setActiveStep(0);
    }
  }, [addDomainError]);

  useEffect(() => {
    if (addDomainSuccess) {
      enqueueSnackbar('Your action is required.', { variant: 'success' });
      handleModalClose();
    }
  }, [addDomainSuccess]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant="body1" align="center">
              Configure a domain name you already own to use as a custom domain
              for your links. Please note that this is a technical procedure and
              DNS experience is recommended.
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="domain"
              value={domain}
              label="What is your domain name? ie. mydomainname.com"
              name="domain"
              error={!!uriValidation}
              helperText={uriValidation}
              autoFocus
              onChange={onChangeDomain}
            />
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={!!uriValidation || !domain}
              >
                Next
              </Button>
            </div>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Typography variant="body1" align="center">
              A domain is &ldquo;in use&rdquo; when it is being used by some
              some other web application (ie. website, blog, gaming server, etc)
            </Typography>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Is {domain} in use?</FormLabel>
              <RadioGroup
                aria-label="domain type"
                name="domainType"
                value={value}
                onChange={handleChangeDomainType}
              >
                <FormControlLabel
                  value="used"
                  control={<Radio />}
                  label="Yes, it's being used for my website, blog, gaming server, etc"
                />
                {value === 'used' ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="subdomain"
                    value={subdomain}
                    label="Subdomain - (ie. link, go, click)"
                    name="subdomain"
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.linkAdornment}
                        >
                          .{domain}
                        </InputAdornment>
                      ),
                    }}
                    onChange={onChangeSubdomain}
                  />
                ) : null}
                <FormControlLabel
                  value="notinuse"
                  control={<Radio />}
                  label="No, it's not currently being used"
                />
              </RadioGroup>
            </FormControl>
            <div className={classes.buttons}>
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={(!subdomain && value === 'used') || value === 0}
              >
                Next
              </Button>
            </div>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Typography variant="body1" align="left">
              REQUIRED! Apply the following DNS record in order to turn that
              domain into a custom link shortener. This will redirect all
              traffic from your domain (subdomain) to ImpGG and allow us to
              handle shortening links for you! Your domain will not be available
              immediately, it can take up to 24 hours for the DNS to propagate.
              We&apos;ll notify you when the setup is complete!
            </Typography>
            <Typography variant="caption" align="left">
              Tip: Make sure that all pre-existing records of type A, AAAA, or
              CNAME for {subdomain} are removed.
            </Typography>
            <TableContainer component={Paper} className={classes.dnsTable}>
              <Table className={classes.table} aria-label="dns instructions">
                <TableHead>
                  <TableRow>
                    <TableCell>Record Type</TableCell>
                    <TableCell align="right">Hostname (or name)</TableCell>
                    <TableCell align="right">
                      Will direct to (or address)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={domain}>
                    <TableCell component="th" scope="row">
                      A
                    </TableCell>
                    <TableCell align="center">
                      {value === 'used' ? subdomain : '@ or ""'}
                    </TableCell>
                    <TableCell align="center">{ip}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.buttons}>
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {loading ? (
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmitForm}
                  className={classes.button}
                >
                  Finish
                </Button>
              )}
            </div>
          </React.Fragment>
        );
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        PaperComponent={PaperComponent}
        scroll="body"
        fullScreen={fullScreen}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: 'move', textAlign: 'center' }}
          id="draggable-dialog-title"
        >
          Add a domain
        </DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleModalClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

DomainRegistrationDialog.propTypes = {
  openModal: PropTypes.bool,
  onChangeDomain: PropTypes.func,
  onChangeSubdomain: PropTypes.func,
  uriValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  domain: PropTypes.string,
  subdomain: PropTypes.string,
  loading: PropTypes.bool,
  addDomainSuccess: PropTypes.bool,
  addDomainError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  modalClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  domain: makeSelectDomain(),
  subdomain: makeSelectSubdomain(),
  loading: makeSelectLoading(),
  uriValidation: makeSelectURIValidation(),
  addDomainSuccess: makeSelectAddDomainSuccess(),
  addDomainError: makeSelectAddDomainError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeDomain: evt => {
      dispatch(validateURI(evt.target.value));
      dispatch(changeDomain(evt.target.value));
    },
    onChangeSubdomain: evt => {
      dispatch(changeSubdomain(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addDomain());
    },
    modalClose: () => {
      dispatch(resetState());
      dispatch(push('/domains'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DomainRegistrationDialog);
