import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/meeting.js";
import Card from "components/Card/Card.js";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TeacherDropdown from "components/CustomInput/teacherMultiDropdown.js";
import FypDropdown from "components/CustomInput/FypDropdown.js";
import Datepicker from "components/CustomInput/Datepicker.js";
import { useState, useEffect } from 'react';
import axios from "axios";
import Button from "components/CustomButtons/Button.js";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Modal from '@material-ui/core/Modal';
import Snackbar from "components/Snackbar/Snackbar.js";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [VIVAList, setVIVAList] = useState([]);
  const [FYPGroupList, setFYPGroupList] = useState([]);
  const [ModalStatus, setModalStatus] = useState(false);
  const [sucessNotifications, setSucessNotifications] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  var teacherobj = JSON.parse(localStorage.getItem('data'));
  var studobj = JSON.parse(localStorage.getItem('data'));
  const [teacherList, setTeacherList] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState(false);
  let [VIVAObj, setVIVAObj] = useState({
    meetingId: null, meetingTitle: null, groupId: null, status: null, venue: null, 
    time: null,date: new Date().toISOString().substring(0, 10), teacherId: teacherobj._id});

const showNotification = place => {
    switch (place) {
      case "br":
        if (!sucessNotifications) {
          setSucessNotifications(true);
          setTimeout(function() {
            setSucessNotifications(false);
          }, 2000);
        }
        break;
        case "er":
        if (!errorNotifications) {
          setErrorNotifications(true);
          setTimeout(function() {
            setErrorNotifications(false);
          }, 2000);
        }
        break;
    }
  };    
  useEffect(() => {

    axios.get(`http://localhost:3001/api/student/fetchGroup?_id=${studobj._id}`)
    .then(function (response) {
      if( response.data.data){
        setFYPGroupList([response.data.data.groupId])
      axios.get(`http://localhost:3001/api/student/fetchMeetings?groupId=${response.data.data.groupId}`)
  .then(function (response) {
    setVIVAList(response.data.data.meetingList); 
      })}

    })
  }, []);
  const handleChange = (event) => {
    return setPersonName(event.target.value);
  };
  function updateOpenModal(obj) {
    VIVAObj.meetingId = obj._id
    VIVAObj.meetingTitle = obj.meetingTitle
    VIVAObj.groupId = obj.groupId
    VIVAObj.status = obj.status
    VIVAObj.venue = obj.venue
    VIVAObj.time = obj.time
    VIVAObj.date = new Date(obj.date).toISOString().substring(0, 10)
    setPersonName(obj.teachers)
    setVIVAObj(VIVAObj);
    setModalStatus(true)
  } 
  const onchangeHandler = event => {
    let newObj = { ...VIVAObj };
    if (event.target.id === "meetingTitle") {
        newObj.meetingTitle = event.target.value;
        return setVIVAObj(newObj);
    }else if(event.target.id === "groupId"){
      newObj.groupId = event.target.value;
      return setVIVAObj(newObj);
    }else if(event.target.id === "status"){
      newObj.status = event.target.value;
      return setVIVAObj(newObj);
    }else if(event.target.id === "venue"){
      newObj.venue = event.target.value;
      return setVIVAObj(newObj);
    }else if(event.target.id === "time"){
      newObj.time = event.target.value;
      return setVIVAObj(newObj);
    }else if(event.target.id === "date"){
      newObj.date = event.target.value;
      return setVIVAObj(newObj);
    }
};
  function openModal(e) {
    setModalStatus(true)
  }
  function closeModal(e) {
    setModalStatus(false)
    setVIVAObj({
      meetingId: null, vivaType: null, groupId: null, status: null, venue: null, time: null, date: null, teachers:null}); 
  }
  const formSubmitHandler = event => {
    let newObj = { ...VIVAObj };
    newObj.teachers = personName
  axios.post('http://localhost:3001/api/teacher/addMeeting', newObj)
  .then(res => 
    {
      showNotification("br")
      setVIVAObj({
        meetingId: null, meetingTitle: null, groupId: null, status: null, venue: null, time: null, date: new Date().toISOString().substring(0, 10), teacherId:teacherobj._id});
      axios.get(`http://localhost:3001/api/teacher/fetchMeetings?teacherId=${teacherobj._id}`)
      .then(function (response) {
        setVIVAList(response.data.data.meetingList); 
          })
          setModalStatus(false)
         
    })
  .catch(e => 
    {
      showNotification("er")
      
    });
};
const updateViva = event => {
  let newObj = { ...VIVAObj };
  // newObj.teachers = personName
  axios.put('http://localhost:3001/api/teacher/updateMeeting', newObj)
  .then(res => 
    {
      showNotification("br")
      axios.get(`http://localhost:3001/api/teacher/fetchMeetings?teacherId=${teacherobj._id}`)
        .then(function (response) {
          setVIVAList(response.data.data.meetingList); 
          })
          setModalStatus(false)
          setVIVAObj({
            meetingId: null, meetingTitle: null, groupId: null, status: null, venue: null, 
            time: null,date: new Date().toISOString().substring(0, 10), teacherId: teacherobj._id});
    })
.catch(e => 
  {
    showNotification("er")
  });
};
const deleteViva = id => {
  axios.delete(`http://localhost:3001/api/teacher/deleteMeeting?meetingId=${id}`)
.then(res => 
  {
    showNotification("br")
    axios.get(`http://localhost:3001/api/teacher/fetchMeetings?teacherId=${teacherobj._id}`)
    .then(function (response) {
      setVIVAList(response.data.data.meetingList); 
          })
          setModalStatus(false)
          setVIVAObj({
            meetingId: null, meetingTitle: null, groupId: null, status: null, venue: null, 
            time: null,date: new Date().toISOString().substring(0, 10), teacherId: teacherobj._id});
  })
.catch(e => 
  {
    showNotification("er")
  });
};



  return (
    <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
        <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Meeting details</h4>
            <p className={classes.cardCategoryWhite}>
              All Meetings
            </p>
          </CardHeader>
          <CardBody>
            <Table
              updateOpenModal = {updateOpenModal}
              deleteViva = {deleteViva}
              tableHeaderColor="primary"
              tableHead={["Group Id","Title", "venue", "time", "date","Remarks", "Action"]}
              tableData={VIVAList}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    {ModalStatus &&       
    <Modal
    open={ModalStatus}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <GridContainer>
        <GridItem xs={3} sm={3} md={3}><div></div></GridItem>
          <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>{VIVAObj.vivaId? "update Meeting":"Add New Meeting"}</h4>
              <p className={classes.cardCategoryWhite}>Complete Meeting Entry</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                   labelText="Group Id"
                   id="groupId"
                   value={VIVAObj.groupId}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="meetingTitle"
                    onchangeHandler = {onchangeHandler}
                    id="meetingTitle"
                    value={VIVAObj.meetingTitle}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                  <Datepicker
                    labelText="Date"
                    id="date"
                    value={VIVAObj.date}
                    onchangeHandler = {onchangeHandler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                </GridContainer>
              <GridContainer>
                
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Venue"
                    onchangeHandler = {onchangeHandler}
                    id="venue"
                    value={VIVAObj.venue}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Time"
                    id="time"
                    value={VIVAObj.time}
                    onchangeHandler = {onchangeHandler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    value={VIVAObj.status}
                    labelText="Remarks"
                    onchangeHandler = {onchangeHandler}
                    id="status"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              </CardBody>
            <CardFooter>
              <Button onClick={closeModal} color="danger"> Close</Button>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
  </Modal>}
  <div>
    
  <Snackbar
   place="br"
   color="success"
   icon={CheckCircleIcon}
   message="SUCCESS"
   open={sucessNotifications}
   closeNotification={() => setSucessNotifications(false)}
   close
   />
   <Snackbar
   place="er"
   color="danger"
   icon={ErrorOutlineIcon}
   message="ERROR"
   open={errorNotifications}
   closeNotification={() => setErrorNotifications(false)}
   close
   />
  </div>
    </div>
  );
}