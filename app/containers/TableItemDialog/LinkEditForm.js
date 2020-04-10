/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/**
 *
 * TableItemDialog
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import CachedIcon from '@material-ui/icons/Cached';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
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
    padding: theme.spacing(3, 0),
  },
  halfChart: {
    flex: '1 0 50%',
    padding: theme.spacing(3, 0),
  },
  qrCodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '256px',
    width: '256px',
  },
  deleteDialogContent: {
    textAlign: 'center',
  },
}));

export function LinkEditForm({
  selectedData,
  sLinkError,
  onChangeSLink,
  onChangeURI,
  userData,
  uriValidation,
  uri,
  sLink,
  loading,
  fetchLinkSuccess,
  onChangeDomain,
  onSubmitForm,
  onClickGenShortlink,
  handleClose,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [tempUri, setTempUri] = useState(uri);
  const [tempSLink, setTempSLink] = useState(sLink);
  const [tempDomain, setTempDomain] = useState(
    userData.user.preferences.primaryDomain,
  );

  useEffect(() => {
    if (uri !== tempUri) setTempUri(uri);
    if (sLink !== tempSLink) setTempSLink(sLink);
  }, [uri, sLink]);

  useEffect(() => {
    if (fetchLinkSuccess && !loading) {
      enqueueSnackbar('Link updated successfully', { variant: 'success' });
      handleClose();
    }
  }, [fetchLinkSuccess]);

  const onSubmit = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();

    onChangeSLink(tempSLink);
    onChangeURI(tempUri);
    onChangeDomain(tempDomain);
    onSubmitForm();
  };

  return (
    <React.Fragment>
      <DialogContent>
        <TextField
          margin="dense"
          id="url"
          label="URL"
          value={tempUri}
          error={!!uriValidation}
          helperText={uriValidation}
          onChange={e => setTempUri(e.target.value)}
          type="url"
          key="url"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Generated Link"
          key="shortlink"
          value={tempSLink}
          error={!!sLinkError}
          helperText={sLinkError}
          onChange={e => setTempSLink(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.linkAdornment}
              >
                {(selectedData[0].domain && selectedData[0].domain.uri) ||
                  userData.user.preferences.primaryDomain}
                /
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickGenShortlink}
                >
                  <CachedIcon />
                </IconButton>
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
          value={tempDomain || userData.user.preferences.primaryDomain}
          onChange={e => setTempDomain(e.target.value)}
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
            onClick={() => onSubmit()}
            color="primary"
          >
            Update Link
          </Button>
        )}
      </DialogActions>
    </React.Fragment>
  );
}

LinkEditForm.propTypes = {
  selectedData: PropTypes.array,
  uri: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  fetchLinkSuccess: PropTypes.bool,
  onClickGenShortlink: PropTypes.func,
  handleClose: PropTypes.func,
};

export default LinkEditForm;
