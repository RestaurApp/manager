import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    fontSize: 'inherit',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400
  },
  label: {
    fontSize: 'inherit',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400
  },
  icon: {
    borderRadius: '50%',
    width: 17,
    height: 17,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#2089dc',
    backgroundImage: '#2089dc',
    '&:before': {
      display: 'block',
      width: 17,
      height: 17,
      backgroundImage: 'radial-gradient(#fff,#fff 30%,transparent 20%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#2089dc',
    },
  },
});

const StyledRadio = (props) => {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

const RadioButton = ({ action, label, state }) => {
  
  const classes = useStyles();
  return (
    <FormControlLabel
      checked={state}
      control={<StyledRadio />}
      label={label}
      onChange={action}
      classes={{
        label: classes.label,
      }}
    />
  );
};

export default RadioButton;
