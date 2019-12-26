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
    display: 'flex',
    width: '100%',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footerContainer}>
      <section className={classes.footerMain}>
        <div className={classes.footerMainItem}>
          <Typography variant="h2" align="center" color="textPrimary">
            About
          </Typography>
          <ul>
            <li>
              <Link color="inherit" to="/features" component={RouterLink}>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Features
                </Typography>
              </Link>
            </li>
            <li>
              <Link color="inherit" to="/pricing" component={RouterLink}>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Pricing
                </Typography>
              </Link>
            </li>
          </ul>
        </div>

        <div className={classes.footerMainItem}>
          <Typography variant="h2" align="center" color="textPrimary">
            Resources
          </Typography>
          <ul>
            <li>
              <Link color="inherit" to="/documentation" component={RouterLink}>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Docs
                </Typography>
              </Link>
            </li>
            <li>
              <Link color="inherit" href="https://blog.impgg.com">
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Blog
                </Typography>
              </Link>
            </li>
          </ul>
        </div>

        <div className={classes.footerMainItem}>
          <Typography variant="h2" align="center" color="textPrimary">
            Contact
          </Typography>
          <ul>
            <li>
              <Link color="inherit" to="/help" component={RouterLink}>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Help
                </Typography>
              </Link>
            </li>
            <li>
              <Link color="inherit" to="/contact" component={RouterLink}>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Contact Us
                </Typography>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className={classes.footerSocial}>
        <ul className={classes.socialList}>
          <li>
            <Link href="https://facebook.com/impdotgg">
              <FacebookIcon />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/impdotgg">
              <TwitterIcon />
            </Link>
          </li>
          <li>
            <Link href="https://instagram.com.com/impdotgg">
              <InstagramIcon />
            </Link>
          </li>
        </ul>
      </section>
      <section className={classes.footerLegal}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Made with '} <HeartIcon /> {' on Earth'}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link color="inherit" to="/" component={RouterLink}>
            ImpGG
          </Link>
        </Typography>
      </section>
    </footer>
  );
}

export default Footer;
