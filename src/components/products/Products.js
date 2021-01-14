import React, { useState } from 'react';
import { Container, Grid, Image, Card, Icon, Form, Button } from 'semantic-ui-react'
import inventory from '../../testData';

import './Styles.scss';

const Product = ({ userLoggedIn }) => {

  const displayInventory = () => {
    return inventory.map(item => (
      <Grid.Column key={item}>
        <Card style={{marginBottom: "20px"}} className="inventory__card">
          <Image src={item.image_url} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Description>
              Price: ${item.price}
            </Card.Description>
            <Card.Description>
              Qty: {item.qty}
              <Button floated='right' color="blue" icon>
                <Icon name='shopping cart' />
              </Button>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {item.user.first_name} {item.user.last_name}
            </a>
          </Card.Content>
        </Card>
      </Grid.Column>
    ))
  }

    return (
      <Container className="inventory">
        <h1 style={{textAlign: "center"}}>Products</h1>
        <Form>
          <Form.Input  
            className="inventory__searchInput"
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