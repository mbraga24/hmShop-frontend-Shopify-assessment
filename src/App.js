import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route } from 'react-router-dom';
import Inventory from './components/inventory/Inventory';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import Home from './components/home/Home';
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';
import Navbar from './components/navbar/Navbar';

import './styles/App.scss';

const App = () => {

  const [ userLoggedIn, setUserLoggedIn ] = useState(true);
  const [ fixed, setFixed ] = useState(false)

  return (
    <div className="App">
      <Navbar fixed={fixed} userLoggedIn={userLoggedIn} />
      <Switch>
        <Route path="/inventory" render={ () => <Inventory userLoggedIn={userLoggedIn}/> } />
        <Route path="/cart" exact render={ () => <Cart/> } />
        <Route path="/products" exact render={ () => <Products userLoggedIn={userLoggedIn}/> } />
        <Route path="/" exact render={ () => <Home setFixed={setFixed} userLoggedIn={userLoggedIn}/> } />
        <Route path="/login" render={ () => <LoginForm/> } />
        <Route path="/signup" render={ () => <SignupForm/> } />
      </Switch>
    </div>
  );
}

export default App;
