import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Menu, Container, Icon } from 'semantic-ui-react';

import { LOGGED_IN } from '../../store/type';
import './Styles.scss';

const Navbar = ({ history, fixed }) => {
  
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.app.currentUser);

  let activeRole;
  const handleLogout = () => {
    dispatch({ type: LOGGED_IN, payload: null });
    localStorage.removeItem("token");
    history.push("/");
  }

  if (currentUser) {
    activeRole = true
  } else {
    activeRole = false
  }

  const [ activeItem, setActiveItem ] = useState('')

  const handleItemClick = (e, { name }) => { setActiveItem(name) }

  return (

    <Menu
      fixed={fixed ? 'top' : null}
      inverted={!activeRole}
      pointing={!fixed}
      secondary={!fixed}
      className={`${activeRole ? "activeUser" : "inactiveUser" } navbar`}
      size='large'
    >
      <Container>
        <>
          <Menu.Item 
            as={Link} 
            to={currentUser ? "/dashboard" : "/"}
            name="home"
            active={activeItem === 'home'}
            onClick={handleItemClick}>Home</Menu.Item>
        </>

        {
          activeRole && 
          <>
          <Menu.Item 
              as={Link}
              to="/products"
              name="products"
              active={activeItem === 'products'}
              onClick={handleItemClick}>Products</Menu.Item> {/* The MAY or MAY NOT have access to all products */}
              
            <Menu.Item 
              as={Link}
              to="/inventory"
              name="inventory"
              active={activeItem === 'inventory'}
              onClick={handleItemClick}>Inventory</Menu.Item> {/* The user has an inventory they're selling */}
          </>
        }
        <Menu.Item position='right'>
          {
            !activeRole ?
            <Button as={Link} to="/login" inverted={!activeRole} primary={activeRole}>
              Log in
            </Button> :
            <Button as={Link} to="/cart" animated='vertical' inverted secondary={true}>
              <Button.Content hidden>10 items</Button.Content>
              <Button.Content visible>
                <Icon name='shop' />
              </Button.Content>
            </Button>
          }
            <Button 
              as={Link} 
              to={`${activeRole ? "/" : "/signup"}`} 
              color={`${activeRole ? "purple" : null}`} 
              inverted={true} 
              secondary={activeRole}
              onClick={activeRole ? handleLogout : null}
              className="navbar__multifunctionBtn"> 
                {activeRole ? "Log out" : "Sign Up"}
              </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
export default withRouter(Navbar);