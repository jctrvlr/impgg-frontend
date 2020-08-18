/* eslint-disable no-useless-escape */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  activePrice: {
    color: theme.palette.text.primary,
  },
  nonActivePrice: {
    color: theme.palette.text.secondary,
  },
  priceInput: {
    fontSize: '1.8em',
    lineHeight: '1.1',
  },
  confirmButton: {
    margin: theme.spacing(4),
  },
}));

export default function PriceInput({
  onChangePriceNumber,
  onChangePriceNumberClick,
  priceNumber,
  priceError,
  onSetPrice,
  update,
}) {
  const classes = useStyles();

  const onPriceClick = price => {
    onChangePriceNumberClick(price);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2} alignItems="center">
        <Grid xs={2} item>
          <FormControl size="small" className={classes.priceNumberInput}>
            <Input
              className={classes.priceInput}
              id="subscription-amount"
              value={priceNumber}
              onChange={onChangePriceNumber}
              error={priceError}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              inputProps={{
                // eslint-disable-next-line prettier/prettier
                pattern: '^\d+(?:\.\d{0,2})$',
              }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="1$"
            className={
              priceNumber === 1 ? classes.activePrice : classes.nonActivePrice
            }
            onClick={() => {
              onPriceClick(1);
            }}
          >
            1$
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="5$"
            className={
              priceNumber === 5 ? classes.activePrice : classes.nonActivePrice
            }
            onClick={() => {
              onPriceClick(5);
            }}
          >
            5$
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="10$"
            className={
              priceNumber === 10 ? classes.activePrice : classes.nonActivePrice
            }
            onClick={() => {
              onPriceClick(10);
            }}
          >
            10$
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="15$"
            className={
              priceNumber === 15 ? classes.activePrice : classes.nonActivePrice
            }
            onClick={() => {
              onPriceClick(15);
            }}
          >
            15$
          </IconButton>
        </Grid>
      </Grid>
      <Button
        className={classes.confirmButton}
        variant="contained"
        color="primary"
        onClick={onSetPrice}
      >
        {update ? 'Update price' : 'Set price'}
      </Button>
    </div>
  );
}

PriceInput.propTypes = {
  onChangePriceNumber: PropTypes.func,
  onChangePriceNumberClick: PropTypes.func,
  priceNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  priceError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSetPrice: PropTypes.func,
  update: PropTypes.bool,
};
