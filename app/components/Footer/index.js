/**
 *
 * Footer
 *
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import HeartIcon from '@material-ui/icons/Favorite';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  footerContainer: {
    backgroundColor: '#E31837',
    color: '#fff',
    lineHeight: '1.5',
  },
  footerMain: {
    padding: '1.25rem 1.875rem',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up(477)]: {
      justifyContent: 'space-around',
    },
    [theme.breakpoints.up(1240)]: {
      justifyContent: 'space-evenly',
    },
  },
  footerMainItem: {
    padding: '1.25rem',
    minWidth: '12.5rem',
  },
  footerSocial: {
    padding: '0 1.875rem 1.25rem',
  },
  footerSecondaryColor: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  socialList: {
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px #777 solid',
    paddingTop: '1.25rem',
  },
  socialListItem: {
    margin: '0.5rem',
    fontSize: '1.25rem',
  },
  footerLegal: {
    padding: '0.9375rem 1.875rem',
    width: '100%',
    flexWrap: 'wrap',
  },
  topButton: {
    width: '100%',
    marginBottom: '40px',
    backgroundColor: '#f44336',
    '&:hover': {
      opacity: '0.85',
    },
  },
  toTopSpan: {
    display: 'block',
    textAlign: 'center',
    color: '#fff',
    padding: '15px 0',
    lineHeight: '19px',
    fontSize: '13px',
  },
}));

function Footer() {
  const classes = useStyles();

  const moveToTop = () => {
    document.getElementById('nav-top').scrollIntoView();
  };

  return (
    <footer className={classes.footerContainer}>
      <section className={classes.topButton}>
        <div
          className={classes.toTopSpan}
          onClick={() => moveToTop()}
          onKeyPress={moveToTop}
          role="button"
          tabIndex={0}
        >
          Back to top
        </div>
      </section>
      <section className={classes.footerMain}>
        <div className={classes.footerMainItem}>
          <Typography variant="h4">ImpGG</Typography>
          <ul>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/about"
                component={RouterLink}
              >
                <Typography variant="body2">About</Typography>
              </Link>
            </li>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/pricing"
                component={RouterLink}
              >
                <Typography variant="body2">Pricing</Typography>
              </Link>
            </li>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/blog"
                component={RouterLink}
              >
                <Typography variant="body2">Blog</Typography>
              </Link>
            </li>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/terms"
                component={RouterLink}
              >
                <Typography variant="body2">Terms</Typography>
              </Link>
            </li>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/privacy"
                component={RouterLink}
              >
                <Typography variant="body2">Privacy</Typography>
              </Link>
            </li>
          </ul>
        </div>
        {/*
        <div className={classes.footerMainItem}>
          <Typography variant="h4">Resources</Typography>
          <ul>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/documentation"
                component={RouterLink}
              >
                <Typography variant="body2">Docs</Typography>
              </Link>
            </li>
          </ul>
        </div>
        */}
        <div className={classes.footerMainItem}>
          <Typography variant="h4">Contact</Typography>
          <ul>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/help"
                component={RouterLink}
              >
                <Typography variant="body2">Help</Typography>
              </Link>
            </li>
            <li>
              <Link
                className={classes.footerSecondaryColor}
                to="/contact"
                component={RouterLink}
              >
                <Typography variant="body2">Contact Us</Typography>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className={classes.footerSocial}>
        <ul className={classes.socialList}>
          <li className={classes.socialListItem}>
            <Link color="inherit" href="https://facebook.com/impdotgg">
              <FacebookIcon />
            </Link>
          </li>
          <li className={classes.socialListItem}>
            <Link color="inherit" href="https://twitter.com/impdotgg">
              <TwitterIcon />
            </Link>
          </li>
          <li className={classes.socialListItem}>
            <Link color="inherit" href="https://instagram.com/impdotgg">
              <InstagramIcon />
            </Link>
          </li>
        </ul>
      </section>
      <section className={classes.footerLegal}>
        <Typography variant="body2" align="center">
          {'Made with '} <HeartIcon /> {' on Earth'}
        </Typography>
      </section>
    </footer>
  );
}

export default Footer;
