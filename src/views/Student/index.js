import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/student.js";
import Card from "components/Card/Card.js";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
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
  const [studentList, setstudentList] = useState([]);
  const [ModalStatus, setModalStatus] = useState(false);
  const [sucessNotifications, setSucessNotifications] = useState(false);
  const [errorNotifications, setErrorNotifications] = useState(false);
  let [studentObj, setStudentObj] = useState({ studId: null, userName: null, password: null, Name: null, FathersName: null, Dept: null, Batch: null, Section: null, RollNo: null, 
    userImage: require('../../assets/img/faces/userIcon.jpg'), image: null});

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
        axios.get('http://localhost:3001/api/superAdmin/student')
        .then(function (response) {
          setstudentList(response.data.data.studentsList); 
          })
  }, []);

  function updateOpenModal(obj) {
    console.log(obj)
    studentObj.userImage= `http://localhost:3001/api/loadImage?imageUrl=${obj.profileImage}`
    studentObj.userName = obj.userName
    studentObj.Name = obj.Name
    studentObj.studId = obj._id
    studentObj.FathersName = obj.FathersName
    studentObj.password = obj.password
    studentObj.Dept = obj.Dept
    studentObj.Batch = obj.Batch
    studentObj.Section = obj.Section
    studentObj.RollNo = obj.RollNo
    setStudentObj(studentObj);
    setModalStatus(true)
  } 
  const onchangeHandler = event => {
    let newObj = { ...studentObj };
    if (event.target.id === "userName") {
        newObj.userName = event.target.value;
        return setStudentObj(newObj);
    }else if(event.target.id === "password"){
      newObj.password = event.target.value;
      return setStudentObj(newObj);
    }else if(event.target.id === "Name"){
      newObj.Name = event.target.value;
      return setStudentObj(newObj);
    }else if(event.target.id === "FathersName"){
      newObj.FathersName = event.target.value;
      return setStudentObj(newObj);
    }else if(event.target.id === "Dept"){
      newObj.Dept = event.target.value;
      return setStudentObj(newObj);
    }else if(event.target.id === "Batch"){
      newObj.Batch = event.target.value;
      return setStudentObj(newObj);
    }else if(event.target.id === "Section"){
      newObj.Section = event.target.value;
      return setStudentObj(newObj);
    }else if(event.target.id === "RollNo"){
      newObj.RollNo = event.target.value;
      return setStudentObj(newObj);
    }else if(event.target.id === "myImage"){
      newObj.userImage = URL.createObjectURL(event.target.files[0]);
      newObj.image = event.target.files[0]
      return setStudentObj(newObj);
    }
};
  function openModal(e) {
    setModalStatus(true)
  }
  function closeModal(e) {
    setModalStatus(false)
    setStudentObj({ userName: null, password: null, Name: null, FathersName: null, Dept: null, Batch: null, Section: null, RollNo: null, 
      userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})  
  }
  const formSubmitHandler = event => {
    let formData = studentObj
    if(studentObj.image)
    {
      formData = new FormData();
      formData.append('profileImage', studentObj.image);
      delete studentObj.image
      delete studentObj.userImage
      for ( var key in studentObj ) {
        formData.append(key, studentObj[key]);
    }
    }
    delete formData.userImage
  axios.post('http://localhost:3001/api/superAdmin/student', formData)
  .then(res => 
    {
      showNotification("br")
      axios.get('http://localhost:3001/api/superAdmin/student')
        .then(function (response) {
          setstudentList(response.data.data.studentsList); 
          })
       setStudentObj({ userName: null, password: null, Name: null, FathersName: null, Dept: null, Batch: null, Section: null, RollNo: null, 
        userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})   
      setModalStatus(false)
    })
  .catch(e => 
    {
      showNotification("er")
      
    });
};
const updateStudent = event => {
  let formData = studentObj
  if(studentObj.image)
  {
    formData = new FormData();
    formData.append('profileImage', studentObj.image);
    delete studentObj.image
    delete studentObj.userImage
    for ( var key in studentObj ) {
      formData.append(key, studentObj[key]);
  }
  }
  delete formData.userImage
  console.log(formData)

axios.put('http://localhost:3001/api/superAdmin/student', formData)
.then(res => 
  {
    showNotification("br")
    axios.get('http://localhost:3001/api/superAdmin/student')
      .then(function (response) {
        setstudentList(response.data.data.studentsList); 
        })
     setStudentObj({ userName: null, password: null, Name: null, FathersName: null, Dept: null, Batch: null, Section: null, RollNo: null, 
      userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})   
    setModalStatus(false)
  })
.catch(e => 
  {
    showNotification("er")
  });
};
const deleteStudent = id => {
  axios.delete(`http://localhost:3001/api/superAdmin/student?studId=${id}`)
.then(res => 
  {
    showNotification("br")
    axios.get('http://localhost:3001/api/superAdmin/student')
      .then(function (response) {
        setstudentList(response.data.data.studentsList); 
        })
     setStudentObj({ userName: null, password: null, Name: null, FathersName: null, Dept: null, Batch: null, Section: null, RollNo: null, 
      userImage: require('../../assets/img/faces/userIcon.jpg'), image: null})   
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
      <Button round color="info" onClick={openModal}>Add New Students</Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Students Table</h4>
            <p className={classes.cardCategoryWhite}>
              All Students That are Eligible for this year FYP
            </p>
          </CardHeader>
          <CardBody>
            <Table
              fun = {updateOpenModal}
              deleteStudent = {deleteStudent}
              tableHeaderColor="primary"
              tableHead={["RollNo","Name", "FathersName", "Dept", "Batch", "Section", "Action"]}
              tableData={studentList}
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
              <h4 className={classes.cardTitleWhite}>{studentObj.studId? "update Student":"Add New Student"}</h4>
              <p className={classes.cardCategoryWhite}>Complete Student profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
              <Card profile>
              <CardAvatar profile>
                <img src={studentObj.userImage} alt="..." />
             </CardAvatar>
           </Card>
           <input type="file" id="myImage" onChange={onchangeHandler}  />
              </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="RollNo"
                    id="RollNo"
                    value={studentObj.RollNo}
                    onchangeHandler = {onchangeHandler}
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
                    value={studentObj.Name}
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
                    value={studentObj.FathersName}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
            </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="UserName"
                    id="userName"
                    value={studentObj.userName}
                    onchangeHandler = {onchangeHandler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    value={studentObj.password}
                    onchangeHandler = {onchangeHandler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={studentObj.Dept}
                    labelText="Department"
                    onchangeHandler = {onchangeHandler}
                    id="Dept"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    value={studentObj.Batch}
                    labelText="Batch"
                    onchangeHandler = {onchangeHandler}
                    id="Batch"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Section"
                    value={studentObj.Section}

                    onchangeHandler = {onchangeHandler}
                    id="Section"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="info"
               onClick={studentObj.studId? updateStudent:formSubmitHandler }>
                 {studentObj.studId? "update":"Save"}</Button>

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