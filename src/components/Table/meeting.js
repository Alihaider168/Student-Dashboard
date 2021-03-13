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
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  const { tableHead, tableData, tableHeaderColor, updateOpenModal ,deleteViva} = props;
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
               <TableCell className={classes.tableCell} key={prop.meetingTitle}>
                      {prop.meetingTitle}
               </TableCell>
               <TableCell className={classes.tableCell} key={prop.venue}>
                      {prop.venue}
               </TableCell>
               <TableCell className={classes.tableCell} key={prop.time}>
                      {prop.time}
               </TableCell>
               <TableCell className={classes.tableCell} key={prop.date}>
               {dateFormat(prop.date, "dS mmmm yyyy")  }
               </TableCell>
               <TableCell className={classes.tableCell} key={prop.status}>
                      {prop.status}
               </TableCell>
               <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="View Meeting"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <VisibilityIcon
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick ={() => updateOpenModal(prop)}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </VisibilityIcon>
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
