import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import IconButton from "@material-ui/core/IconButton";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/supervisor.js";
import Card from "components/Card/Card.js";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useState, useEffect } from 'react';
import axios from "axios";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
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
  const [supervisorList, setSupervisorList] = useState([]);
  const [ModalStatus, setModalStatus] = useState(false);
  const [sucessNotifications, setSucessNotifications] = useState(false);
  const [errorNotifications, setErrorNotifications] = useState(false);
  let [supervisorObj, setSupervisorObj] = useState({ teacherId: null, userName: null, password: null, Name: null, FathersName: null, Dept: null, SpecialField: null, Qualification: null, PhoneNo: null, Email: null, userImage: require('../../assets/img/faces/userIcon.jpg'), image: null});

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
        axios.get('http://localhost:3001/api/superAdmin/teacher')
        .then(function (response) {
          console.log(response.data.data)
          setSupervisorList(response.data.data.teachersList); 
          })
  }, []);

  function updateOpenModal(obj) {
    supervisorObj.userImage= `http://localhost:3001/api/loadImage?imageUrl=${obj.profileImage}`
    supervisorObj.userName = obj.userName
    supervisorObj.Name = obj.Name
    supervisorObj.teacherId = obj._id
    supervisorObj.FathersName = obj.FathersName
    supervisorObj.password = obj.password
    supervisorObj.Dept = obj.Dept
    supervisorObj.SpecialField = obj.SpecialField
    supervisorObj.PhoneNo = obj.PhoneNo
    supervisorObj.Email = obj.Email
    supervisorObj.Qualification = obj.Qualification
    setSupervisorObj(supervisorObj);
    setModalStatus(true)
  } 
  const onchangeHandler = event => {
    let newObj = { ...supervisorObj };
    if (event.target.id === "userName") {
        newObj.userName = event.target.value;
        return setSupervisorObj(newObj);
    }else if(event.target.id === "password"){
      newObj.password = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "Name"){
      newObj.Name = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "FathersName"){
      newObj.FathersName = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "Dept"){
      newObj.Dept = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "SpecialField"){
      newObj.SpecialField = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "PhoneNo"){
      newObj.PhoneNo = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "Qualification"){
      newObj.Qualification = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "Email"){
      newObj.Email = event.target.value;
      return setSupervisorObj(newObj);
    }else if(event.target.id === "myImage"){
      newObj.userImage = URL.createObjectURL(event.target.files[0]);
      newObj.image = event.target.files[0]
      return setSupervisorObj(newObj);
    }
};
  function openModal(e) {
    setModalStatus(true)
  }
  function closeModal(e) {
    setModalStatus(false)
    setSupervisorObj({ teacherId: null, userName: null, password: null, Name: null, FathersName: null, Dept: null, SpecialField: null, Qualification: null, PhoneNo: null, Email: null, userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})  
  }
  const formSubmitHandler = event => {
    let formData = supervisorObj
    if(supervisorObj.image)
    {
      formData = new FormData();
      formData.append('profileImage', supervisorObj.image);
      delete supervisorObj.image
      delete supervisorObj.userImage
      for ( var key in supervisorObj ) {
        formData.append(key, supervisorObj[key]);
    }
    }
    delete formData.userImage
  axios.post('http://localhost:3001/api/superAdmin/teacher', formData)
  .then(res => 
    {
      showNotification("br")
      axios.get('http://localhost:3001/api/superAdmin/teacher')
        .then(function (response) {
          setSupervisorList(response.data.data.teachersList); 
          })
          setSupervisorObj({ teacherId: null, userName: null, password: null, Name: null, FathersName: null, Dept: null, SpecialField: null, Qualification: null, PhoneNo: null, Email: null, userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})   
          setModalStatus(false)
    })
  .catch(e => 
    {
      showNotification("er")
      
    });
};
const updateSupervisor = event => {
  let formData = supervisorObj
  if(supervisorObj.image)
  {
    formData = new FormData();
    formData.append('profileImage', supervisorObj.image);
    delete supervisorObj.image
    delete supervisorObj.userImage
    for ( var key in supervisorObj ) {
      formData.append(key, supervisorObj[key]);
  }
  }
  delete formData.userImage
  console.log(formData)

axios.put('http://localhost:3001/api/superAdmin/teacher', formData)
.then(res => 
  {
    showNotification("br")
      axios.get('http://localhost:3001/api/superAdmin/teacher')
        .then(function (response) {
          setSupervisorList(response.data.data.teachersList); 
          })
          setSupervisorObj({ teacherId: null, userName: null, password: null, Name: null, FathersName: null, Dept: null, SpecialField: null, Qualification: null, PhoneNo: null, Email: null, userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})   
          setModalStatus(false)
  })
.catch(e => 
  {
    showNotification("er")
  });
};
const deleteSupervisor = id => {
  axios.delete(`http://localhost:3001/api/superAdmin/teacher?teacherId=${id}`)
.then(res => 
  {
    showNotification("br")
      axios.get('http://localhost:3001/api/superAdmin/teacher')
        .then(function (response) {
          setSupervisorList(response.data.data.teachersList); 
          })
          setSupervisorObj({ teacherId: null, userName: null, password: null, Name: null, FathersName: null, Dept: null, SpecialField: null, Qualification: null, PhoneNo: null, Email: null, userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})   
          setModalStatus(false)
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
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Supervisors Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete Supervisors profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              {supervisorList.map((object, i) => 
    <GridItem xs={12} sm={12} md={4}>
    <Card profile>
      <CardAvatar profile>
        <a href="#pablo" onClick={e => e.preventDefault()}>
          <img src={`http://localhost:3001/api/loadImage?imageUrl=${object.profileImage}`} alt="..." />
        </a>
      </CardAvatar>
      <CardBody profile>
      <h4 className={classes.cardTitle}>{object.Name}</h4>
              <h6 className={classes.cardCategory}>{object.SpecialField}</h6>
              <Button color="info" round onClick ={() => updateOpenModal(object)}>
              <LocalPhoneIcon/>
                Call
              </Button>
              <Button color="danger" round onClick ={() => updateOpenModal(object)}> 
              <MailOutlineIcon/>
                Email
              </Button>
      </CardBody>
      
    </Card>
  </GridItem>
    )}
              </GridContainer>
              </CardBody>
          </Card>
        </GridItem></GridContainer>
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
              <h4 className={classes.cardTitleWhite}>Supervisor Details</h4>
              <p className={classes.cardCategoryWhite}>Complete Supervisor profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
              <Card profile>
              <CardAvatar profile>
                <img src={supervisorObj.userImage} alt="..." />
             </CardAvatar>
           </Card>
              </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Phone #"
                    onchangeHandler = {onchangeHandler}
                    id="PhoneNo"
                    value={supervisorObj.PhoneNo}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Full Name"
                    onchangeHandler = {onchangeHandler}
                    id="Name"
                    value={supervisorObj.Name}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Father's Name"
                    onchangeHandler = {onchangeHandler}
                    id="FathersName"
                    value={supervisorObj.FathersName}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                
            </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email"
                    id="Email"
                    value={supervisorObj.Email}
                    onchangeHandler = {onchangeHandler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={supervisorObj.Dept}
                    labelText="Department"
                    onchangeHandler = {onchangeHandler}
                    id="Dept"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={supervisorObj.SpecialField}
                    labelText="SpecialField"
                    onchangeHandler = {onchangeHandler}
                    id="SpecialField"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Qualification"
                    value={supervisorObj.Qualification}

                    onchangeHandler = {onchangeHandler}
                    id="Qualification"
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