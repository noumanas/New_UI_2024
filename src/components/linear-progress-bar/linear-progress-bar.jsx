import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { linearProgressBarUseStyles } from '../../custom-mui-style/custom-mui-styles';

function LinearProgressWithLabel(props) {
  const classes = linearProgressBarUseStyles();

  return (
    <Box varient="div" component="div" sx={{ display: 'flex', alignItems: 'center' }} className={classes.root}>
      <Box varient="div" component="div" sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} sx={{ minWidth: 80 }} />
      </Box>
      <Box varient="div" component="div" sx={{ minWidth: 35 }}>
        <Typography sx={{ color: 'white' }} variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;
