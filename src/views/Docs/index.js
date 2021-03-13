import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/docTable.js";
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
  var studobj = JSON.parse(localStorage.getItem('data'));
  const classes = useStyles();
  let [docsList, setDocList] = useState([]);
  const [ModalStatus, setModalStatus] = useState(false);
  const [studentObj, setStudentObj ]= useState({});
  const [sucessNotifications, setSucessNotifications] = useState(false);
  const [errorNotifications, setErrorNotifications] = useState(false);
  let [docObj, setDocObj] = useState({ studId: studobj._id, teacherId: null, groupId: null, doc: null,title: null});
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
            let newObj = { ...docObj };
            newObj.groupId = response.data.data.groupId
            newObj.teacherId = response.data.data.teacherId
            setDocObj(newObj)
            console.log(`response.data.data.groupId = ${response.data.data.groupId}`)
            axios.get(`http://localhost:3001/api/student/docs?groupId=${response.data.data.groupId}`)
        .then(function (response) {
          docsList= response.data.data.docList
          setDocList(docsList); 
            })}

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
    console.log(docObj)
    let newObj = { ...docObj };
    if (event.target.id === "title") {
        newObj.title = event.target.value;
        return setDocObj(newObj);
    }else if(event.target.id === "doc"){
      newObj.doc = event.target.files[0]
      return setDocObj(newObj);
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
    let formData = docObj
      formData = new FormData();
      formData.append('doc', docObj.doc);
      delete docObj.doc
      for ( var key in docObj ) {
        formData.append(key, docObj[key]);
    }
    console.log(formData)
  axios.post('http://localhost:3001/api/student/docs', formData)
  .then(res => 
    {
      axios.get(`http://localhost:3001/api/student/fetchGroup?_id=${studobj._id}`)
      .then(function (response) {
        if( response.data.data){
        let newObj = { ...docObj };
        newObj.groupId = response.data.data.groupId
        newObj.teacherId = response.data.data.teacherId
        setDocObj(newObj)
        console.log(`response.data.data.groupId = ${response.data.data.groupId}`)
        axios.get(`http://localhost:3001/api/student/docs?groupId=${response.data.data.groupId}`)
    .then(function (response) {
      docsList= response.data.data.docList
      setDocList(docsList); 
        })}

      })
          setDocObj({ studId: studobj._id, teacherId: null, groupId: null, doc: null,title: null})   
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
        // setstudentList(response.data.data.studentsList); 
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
        // setstudentList(response.data.data.studentsList); 
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
      <Button round color="info" onClick={openModal}>Add New Document</Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Documents Table</h4>
            <p className={classes.cardCategoryWhite}>
              All Submited docs
            </p>
          </CardHeader>
          <CardBody>
            <Table
              fun = {updateOpenModal}
              tableHeaderColor="primary"
              tableHead={["Title","groupId","Date", "Action"]}
              tableData={docsList}
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
              <h4 className={classes.cardTitleWhite}>"Add New Document"</h4>
              <p className={classes.cardCategoryWhite}>documents Details</p>
            </CardHeader>
            <CardBody>
              <GridContainer><GridItem xs={12} sm={12} md={4}>
           <input type="file" id="doc" onChange={onchangeHandler}  />
              </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Title"
                    onchangeHandler = {onchangeHandler}
                    id="title"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem></GridContainer>
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