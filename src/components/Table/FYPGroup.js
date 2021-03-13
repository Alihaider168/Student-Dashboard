import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import TableCell from "@material-ui/core/TableCell";
import dateFormat from 'dateformat';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { AddAlert } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  let count = 0;
  const { tableHead, tableData, tableHeaderColor, fun ,deleteFYPGroup} = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            count ++;
            return (
              <TableRow key={prop._id} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell} key={prop.groupId}>
                      {prop.groupId}
               </TableCell>
               <TableCell className={classes.tableCell} key={prop.projectTitle}>
                      {prop.projectTitle}
               </TableCell>
               <TableCell className={classes.tableCell} key={prop.id}>
                      {prop.students.length}
               </TableCell>
               <TableCell className={classes.tableCell} key={prop.dept}>
                      {prop.dept}
               </TableCell>
               <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Edit"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick ={() => fun(prop)}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Close"
                  className={classes.tableActionButton}
                  onClick ={() => deleteFYPGroup(prop._id)}

                >
                  <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
