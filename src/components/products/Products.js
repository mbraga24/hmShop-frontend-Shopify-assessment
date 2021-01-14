import React, { useState } from 'react';
import { Container, Grid, Image, Card, Icon, Form, Button } from 'semantic-ui-react';
import CardItem from '../cardItem/CardItem';

import inventory from '../../testData';
import './Styles.scss';

const Product = ({ userLoggedIn }) => {

  const displayInventory = () => {
    return inventory.map(item => (
      <CardItem key={item.id} item={item} userLoggedIn={userLoggedIn}/>
    ))
  }

    return (
      <Container className="inventory">
        <h1 style={{textAlign: "center"}}>Products</h1>
        <Form className="inventory__searchInput">
          <Form.Input  
            placeholder="Search for an item"/>
        </Form>
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Product;