/**
 *
 * LinkCreationDialog
 * TODO: implement error, and loading as well as short link
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectLinkCreationDialog, {
  makeSelectURI,
  makeSelectURIValidation,
  makeSelectSlink,
  makeSelectLoading,
  makeSelectsLinkError,
  makeSelectFetchLinkSuccess,
  makeSelectLinkDomain,
} from './selectors';
import { makeSelectUserData } from '../App/selectors';

import {
  changeDomain,
  changeURI,
  validateURI,
  fetchUrl,
  changeSLink,
  generateShortLink,
} from './actions';

import { getTableData } from '../DashboardPage/actions';

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
}));

export function LinkCreationDialog({
  openModal,
  userData,
  handleModalClose,
  uriValidation,
  uri,
  sLink,
  domain,
  loading,
  sLinkError,
  fetchLinkSuccess,
  onChangeURI,
  onChangeDomain,
  onChangeDomainFirst,
  onChangeSLink,
  onSubmitForm,
  onValidURI,
}) {
  useInjectReducer({ key: 'linkCreationDialog', reducer });
  useInjectSaga({ key: 'linkCreationDialog', saga });

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    onChangeDomainFirst(userData.user.preferences.primaryDomain);
  }, []);

  useEffect(() => {
    if (fetchLinkSuccess && !loading) {
      enqueueSnackbar('Link created successfully', { variant: 'success' });
      handleModalClose();
    }
  }, [fetchLinkSuccess]);

  useEffect(() => {
    if (uri && !uriValidation && !sLink && !loading) {
      onValidURI();
    }
  }, [uri, uriValidation]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Link</DialogTitle>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={handleModalClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="URL"
          type="url"
          key="url"
          value={uri}
          error={!!uriValidation}
          helperText={uriValidation}
          onChange={onChangeURI}
          fullWidth
        />
      </DialogContent>
      {uri && !uriValidation ? (
        <React.Fragment>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Link"
              key="shortlink"
              value={sLink}
              error={!!sLinkError}
              helperText={sLinkError}
              onChange={onChangeSLink}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className={classes.linkAdornment}
                  >
                    {domain || userData.user.preferences.primaryDomain}/
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogContent>
            <InputLabel htmlFor="domain-choice" shrink>
              Domain
            </InputLabel>
            <Select
              native
              margin="dense"
              key="domain"
              value={domain || userData.user.preferences.primaryDomain}
              onChange={onChangeDomain}
              input={<Input id="domain-choice" />}
            >
              {userData.user.domains.map(dom =>
                dom.status === 2 ? (
                  <option value={dom.uri} key={dom.uri}>
                    {dom.uri}
                  </option>
                ) : null,
              )}
            </Select>
          </DialogContent>
          <DialogActions>
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
                onClick={onSubmitForm}
                color="primary"
              >
                Create Link
              </Button>
            )}
          </DialogActions>
        </React.Fragment>
      ) : null}
    </Dialog>
  );
}

LinkCreationDialog.propTypes = {
  openModal: PropTypes.bool,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handleModalClose: PropTypes.func,
  uriValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  uri: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  domain: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
  loading: PropTypes.bool,
  sLinkError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  fetchLinkSuccess: PropTypes.bool,
  onChangeURI: PropTypes.func,
  onChangeDomain: PropTypes.func,
  onChangeDomainFirst: PropTypes.func,
  onChangeSLink: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onValidURI: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  linkCreationDialog: makeSelectLinkCreationDialog(),
  userData: makeSelectUserData(),
  uri: makeSelectURI(),
  domain: makeSelectLinkDomain(),
  sLink: makeSelectSlink(),
  loading: makeSelectLoading(),
  fetchLinkSuccess: makeSelectFetchLinkSuccess(),
  sLinkError: makeSelectsLinkError(),
  uriValidation: makeSelectURIValidation(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeURI: evt => {
      dispatch(validateURI(evt.target.value));
      dispatch(changeURI(evt.target.value));
    },
    onValidURI: () => {
      dispatch(generateShortLink());
    },
    onChangeDomain: evt => {
      dispatch(changeDomain(evt.target.value));
    },
    onChangeDomainFirst: domain => {
      dispatch(changeDomain(domain));
    },
    onChangeSLink: evt => {
      dispatch(changeSLink(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchUrl());
      dispatch(getTableData());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LinkCreationDialog);
