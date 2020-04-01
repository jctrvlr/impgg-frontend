/* eslint-disable no-param-reassign */
/**
 *
 * TableItemDialog
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from 'notistack';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContentText from '@material-ui/core/DialogContentText';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

import CloseIcon from '@material-ui/icons/Close';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectDeleteDomainSuccess,
  makeSelectDeleteDomainError,
} from './selectors';

import { makeSelectUserData } from '../App/selectors';

import { deleteDomain } from './actions';

import reducer from './reducer';
import saga from './saga';
import { makeSelectSelectedDomain } from '../DomainsPage/selectors';

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
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteDialogContent: {
    textAlign: 'center',
  },
}));

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const isSubdomain = url => {
  const regex = new RegExp(/^([a-z]+:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);

  return !!url.match(regex); // make sure it returns boolean
};

export function DomainItemDialog({
  selectedDomain,
  open,
  deleteDomainSuccess,
  deleteDomainError,
  handleModalClose,
  loading,
  onDelete,
}) {
  useInjectReducer({ key: 'domainItemDialog', reducer });
  useInjectSaga({ key: 'domainItemDialog', saga });

  const classes = useStyles();
  const theme = useTheme();

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpenDeleteDialog(false);
    handleModalClose();
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const ip = '138.68.254.217';

  let subdomain = false;
  const domain = selectedDomain.length ? selectedDomain[0].uri : 'N/A';
  if (isSubdomain(domain)) {
    const domainSplit = domain.split('.');
    // eslint-disable-next-line prefer-destructuring
    subdomain = domainSplit[0];
  }
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (deleteDomainError) {
      enqueueSnackbar('Domain could not be deleted. Please try again.', {
        variant: 'error',
      });
      handleClose();
    }
  }, [deleteDomainError]);

  useEffect(() => {
    if (deleteDomainSuccess) {
      enqueueSnackbar('Domain and related links deleted successfully', {
        variant: 'success',
      });
      handleClose();
    }
  }, [deleteDomainSuccess]);

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteClick}
        PaperComponent={PaperComponent}
        fullScreen={fullScreen}
      >
        <DialogTitle
          style={{ cursor: 'move', textAlign: 'center', margin: '0px 25px' }}
          id="draggable-dialog-title"
        >
          Are you sure you want to delete the domain?
        </DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleDeleteClick}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.deleteDialogContent}>
          <Typography variant="body1" color="textSecondary">
            This will delete all links that currently use this domain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
          {domain}
        </DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography variant="body1" align="left">
            REQUIRED! Apply the following DNS record in order to turn that
            domain into a custom link shortener. This will redirect all traffic
            from your domain (subdomain) to ImpGG and allow us to handle
            shortening links for you! Your domain will not be available
            immediately, it can take up to 24 hours for the DNS to propagate.
            We&apos;ll notify you when the setup is complete!
          </Typography>
          <Typography variant="caption" align="left">
            Tip: Make sure that all pre-existing records of type A, AAAA, or
            CNAME for {domain} are removed.
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
                  <TableCell align="center">{subdomain || '@ or ""'}</TableCell>
                  <TableCell align="center">{ip}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogContent>
          <div className={classes.buttons}>
            <IconButton onClick={handleDeleteClick} disabled={loading}>
              <DeleteIcon />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

DomainItemDialog.propTypes = {
  selectedDomain: PropTypes.array,
  open: PropTypes.bool,
  deleteDomainSuccess: PropTypes.bool,
  deleteDomainError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  handleModalClose: PropTypes.func,
  onDelete: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  selectedDomain: makeSelectSelectedDomain(),
  deleteDomainSuccess: makeSelectDeleteDomainSuccess(),
  deleteDomainError: makeSelectDeleteDomainError(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDelete: () => {
      dispatch(deleteDomain());
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
)(DomainItemDialog);
