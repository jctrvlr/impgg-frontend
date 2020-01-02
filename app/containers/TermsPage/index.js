/**
 *
 * TermsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/core/styles';

import Footer from 'components/Footer';
import Header from 'components/Header';

import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

import { logoutUser } from '../App/actions';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroHeadTopText: {
    paddingTop: '25%',
  },
}));

export function TermsPage({ userData, loggedIn, onLogoutClick }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>Terms of Service - ImpGG</title>
        <meta
          name="description"
          content="Create shortened links that work for you and your business. ImpGG is your one stop shop for shortening links, creating QR codes, powerful link analytics, and custom branded domains. Try ImpGG for free now!"
        />
      </Helmet>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
        background
      />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <h2>ImpGG Terms of Service</h2>
        <p>Last Updated: January, 2020</p>
        <h3>1. Terms</h3>
        <p>
          By accessing the website at{' '}
          <a href="https://impgg.com">https://impgg.com</a>, you are agreeing to
          be bound by these terms of service, all applicable laws and
          regulations, and agree that you are responsible for compliance with
          any applicable local laws. If you do not agree with any of these
          terms, you are prohibited from using or accessing this site. The
          materials contained in this website are protected by applicable
          copyright and trademark law.
        </p>
        <h3>2. Use License</h3>
        <ol type="a">
          <li>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on ImpGG&#39;s website for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
            <ol type="i">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on ImpGG&#39;s website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                transfer the materials to another person or &quot;mirror&quot;
                the materials on any other server.
              </li>
            </ol>
          </li>
          <li>
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by ImpGG at any time. Upon
            terminating your viewing of these materials or upon the termination
            of this license, you must destroy any downloaded materials in your
            possession whether in electronic or printed format.
          </li>
        </ol>
        <h3>3. Disclaimer</h3>
        <ol type="a">
          <li>
            The materials on ImpGG&#39;s website are provided on an &#39;as
            is&#39; basis. ImpGG makes no warranties, expressed or implied, and
            disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </li>
          <li>
            Further, ImpGG does not warrant or make any representations
            concerning the accuracy, likely results, or reliability of the use
            of the materials on its website or otherwise relating to such
            materials or on any sites linked to this site.
          </li>
        </ol>
        <h3>4. Limitations</h3>
        <p>
          In no event shall ImpGG or its suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit, or
          due to business interruption) arising out of the use or inability to
          use the materials on ImpGG&#39;s website, even if ImpGG or a ImpGG
          authorized representative has been notified orally or in writing of
          the possibility of such damage. Because some jurisdictions do not
          allow limitations on implied warranties, or limitations of liability
          for consequential or incidental damages, these limitations may not
          apply to you.
        </p>
        <h3>5. Accuracy of materials</h3>
        <p>
          The materials appearing on ImpGG&#39;s website could include
          technical, typographical, or photographic errors. ImpGG does not
          warrant that any of the materials on its website are accurate,
          complete or current. ImpGG may make changes to the materials contained
          on its website at any time without notice. However ImpGG does not make
          any commitment to update the materials.
        </p>
        <h3>6. Links</h3>
        <p>
          ImpGG has not reviewed all of the sites linked to its website and is
          not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by ImpGG of the site.
          Use of any such linked website is at the user&#39;s own risk.
        </p>
        <h3>7. Modifications</h3>
        <p>
          ImpGG may revise these terms of service for its website at any time
          without notice. By using this website you are agreeing to be bound by
          the then current version of these terms of service.
        </p>
        <h3>8. Governing Law</h3>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of California and you irrevocably submit to the
          exclusive jurisdiction of the courts in that State or location.
        </p>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

TermsPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TermsPage);
