import React, { Component } from "react";
import "./Login.css";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

export default  function Dashboard() {
const history = useHistory();
let [authObj, setAuthObj] = useState({userName: null,password: null});
  let onchangeHandler = event => {
    let newObj = { ...authObj };
    if (event.target.id === "userName") {
    console.log(event.target.value)

        newObj.userName = event.target.value;
        return setAuthObj(newObj);
    }else if(event.target.id === "Password"){
    console.log(event.target.value)

      newObj.password = event.target.value;
      return setAuthObj(newObj);
    }
  };
 let submit = e => {
  axios.post('http://localhost:3001/api/student/login', authObj)
  .then(res => 
    {
      localStorage.setItem('data', JSON.stringify(res.data.data));
      if(res.data.code===200){
        return history.push("/admin/dashboard");
       }
       return alert("Wrong Credentials")
    })
  .catch(e => 
    {
      return alert("Wrong Credentials")
      
    });
  };

    return (
      <div className="container" >
        <form className="form" >
          <CustomInput
            labelText="User Name"
            id="userName"
            formControlProps={{
              fullWidth: true
            }}
            onchangeHandler={onchangeHandler}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="Password"
            formControlProps={{
              fullWidth: true
            }}
            onchangeHandler={onchangeHandler}
            type="password"
          />

          <Button type="button" onClick={submit} color="primary" className="form__custom-button">
            Log in
          </Button>
        </form>
      </div>
    );
  }

