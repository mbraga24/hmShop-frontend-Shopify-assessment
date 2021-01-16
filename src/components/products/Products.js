import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Form } from 'semantic-ui-react';
import CardItem from '../cardItem/CardItem';

import './Styles.scss';

const Product = () => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);

  const displayInventory = () => {
    return products.map(item => (
      <CardItem key={item.id} item={item} currentUser={currentUser}/>
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