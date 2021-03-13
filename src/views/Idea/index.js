import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/idea.js";
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
  const [ideaList, setIdeaList] = useState([]);
  var studobj = JSON.parse(localStorage.getItem('data'));
  const [ModalStatus, setModalStatus] = useState(false);
  const [sucessNotifications, setSucessNotifications] = useState(false);
  const [errorNotifications, setErrorNotifications] = useState(false);
  let [ideaObj, setideaObj] = useState({ ideaId: null, title: null, description: null, created_by: `${studobj.Name} (${studobj.RollNo})`, creater_id: studobj._id});
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
        axios.get('http://localhost:3001/api/superAdmin/idea')
        .then(function (response) {
          setIdeaList(response.data.data.ideasList); 
          })
  }, []);

  function updateOpenModal(obj) {
    ideaObj.ideaId = obj._id
    ideaObj.title = obj.title
    ideaObj.description = obj.description
    ideaObj.created_by = obj.created_by
    ideaObj.creater_id = obj.creater_id
    setideaObj(ideaObj);
    setModalStatus(true)
  } 
  const onchangeHandler = event => {
    let newObj = { ...ideaObj };
    if (event.target.id === "title") {
        newObj.title = event.target.value;
        return setideaObj(newObj);
    }else if(event.target.id === "description"){
      newObj.description = event.target.value;
      return setideaObj(newObj);
    }else if(event.target.id === "created_by"){
      newObj.created_by = event.target.value;
      return setideaObj(newObj);
    }else if(event.target.id === "creater_id"){
      newObj.creater_id = event.target.value;
      return setideaObj(newObj);
    }
};
  function openModal(e) {
    setModalStatus(true)
  }
  function closeModal(e) {
    setModalStatus(false)
    setideaObj({ ideaId: null, title: null, description: null, created_by: null, creater_id: null})  
  }
  const formSubmitHandler = event => {
      console.log(ideaObj)
  axios.post('http://localhost:3001/api/superAdmin/idea', ideaObj)
  .then(res => 
    {
      console.log(res)
      showNotification("br")
      axios.get('http://localhost:3001/api/superAdmin/idea')
        .then(function (response) {
          setIdeaList(response.data.data.ideasList); 
      })
      setideaObj({ ideaId: null, title: null, description: null, created_by: null, creater_id: null})  
      setModalStatus(false)
    })
  .catch(e => 
    {
      showNotification("er")
      
    });
};
const updateIdea = event => {
axios.put('http://localhost:3001/api/superAdmin/idea', ideaObj)
.then(res => 
  {
    showNotification("br")
    axios.get('http://localhost:3001/api/superAdmin/idea')
      .then(function (response) {
        setIdeaList(response.data.data.ideasList); 
    })
    setideaObj({ ideaId: null, title: null, description: null, created_by: null, creater_id: null})  
    setModalStatus(false)
  })
.catch(e => 
  {
    showNotification("er")
  });
};
const deleteIdea = id => {
  axios.delete(`http://localhost:3001/api/superAdmin/idea?ideaId=${id}`)
.then(res => 
  {
    showNotification("br")
    axios.get('http://localhost:3001/api/superAdmin/idea')
      .then(function (response) {
        setIdeaList(response.data.data.ideasList); 
    })
    setideaObj({ ideaId: null, title: null, description: null, created_by: null, creater_id: null})  
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
      <Button round color="info" onClick={openModal}>Add New Idea</Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ideas Table</h4>
            <p className={classes.cardCategoryWhite}>
            New ideas onWard January, 2021
            </p>
          </CardHeader>
          <CardBody>
            <Table
              fun = {updateOpenModal}
              deleteIdea = {deleteIdea}
              tableHeaderColor="primary"
              tableHead={["Id","Title", "Creator", "Date", "Action"]}
              tableData={ideaList}
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
              <h4 className={classes.cardTitleWhite}>{ideaObj.ideaId? "update Idea":"Add New Idea"}</h4>
              <p className={classes.cardCategoryWhite}>Enter Your Idea</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
              </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={ideaObj.title}
                    labelText="Title"
                    onchangeHandler = {onchangeHandler}
                    id="title"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={ideaObj.created_by}
                    labelText="Creator"
                    id="created_by"
                    onchangeHandler = {onchangeHandler}
                    inputProps={{
                      disabled: true
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                    labelText="Dicription"
                    value={ideaObj.description}
                    id="description"
                    onchangeHandler = {onchangeHandler}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            
            </CardBody>
            <CardFooter>
              <Button color="info"
               onClick={ideaObj.ideaId? updateIdea:formSubmitHandler }>
                 {ideaObj.ideaId? "update":"Save"}</Button>

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