import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  let [vivaObj, setVivaObj] = useState({groupId:"N/A",vivaType: "N/A",status: "N/A",date: "N/A" ,time: "N/A",venue: "N/A" })
  useEffect(() => {
    var studobj = JSON.parse(localStorage.getItem('data'));
        axios.get(`http://localhost:3001/api/student/fetchGroupViva?_id=${studobj._id}`)
        .then(function (response) {
          if(response.data.data){
          vivaObj=response.data.data
          setVivaObj(vivaObj); }
          })
  }, []);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Viva Details</h4>
              <p className={classes.cardCategoryWhite}>Coming Viva Details</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    value={vivaObj.groupId}
                    // labelText="Group Id"
                    id="Dept"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    value={vivaObj.vivaType}
                    // labelText="Viva Type"
                    id="Batch"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    // labelText="Status"
                    value={vivaObj.status}
                    id="Section"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    value={vivaObj.venue}
                    // labelText="Venue"
                    id="Dept"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    value={vivaObj.time}
                    // labelText="Time"
                    id="Batch"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    // labelText="Date"
                    value= {vivaObj.date!=="N/A"?dateFormat(vivaObj.date, "dS mmmm yyyy"):"N/A"  }
                    id="Section"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            
            </CardBody>
          </Card>
        </GridItem></GridContainer>
    </div>
  );
}
