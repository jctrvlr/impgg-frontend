/* eslint-disable no-param-reassign */
/**
 *
 * TableItemDialog
 *
 */

import React, { useEffect, memo, createRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataUSA from '@highcharts/map-collection/countries/us/us-all.geo.json';
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json';

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
import DeleteIcon from '@material-ui/icons/Delete';

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
import QRCode from './qrcode';
import {
  makeSelectURI,
  makeSelectURIValidation,
  makeSelectSlink,
  makeSelectLoading,
  makeSelectsLinkError,
  makeSelectFetchLinkSuccess,
  makeSelectLinkDomain,
  makeSelectLinkInfo,
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
  getLinkInfo,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import { makeSelectSelectedData } from '../DashboardPage/selectors';
import iso2to3 from './iso2to3';

// import messages from './messages';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/map')(Highcharts);
require('highcharts/modules/drilldown')(Highcharts);
require('highcharts/modules/data')(Highcharts);

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
  halfChart: {
    flex: '1 0 50%',
  },
  qrCodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '256px',
    width: '256px',
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
  linkInfo,
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
  onSelectedDataChange,
}) {
  useInjectReducer({ key: 'tableItemDialog', reducer });
  useInjectSaga({ key: 'tableItemDialog', saga });

  let mapData = mapDataWorld;

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const qrCodeRef = createRef();

  const [openQrCode, setOpenQrCode] = React.useState(false);
  const [qrCodeLoading, setQrCodeLoading] = React.useState(true);

  let qrcode;

  useEffect(() => {
    if (openQrCode) {
      setTimeout(() => {
        qrcode = new QRCode(qrCodeRef.current, {
          text: `${shareDom}/${selectedData[0].shortLink}`,
          width: 256,
          height: 256,
        });
        setQrCodeLoading(false);
      }, 2000);
    }
  }, [openQrCode, qrCodeRef.current]);

  useEffect(() => {
    onLoadModal(selectedData[0].shortLink);
  }, [open]);

  useEffect(() => {
    if (Object.keys(selectedData[0]).length !== 0) {
      onSelectedDataChange();
    }
  }, [selectedData]);

  useEffect(() => {
    if (fetchLinkSuccess && !loading) {
      enqueueSnackbar('Link updated successfully', { variant: 'success' });
      handleClose();
    }
  }, [fetchLinkSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleQrClick = () => {
    setOpenQrCode(!openQrCode);
  };

  const handleQrClose = () => {
    setQrCodeLoading(true);
    setOpenQrCode(!openQrCode);
    qrcode.clear();
  };

  const shareDom =
    selectedData[0].domain || userData.user.preferences.primaryDomain;
  const shareUrl = `${shareDom}/${selectedData[0].shortLink}`;
  const title = selectedData[0].pageTitle ? selectedData[0].pageTitle : '';

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  let clickRefOptions;
  let clickLocationOptions;
  // let clickLiveOptions;

  let clickDevicesOptions;
  let clickPlatformsOptions;
  let clickBrowsersOptions;
  // let clickSocialOptions;

  if (linkInfo) {
    clickRefOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 250,
      },
      colors: ['#F54336', '#360F0C', '#DB3C30', '#75201A', '#B53128'],
      title: {
        text: 'Top sources',
        margin: 5,
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
            // Calculate percentage of data.
            const sumCount = sum(linkInfo.referrer, 'count');
            const data = linkInfo.referrer.map(s => {
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

    /* clickLiveOptions = {
      chart: {
        events: {
          load() {
            // set up the updating of the chart each second
            const series = clickLiveOptions.series[0];
            setInterval(() => {
              const x = new Date().getTime(); // current time
              const y = Math.round(Math.random() * 100);
              series.addPoint([x, y], true, true);
            }, 1000);
          },
        },
      },

      time: {
        useUTC: false,
      },

      rangeSelector: {
        buttons: [
          {
            count: 1,
            type: 'minute',
            text: '1M',
          },
          {
            count: 5,
            type: 'minute',
            text: '5M',
          },
          {
            type: 'all',
            text: 'All',
          },
        ],
        inputEnabled: false,
        selected: 0,
      },

      title: {
        text: 'Live random data',
        margin: 5,
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

            for (i = -999; i <= 0; i += 1) {
              data.push([time + i * 1000, Math.round(Math.random() * 100)]);
            }
            return data;
          })(),
        },
      ],
    }; */

    clickLocationOptions = {
      chart: {
        events: {
          drillup(e) {
            if (!e.seriesOptions) {
              const chart = this;
              // Handle error, the timeout is cleared on success
              let fail = setTimeout(() => {
                chart.showLoading(
                  `<i class="icon-frown"></i> Failed loading ${e.point.name}`,
                );
                fail = setTimeout(() => {
                  chart.hideLoading();
                }, 1000);
              }, 3000);

              // Show the spinner
              chart.showLoading(
                '<i class="icon-spinner icon-spin icon-3x"></i>',
              ); // Font Awesome spinner

              // Hide loading and add series
              chart.hideLoading();
              clearTimeout(fail);
            }
          },
          drilldown(e) {
            if (!e.seriesOptions) {
              const chart = this;
              // Handle error, the timeout is cleared on success
              let fail = setTimeout(() => {
                chart.showLoading(
                  `<i class="icon-frown"></i> Failed loading ${e.point.name}`,
                );
                fail = setTimeout(() => {
                  chart.hideLoading();
                }, 1000);
              }, 3000);

              // Show the spinner
              chart.showLoading(
                '<i class="icon-spinner icon-spin icon-3x"></i>',
              ); // Font Awesome spinner

              // Load the drilldown map
              mapData = mapDataUSA;

              // Hide loading and add series
              chart.hideLoading();
              clearTimeout(fail);
              chart.addSeriesAsDrilldown(e.point, {
                name: e.point.code,
                mapData,
                dataLabels: {
                  enabled: true,
                  format: '{point.code}',
                },
              });
            }
          },
        },
      },
      title: {
        text: 'Location',
      },
      credits: {
        enabled: false,
      },
      mapNavigation: {
        enabled: true,
      },
      colorAxis: {
        min: 0,
        minColor: '#E6E7E8',
        maxColor: '#005645',
      },
      series: [
        {
          // Use the gb-all map with no data as a basemap
          mapData: linkInfo.justUSA ? mapDataUSA : mapData,
          borderColor: '#A0A0A0',
          nullColor: 'rgba(200, 200, 200, 0.3)',
          showInLegend: false,
          animation: {
            duration: 1000,
          },
          data: (() => {
            // Calculate percentage of data.
            const sumCount = sum(linkInfo.countries, 'count');
            const data = linkInfo.countries.map(s => {
              const yc = (s.count / sumCount) * 100;
              return {
                // eslint-disable-next-line no-underscore-dangle
                code: iso2to3[s._id] || 'N/A',
                value: yc,
                count: s.count,
                // eslint-disable-next-line no-underscore-dangle
                drilldown: s._id === 'US' ? 'USA' : null,
              };
            });
            data.sort((a, b) => (a.value < b.value ? 1 : -1));
            return data;
          })(),
          joinBy: ['iso-a3', 'code'],
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            format: '{point.code}',
          },
          name: 'World',
          tooltip: {
            pointFormat:
              '{point.code}: {point.value:.2f}% - {point.count} clicks',
          },
        },
      ],
      drilldown: {
        series: [
          {
            id: 'USA',
            mapData: mapDataUSA,
            borderColor: '#A0A0A0',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false,
            animation: {
              duration: 1000,
            },
            data: (() => {
              // Calculate percentage of data.
              const sumCount = sum(linkInfo.states, 'count');
              const data = linkInfo.states.map(s => {
                const yc = (s.count / sumCount) * 100;
                return {
                  // eslint-disable-next-line no-underscore-dangle
                  code: s._id || 'N/A',
                  value: yc,
                  count: s.count,
                };
              });
              data.sort((a, b) => (a.value < b.value ? 1 : -1));
              return data;
            })(),
            joinBy: ['postal-code', 'code'],
            dataLabels: {
              enabled: true,
              color: '#FFFFFF',
              format: '{point.code}',
            },
            name: 'USA',
            tooltip: {
              pointFormat:
                '{point.code}: {point.value:.2f}% - {point.count} clicks',
            },
          },
        ],
        activeDataLabelStyle: {
          color: '#FFFFFF',
          textDecoration: 'none',
          textOutline: '1px #000000',
        },
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    };

    clickDevicesOptions = {
      chart: {
        type: 'bar',
        height: 150,
        spacing: [0, 1, 1, 1],
      },
      colors: ['#F54336', '#360F0C', '#DB3C30', '#75201A', '#B53128'],
      title: {
        text: 'Devices',
        margin: 0,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          groupPadding: 0,
          pointPadding: 0.001,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: 'Devices',
          colorByPoint: true,
          data: (() => {
            // Calculate percentage of data.
            const sumCount = sum(linkInfo.devices, 'count');
            const data = linkInfo.devices.map(s => {
              const yc = (s.count / sumCount) * 100;
              return {
                // eslint-disable-next-line no-underscore-dangle
                name: s._id || 'Other',
                y: yc,
              };
            });
            return data;
          })(),
        },
      ],
    };

    clickPlatformsOptions = {
      chart: {
        type: 'bar',
        height: 150,
        spacing: [0, 1, 1, 1],
      },
      title: {
        text: 'Platforms',
        margin: 0,
      },
      colors: ['#F54336', '#360F0C', '#DB3C30', '#75201A', '#B53128'],
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          groupPadding: 0,
          pointPadding: 0.001,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: 'Platforms',
          colorByPoint: true,
          data: (() => {
            // Calculate percentage of data.
            const sumCount = sum(linkInfo.platform, 'count');
            const data = linkInfo.platform.map(s => {
              const yc = (s.count / sumCount) * 100;
              return {
                // eslint-disable-next-line no-underscore-dangle
                name: s._id || 'Other',
                y: yc,
              };
            });
            return data;
          })(),
        },
      ],
    };

    clickBrowsersOptions = {
      chart: {
        type: 'bar',
        height: 150,
        spacing: [0, 1, 1, 1],
      },
      title: {
        text: 'Browsers',
        margin: 0,
      },
      colors: ['#F54336', '#360F0C', '#DB3C30', '#75201A', '#B53128'],
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          groupPadding: 0,
          pointPadding: 0.001,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: 'Browsers',
          colorByPoint: true,
          data: (() => {
            // Calculate percentage of data.
            const sumCount = sum(linkInfo.browser, 'count');
            const data = linkInfo.browser.map(s => {
              const yc = (s.count / sumCount) * 100;
              return {
                // eslint-disable-next-line no-underscore-dangle
                name: s._id || 'Other',
                y: yc,
              };
            });
            return data;
          })(),
        },
      ],
    };
    /** TODO: uncomment after finish link.social on dashboard.controller.js on backend
    clickSocialOptions = {
      chart: {
        type: 'bar',
        height: 200,
        spacing: [2, 2, 2, 2],
      },
      title: {
        text: 'Social',
        margin: 10,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          groupPadding: 0,
          pointPadding: 0.001,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: 'Social',
          colorByPoint: true,
          data: (() => {
            // Calculate percentage of data.
            const sumCount = sum(linkInfo.social, 'count');
            const data = linkInfo.social.map(s => {
              const yc = (s.count / sumCount) * 100;
              return {
                // eslint-disable-next-line no-underscore-dangle
                name: s._id || 'Other',
                y: yc,
              };
            });
            return data;
          })(),
        },
      ],
    };
    */
  }

  return (
    <React.Fragment>
      <Dialog
        open={openQrCode}
        onClose={handleQrClose}
        PaperComponent={PaperComponent}
        fullScreen={fullScreen}
      >
        <DialogTitle
          style={{ cursor: 'move', textAlign: 'center' }}
          id="draggable-dialog-title"
        >
          QR Code
        </DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleQrClose}
        >
          <CloseIcon />
        </IconButton>
        <div className={classes.qrCodeContainer}>
          <Fade
            in={qrCodeLoading}
            out={!qrCodeLoading}
            style={{
              transitionDelay: qrCodeLoading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress size={100} />
          </Fade>
          <div ref={qrCodeRef} />
        </div>
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
            {/* TODO: Make QR codes work */}
            <IconButton onClick={handleQrClick}>
              <CropFreeIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </DialogContent>
        {selectedData[0].numClicks > 0 ? (
          <DialogContent>
            <HighchartsReact
              constructorType="mapChart"
              highcharts={Highcharts}
              options={clickLocationOptions}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={clickRefOptions}
            />
            <div className={classes.chartContainer}>
              <div className={classes.halfChart}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={clickDevicesOptions}
                />
              </div>
              <div className={classes.halfChart}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={clickPlatformsOptions}
                />
              </div>
              <div className={classes.halfChart}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={clickBrowsersOptions}
                />
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </React.Fragment>
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
  linkInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChangeURI: PropTypes.func,
  onChangeDomain: PropTypes.func,
  onChangeSLink: PropTypes.func,
  onSubmitForm: PropTypes.func,
  setOpen: PropTypes.func,
  fetchLinkSuccess: PropTypes.bool,
  onClickGenShortlink: PropTypes.func,
  onLoadModal: PropTypes.func,
  onSocialShare: PropTypes.func,
  onSelectedDataChange: PropTypes.func,
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
  linkInfo: makeSelectLinkInfo(),
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
    onSelectedDataChange: () => {
      dispatch(getLinkInfo());
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
