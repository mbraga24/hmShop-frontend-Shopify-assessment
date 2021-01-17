import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Inventory from './components/inventory/Inventory';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import Home from './components/home/Home';
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import 'semantic-ui-css/semantic.min.css'

import { LOGGED_IN, SET_PRODUCTS } from './store/type';
import { autologin, getProducts } from './api'
import { Header, Message, List } from 'semantic-ui-react';
import './styles/App.scss';

const App = () => {

  const [ welcomeMessage, setWelcomeMessage ] = useState("");
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ fixed, setFixed ] = useState(false)
  const [ header, setHeader ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState([]);
  const currentUser = useSelector(state => state.app.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.token) {
      autologin(localStorage.token)
      .then(data => {
        if (!data.error) {
          dispatch({ type: LOGGED_IN, payload: data.user })
        }
      })
    }
  },[dispatch])

  useEffect(() => {
    getProducts(localStorage.token)
    .then(products => {
      dispatch({ type: SET_PRODUCTS, payload: products })
    })
  },[dispatch])


  const displayAlert = errors => {
    return errors.map((e, i) => (
      <List.Item key={e}>{e}</List.Item>
    ));
  }

  const credentialsAlert = () => {
    return <Message warning attached='bottom'>
      { 
        alertStatus && 
        <div>
          <Header as='h5' dividing>
            {header}
          </Header>
          <List bulleted style={{ textAlign: "left" }}>
            { displayAlert(errorMsg) }
          </List>
        </div>
      }
    </Message>
  }

  const runAlert = (header, error) => {
    setHeader(header);
    setErrorMsg(error);
    setAlertStatus(true);
    resetAlert();
  }

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false);
    }, 5000);
  }

  const handleDismiss = () => {
    setAlertStatus(false);
  }

  const handleCredentialsTasks = (message) => {
    setWelcomeMessage(message);
    setAlertStatus(true);
    resetAlert();
  }

  return (
    <div className="App">
      <Navbar fixed={fixed} />
      { (currentUser && alertStatus) &&
        <Message attached='bottom' size="huge" onDismiss={handleDismiss}>
          <Message.Content>
            <Message.Header>{welcomeMessage}</Message.Header>
          </Message.Content>
        </Message>
      }
      <Switch>
        {
          currentUser &&
          <React.Fragment>
            <Route path="/dashboard" render={ () => <Dashboard /> } />
            <Route path="/inventory" render={ () => <Inventory /> } />
            <Route path="/products" exact render={ () => <Products/> } />
            <Route path="/cart" exact render={ () => <Cart/> } />
          </React.Fragment>
        }
        <Route path="/" exact render={ () => <Home setFixed={setFixed}/> } />
        <Route path="/products" exact render={ () => <Products/> } />
        <Route path="/login" render={ () => <LoginForm 
                                                handleCredentialsTasks={handleCredentialsTasks} 
                                                runAlert={runAlert}
                                                credentialsAlert={credentialsAlert}
                                                alertStatus={alertStatus}/> } />
        <Route path="/signup" render={ () => <SignupForm 
                                                handleCredentialsTasks={handleCredentialsTasks}
                                                runAlert={runAlert}
                                                credentialsAlert={credentialsAlert}
                                                alertStatus={alertStatus} /> } />
      </Switch>
    </div>
  );
}

export default App;
