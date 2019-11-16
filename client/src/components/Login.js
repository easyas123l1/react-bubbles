import React, { useState, useEffect } from "react";
import axios from 'axios';

const initialForm = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialForm)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const login = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      setIsLoggedIn(true);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const handleChange = e => {
    e.persist();
    setCredentials({...credentials, [e.target.name]: e.target.value})

  }


  return (
    <>
      <div>
        <h2>{isLoggedIn ? "LOGGED IN!" : "Please login"}</h2>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder='username'
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder='password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
 