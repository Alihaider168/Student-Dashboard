import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
const useStyles = makeStyles(styles);

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        dataList,
        success,
        onchangeHandler,
        value,
        personName,
        handleChange
      } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event) => {
  //   setPersonName(event.target.value);
  //   console.log(personName)
  // };

  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setPersonName(value);
  // };

  return (
    <div>
      <FormControl  {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Viva Panel</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
        //   MenuProps={MenuProps}
        >
          {dataList.map((name) => (
            <MenuItem key={name._id} value={name._id} style={getStyles(name.Name, personName, theme)}>
              {name.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
  );
}
