/**
 *
 * LinkCreationDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

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
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectLinkCreationDialog, {
  makeSelectURI,
  makeSelectURIValidation,
  makeSelectURIHistory,
} from './selectors';
import { makeSelectUserData } from '../App/selectors';

import { changeDomain, changeURI, validateURI, fetchUrl } from './actions';
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
}));

export function LinkCreationDialog({
  openModal,
  userData,
  handleModalClose,
  uriValidation,
  uri,
  onChangeURI,
  onChangeDomain,
  onSubmitForm,
}) {
  useInjectReducer({ key: 'linkCreationDialog', reducer });
  useInjectSaga({ key: 'linkCreationDialog', saga });

  const classes = useStyles();
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(userData);
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
          error={!!uriValidation}
          helperText={uriValidation}
          onChange={onChangeURI}
          fullWidth
        />
      </DialogContent>
      {uri && !uriValidation ? (
        <React.Fragment>
          <DialogContent>
            <InputLabel htmlFor="domain-choice">Domain</InputLabel>
            <Select
              native
              value={userData.user.preferences.primaryDomain}
              onChange={onChangeDomain}
              input={<Input id="domain-choice" />}
            >
              {userData.user.domains.map(domain => (
                <option value={domain.uri} key={domain.uri}>
                  {domain.uri}
                </option>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={onSubmitForm} color="primary">
              Create Link
            </Button>
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
  onChangeURI: PropTypes.func,
  onChangeDomain: PropTypes.func,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  linkCreationDialog: makeSelectLinkCreationDialog(),
  userData: makeSelectUserData(),
  uri: makeSelectURI(),
  uriHistory: makeSelectURIHistory(),
  uriValidation: makeSelectURIValidation(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeURI: evt => {
      dispatch(validateURI(evt.target.value));
      dispatch(changeURI(evt.target.value));
    },
    onChangeDomain: evt => {
      dispatch(changeDomain(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchUrl());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LinkCreationDialog);
