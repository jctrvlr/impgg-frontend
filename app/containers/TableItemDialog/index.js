/**
 *
 * TableItemDialog
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
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
  updateURL,
  changeSLink,
  generateShortLink,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import { makeSelectSelectedData } from '../DashboardPage/selectors';
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

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export function TableItemDialog({
  selectedData,
  open,
  setOpen,
  sLinkError,
  onChangeSLink,
  onChangeURI,
  userData,
  uriValidation,
  uri,
  sLink,
  domain,
  loading,
  fetchLinkSuccess,
  onChangeDomain,
  onSubmitForm,
  onValidURI,
}) {
  useInjectReducer({ key: 'tableItemDialog', reducer });
  useInjectSaga({ key: 'tableItemDialog', saga });

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (fetchLinkSuccess && !loading) {
      enqueueSnackbar('Link updated successfully', { variant: 'success' });
      handleClose();
    }
  }, [fetchLinkSuccess]);

  useEffect(() => {
    if (uri && !uriValidation && !sLink && !loading) {
      onValidURI();
    }
  }, [uri, uriValidation]);

  const handleClose = () => {
    setOpen(false);
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  console.log(selectedData);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      scroll="body"
      fullScreen={fullScreen}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{ cursor: 'move', textAlign: 'center' }}
        id="draggable-dialog-title"
      >
        {selectedData[0].pageTitle
          ? selectedData[0].pageTitle
          : 'Page Title Not Found'}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="url"
          label="URL"
          value={uri || selectedData[0].url}
          error={!!uriValidation}
          helperText={uriValidation}
          onChange={onChangeURI}
          type="url"
          key="url"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Generated Link"
          key="shortlink"
          value={sLink || selectedData[0].shortLink}
          error={!!sLinkError}
          helperText={sLinkError}
          onChange={onChangeSLink}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.linkAdornment}
              >
                {selectedData[0].domain ||
                  userData.user.preferences.primaryDomain}
                /
              </InputAdornment>
            ),
          }}
        />
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
          {userData.user.domains.map(dom => (
            <option value={dom.uri} key={dom.uri}>
              {dom.uri}
            </option>
          ))}
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
          <Button variant="contained" onClick={onSubmitForm} color="primary">
            Update Link
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

TableItemDialog.propTypes = {
  selectedData: PropTypes.array,
  open: PropTypes.bool,
  uri: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  domain: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  uriValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
  loading: PropTypes.bool,
  sLinkError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChangeURI: PropTypes.func,
  onChangeDomain: PropTypes.func,
  onChangeSLink: PropTypes.func,
  onSubmitForm: PropTypes.func,
  setOpen: PropTypes.func,
  onValidURI: PropTypes.func,
  fetchLinkSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  uri: makeSelectURI(),
  domain: makeSelectLinkDomain(),
  sLink: makeSelectSlink(),
  selectedData: makeSelectSelectedData(),
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
    onChangeSLink: evt => {
      dispatch(changeSLink(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(updateURL());
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
)(TableItemDialog);
