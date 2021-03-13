import React from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
const useStyles = makeStyles(styles);

export default function CustomInput(props) {
    const classes = useStyles();
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
      value
    } = props;
  
    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });
    const marginTop = classNames({
      [classes.marginTop]: labelText === undefined
    });
    return (
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
      >
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Select
          native
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          value = {value}
          onChange={onchangeHandler}
          id={id}
        >
          <option aria-label="None" value="" />
          {dataList !== undefined ? (
          dataList.map((data) => <option  value={data._id}>{data.Name}</option>)
        ) : null}
        </Select>
        {error ? (
          <Clear className={classes.feedback + " " + classes.labelRootError} />
        ) : success ? (
          <Check className={classes.feedback + " " + classes.labelRootSuccess} />
        ) : null}
      </FormControl>
    );
  }
  
  CustomInput.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool
  };

 


