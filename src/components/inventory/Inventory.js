import React, { useState } from 'react';
import { Container, Grid, Image, Card, Icon, Button } from 'semantic-ui-react'
import inventory from '../../testData';

import './Styles.scss';

const Inventory = ({ userLoggedIn }) => {

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
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a floated='left'>
              <Icon name='user' />
              {item.user.first_name} {item.user.last_name}
            </a>
            <Button floated='right' color="blue" icon>
              <Icon name='shopping cart' />
            </Button>
          </Card.Content>
          {
            userLoggedIn &&
            <Card.Content textAlign='center' extra>
              <Button inverted color="red" icon>
                <Icon name='trash' />
              </Button>
              <Button inverted color="green" icon>
                <Icon name='edit' />
              </Button>
              <Button inverted color="blue" icon>
                <Icon name='add' />
              </Button>
              <Button inverted color="orange" icon>
                <Icon name='minus' />
              </Button>
            </Card.Content>
          }
        </Card>
      </Grid.Column>
    ))
  }

    return (
      <Container className="inventory">
        <h1 style={{textAlign: "center"}}>INVENTORY</h1>
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Inventory;