import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import PeopleOutlineSharpIcon from '@material-ui/icons/PeopleOutlineSharp';
import WbIncandescentSharpIcon from '@material-ui/icons/WbIncandescentSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import NotesSharpIcon from '@material-ui/icons/NotesSharp';
import axios from "axios";
import { useState, useEffect } from 'react';
// core components
import dateFormat from 'dateformat';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { resolveModuleName } from "typescript";
import { ContactlessSharp, DataUsageTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default  function Dashboard() {
  const classes = useStyles();
  const [ideasList, setIdeasList] = useState([]);
  const [studentList, setstudentList] = useState([]);
  const [teacherList, setteacherList] = useState([]);
  let [fypdata, setfypdata] = useState({});
  let [vivadata, setVivadata] = useState({});
  useEffect(() => {
        var studobj = JSON.parse(localStorage.getItem('data'));
        console.log(studobj._id);
        axios.get('http://localhost:3001/api/superAdmin/idea')
        .then(function (response) {
          setIdeasList(response.data.data.ideasList);
          axios.get(`http://localhost:3001/api/student/fetchGroup?_id=${studobj._id}`)
        .then(function (response) {
          fypdata= response.data.data
          setfypdata(fypdata); 
          axios.get(`http://localhost:3001/api/student/fetchGroupViva?_id=${studobj._id}`)
          .then(function (response) {
            vivadata = response.data.data
            setVivadata(vivadata)
          }) 
          }) 
          })
  }, []);
  
  return (
    <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <WbIncandescentSharpIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Ideas</p>
                <h3 className={classes.cardTitle}>
                {ideasList.length} 
                </h3>
              </CardHeader>
              <CardFooter stats>
              <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <AccountCircleSharpIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Group Id</p>
                <h3 className={classes.cardTitle}>{fypdata?fypdata.groupId:"N/A"}</h3>
              </CardHeader>
              <CardFooter stats>
              <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <PeopleOutlineSharpIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Coming Viva</p>
                <h3 className={classes.cardTitle}>{vivadata?dateFormat(vivadata.date, "dS mmm"):"N/A"  }</h3>
              </CardHeader>
              <CardFooter stats>
              <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <NotesSharpIcon />
                </CardIcon>
                <p className={classes.cardCategory}>FYP Grade</p>
                <h3 className={classes.cardTitle}>N/A</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer><GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Ideas Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New ideas onWard January, 2021
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Id","Title", "Creator", "Date", "Action"]}
                  tableData={ideasList}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
  );

}
