/**
 *
 * DeleteAccountModal
 *
 */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';

import { push } from 'connected-react-router';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ReportIcon from '@material-ui/icons/Report';

import ErrorMessageHolder from 'components/ErrorMessageHolder';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectLoading, makeSelectDeleteSuccess } from './selectors';
import { makeSelectUserData } from '../App/selectors';

import { logoutUser } from '../App/actions';
import { deleteAccount } from './actions';

import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

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
  paper: {
    margin: theme.spacing(8, 0),
  },
  actions: {
    display: 'flex',
    margin: theme.spacing(3, 0),
    justifyContent: 'space-around',
  },
}));

export function DeleteAccountModal({
  openModal,
  userData,
  handleModalClose,
  loading,
  deleteSuccess,
  deleteAccountClick,
  onDeleteSuccess,
}) {
  useInjectReducer({ key: 'deleteAccountModal', reducer });
  useInjectSaga({ key: 'deleteAccountModal', saga });

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (deleteSuccess) {
      onDeleteSuccess();
    }
  }, [deleteSuccess]);

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="Confirm delete"
    >
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={handleModalClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <ReportIcon /> You cannot recover any data after you delete your
              account.
            </Typography>
            <div className={classes.actions}>
              <Button
                variant="contained"
                color="primary"
                onClick={deleteAccountClick}
              >
                Confirm delete
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

DeleteAccountModal.propTypes = {
  openModal: PropTypes.bool,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handleModalClose: PropTypes.func,
  loading: PropTypes.bool,
  deleteSuccess: PropTypes.bool,
  deleteAccountClick: PropTypes.func,
  onDeleteSuccess: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  loading: makeSelectLoading(),
  deleteSuccess: makeSelectDeleteSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteAccountClick: () => {
      dispatch(deleteAccount());
    },
    onDeleteSuccess: () => {
      dispatch(logoutUser());
      dispatch(push('/sorry'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DeleteAccountModal);
