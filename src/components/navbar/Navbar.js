import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Container, Icon } from 'semantic-ui-react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Styles.scss';

const Navbar = ({ fixed, userLoggedIn }) => {

  const cartIcon = <FontAwesomeIcon icon={faShoppingCart} size="2x"/>
  const [ activeItem, setActiveItem ] = useState('home')

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return (

    <Menu
      fixed={fixed ? 'top' : null}
      inverted={!userLoggedIn}
      pointing={!fixed}
      secondary={!fixed}
      className={`${userLoggedIn ? "inactiveUser" : "activeUser" } navbar`}
      size='large'
    >
      <Container>
        <Menu.Item 
          as={Link} 
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}>Home</Menu.Item>

        {
          userLoggedIn && 
          <>
            <Menu.Item 
              as={Link}
              to="/products"
              name="products"
              active={activeItem === 'products'}
              onClick={handleItemClick}>Products</Menu.Item> {/* The MAY or MAY NOT have access to all products */}

            <Menu.Item 
              as={Link}
              to="/profile" 
              name="profile"
              active={activeItem === 'profile'}
              onClick={handleItemClick}>Profile</Menu.Item>

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
            !userLoggedIn ?
            <Button as={Link} to="/login" inverted={!userLoggedIn} primary={userLoggedIn}>
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
              to={`${userLoggedIn ? "/" : "/signup"}`} 
              color={`${userLoggedIn && "purple"}`} 
              inverted={true} 
              secondary={userLoggedIn}
              className="navbar__multifunctionBtn"> 
                {userLoggedIn ? "Log out" : "Sign Up"}
              </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
export default Navbar;