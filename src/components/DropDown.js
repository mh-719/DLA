import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  formControl: {
    minWidth: ({ width }) => width,
  },
  select: {
    backgroundColor: '#e0e5f0',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingLeft: 10,
  },
  label: {
    color: '#000000',
    fontWeight: 700,
  },
});

const DropDown = ({ width, options, selection, label }) => {
  const classes = useStyles({ width });
  const [item, setItem] = useState(options[0].item);

  const handleChange = (event) => {
    setItem(event.target.value);
    selection.current = event.target.value;

    const resetButton = document.getElementById('ResetButton');
    resetButton.click();
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        className={classes.select}
        value={item}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.label} value={option.item}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className={classes.label}>
        {label}
      </FormHelperText>
    </FormControl>
  );
};

DropDown.propTypes = {
  width: PropTypes.number,
  options: PropTypes.array,
  selection: PropTypes.object,
  label: PropTypes.string,
};

export default DropDown;
