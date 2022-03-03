import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    fontWeight: 700,
    marginBottom: 20,
  },
});

const Title = () => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.title}
      align="center"
      variant="h5"
    >
      Diffusion-Limited Aggregation
    </Typography>
  );
};

export default Title;
