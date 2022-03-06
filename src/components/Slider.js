import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MUISlider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  label: {
    color: '#000000',
    fontWeight: 700,
  },
});

const valueText = (value) => ((value === 1) ? '1.00' : value);

const Slider = ({ probability }) => {
  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    probability.current = newValue;
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography
            className={classes.label}
            id="slider-label"
            variant="caption"
          >
            Probability of particle sticking:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {valueText(value)}
          </Typography>
        </Grid>
      </Grid>
      <MUISlider
        aria-labelledby="slider-label"
        min={0.01}
        max={1}
        step={0.01}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

Slider.propTypes = {
  probability: PropTypes.object,
};

export default Slider;
