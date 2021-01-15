import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route } from 'react-router-dom';
import Inventory from './components/inventory/Inventory';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import Home from './components/home/Home';
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';
import Navbar from './components/navbar/Navbar';

import { autologin } from './api'
import { Message } from 'semantic-ui-react'
import './styles/App.scss';

const App = () => {

  const [ welcomeMessage, setWelcomeMessage ] = useState("");
  const [ userLoggedIn, setUserLoggedIn ] = useState(null);
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ fixed, setFixed ] = useState(false)

  useEffect(() => {
    if (localStorage.token) {
      autologin(localStorage.token)
      .then(loggedInUser => {
        const { user } = loggedInUser
        setUserLoggedIn(user)
      })
    }
  },[])

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false);
    }, 5000);
  }

  const handleDismiss = () => {
    setAlertStatus(false);
  }

  const handleCredentialsTasks = (message, user) => {
    setWelcomeMessage(message);
    setUserLoggedIn(user)
    setAlertStatus(true);
    resetAlert();
  }

  return (
    <div className="App">
      <Navbar fixed={fixed} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      { (userLoggedIn && alertStatus) &&
        <Message size="huge" onDismiss={handleDismiss}>
          <Message.Content>
            <Message.Header>{welcomeMessage}</Message.Header>
          </Message.Content>
        </Message>
      }
      <Switch>
        <Route path="/inventory" render={ () => <Inventory userLoggedIn={userLoggedIn}/> } />
        <Route path="/cart" exact render={ () => <Cart/> } />
        <Route path="/products" exact render={ () => <Products userLoggedIn={userLoggedIn}/> } />
        <Route path="/" exact render={ () => <Home setFixed={setFixed} userLoggedIn={userLoggedIn}/> } />
        <Route path="/login" render={ () => <LoginForm handleCredentialsTasks={handleCredentialsTasks}/> } />
        <Route path="/signup" render={ () => <SignupForm handleCredentialsTasks={handleCredentialsTasks} setUserLoggedIn={setUserLoggedIn}/> } />
      </Switch>
    </div>
  );
}

export default App;
