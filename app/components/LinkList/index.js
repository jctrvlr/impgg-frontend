/**
 *
 * LinkList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import shortid from 'shortid';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import FileCopy from '@material-ui/icons/FileCopy';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    textAlign: 'inherit',
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,
  },
  lItemText: {
    margin: 'auto',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '400px',
    [theme.breakpoints.up(768)]: {
      marginLeft: '56px',
    },
  },
  a: {
    color: 'transparent',
  },
  inp: {
    color: '#f44336',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '300px',
  },
}));

function LinkList({ uriHistory }) {
  const classes = useStyles();
  const baseUrl = 'http://localhost:3001/';

  const content = uriHistory.map((item, i) => {
    if (uriHistory.length - 1 === i) {
      return (
        <React.Fragment key={shortid.generate()}>
          <ListItem alignItems="flex-start" className={classes.li}>
            <ListItemText className={classes.lItemText} primary={item.url} />
            <ListItemText
              className={classes.lItemText}
              primary={
                <a className={classes.a} href={baseUrl + item.shortLink}>
                  <Input
                    fullWidth
                    id={shortid.generate()}
                    value={baseUrl + item.shortLink}
                    readOnly
                    disableUnderline
                    className={classes.inp}
                  />
                </a>
              }
            />
            <ListItemIcon>
              <CopyToClipboard text={baseUrl + item.shortLink}>
                <IconButton aria-label="copy">
                  <FileCopy />
                </IconButton>
              </CopyToClipboard>
            </ListItemIcon>
          </ListItem>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={shortid.generate()}>
        <ListItem alignItems="flex-start" className={classes.li}>
          <ListItemText className={classes.lItemText} primary={item.url} />
          <ListItemText
            className={classes.lItemText}
            primary={
              <a className={classes.a} href={baseUrl + item.shortLink}>
                <Input
                  fullWidth
                  id={shortid.generate()}
                  value={baseUrl + item.shortLink}
                  readOnly
                  disableUnderline
                  className={classes.inp}
                />
              </a>
            }
          />
          <ListItemIcon>
            <CopyToClipboard text={baseUrl + item.shortLink}>
              <IconButton aria-label="copy">
                <FileCopy />
              </IconButton>
            </CopyToClipboard>
          </ListItemIcon>
        </ListItem>
        <Divider variant="middle" />
      </React.Fragment>
    );
  });

  return (
    <div>
      <List className={classes.root}>{content}</List>
    </div>
  );
}

LinkList.propTypes = {
  uriHistory: PropTypes.array,
};

export default LinkList;
