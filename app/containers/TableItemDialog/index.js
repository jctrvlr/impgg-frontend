/**
 *
 * TableItemDialog
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import Typography from '@material-ui/core/Typography';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CropFreeIcon from '@material-ui/icons/CropFree';
import EmailIcon from '@material-ui/icons/Email';

import CachedIcon from '@material-ui/icons/Cached';
import CloseIcon from '@material-ui/icons/Close';

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
  changeSLink,
  resetFields,
  validateURI,
  updateURL,
  generateShortLink,
  logSocialMediaShare,
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
  socialButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const sum = (items, prop) => {
  if (!items) return null;
  return items.reduce((a, b) => a + b[prop], 0);
};

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
  onClickGenShortlink,
  onLoadModal,
  onSocialShare,
}) {
  useInjectReducer({ key: 'tableItemDialog', reducer });
  useInjectSaga({ key: 'tableItemDialog', saga });

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    onLoadModal(selectedData[0].shortLink);
  }, [open]);

  useEffect(() => {
    if (fetchLinkSuccess && !loading) {
      enqueueSnackbar('Link updated successfully', { variant: 'success' });
      handleClose();
    }
  }, [fetchLinkSuccess]);

  const handleClose = () => {
    setOpen(false);
  };
  const shareDom =
    selectedData[0].domain || userData.user.preferences.primaryDomain;
  const shareUrl = `${shareDom}/${selectedData[0].shortLink}`;
  const title = selectedData[0].pageTitle ? selectedData[0].pageTitle : '';

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  let clickRefOptions;
  let clickLocationOptions;

  if (selectedData[0].referrer) {
    clickRefOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Top sources',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: 'Sources',
          colorByPoint: true,
          data: (() => {
            // generate an array of random data
            const sumCount = sum(selectedData[0].referrer, 'count');
            const data = selectedData[0].referrer.map(s => {
              const yc = (s.count / sumCount) * 100;
              return {
                // eslint-disable-next-line no-underscore-dangle
                name: s._id || 'Direct',
                y: yc,
              };
            });
            return data;
          })(),
        },
      ],
    };

    clickLocationOptions = {
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: () => {
            // set up the updating of the chart each second
            const series = clickLocationOptions.series[0];
            setInterval(() => {
              const x = new Date().getTime(); // current time
              const y = Math.random();
              series.addPoint([x, y], true, true);
            }, 1000);
          },
        },
      },

      time: {
        useUTC: false,
      },

      title: {
        text: 'Live random data',
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: 'Value',
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080',
          },
        ],
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      series: [
        {
          name: 'Random data',
          data: (() => {
            // generate an array of random data
            const data = [];
            const time = new Date().getTime();
            let i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.random(),
              });
            }
            return data;
          })(),
        },
      ],
    };
  }

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
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
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
                {selectedData[0].domain ||
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
      <DialogContent>
        <div className={classes.socialButtons}>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            beforeOnClick={() => onSocialShare('twitter')}
          >
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </TwitterShareButton>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            beforeOnClick={() => onSocialShare('facebook')}
          >
            <IconButton>
              <FacebookIcon />
            </IconButton>
          </FacebookShareButton>
          <LinkedinShareButton
            url={shareUrl}
            windowWidth={750}
            windowHeight={600}
            beforeOnClick={() => onSocialShare('linkedin')}
          >
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </LinkedinShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            beforeOnClick={() => onSocialShare('email')}
          >
            <IconButton>
              <EmailIcon />
            </IconButton>
          </EmailShareButton>
          {/* Make QR codes work */}
          <IconButton>
            <CropFreeIcon />
          </IconButton>
        </div>
      </DialogContent>
      {selectedData[0].numClicks > 0 ? (
        <DialogContent>
          <HighchartsReact
            highcharts={Highcharts}
            options={clickLocationOptions}
          />
          <HighchartsReact highcharts={Highcharts} options={clickRefOptions} />
        </DialogContent>
      ) : null}
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
  fetchLinkSuccess: PropTypes.bool,
  onClickGenShortlink: PropTypes.func,
  onLoadModal: PropTypes.func,
  onSocialShare: PropTypes.func,
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
    onClickGenShortlink: () => {
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
    onLoadModal: sLink => {
      dispatch(resetFields());
      dispatch(changeSLink(sLink));
    },
    onSocialShare: media => {
      // TODO: MAKE BACKEND FOR LOGGING EVENTS
      dispatch(logSocialMediaShare(media));
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
