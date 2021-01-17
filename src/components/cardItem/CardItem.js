import React, { useState } from 'react';

import { Modal, Header, Grid, Card, Icon, Button } from 'semantic-ui-react'

import './Styles.scss';

const CardItem = ({ item, currentUser }) => {

  const [ open, setOpen ] = useState(false);

  const isSeller = () => {
    return item.user.email === currentUser.email
  }

    return (

      <Grid.Column className="cardItem" id="cardContainer">
        <Card className="cardItem__card">
          <div  role="img" 
                aria-label={item.title}
                title={item.title}
                className="cardItem__image" 
                style={{backgroundImage: `url(${item.image_url})` }} />
          <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Description>
              Price: ${item.price}
            </Card.Description>
            <Card.Description>
              Qty: 2
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a floated='left'>
              <Icon name='user' />
              {item.user.first_name} {item.user.last_name}
            </a>
            { !isSeller() &&
              <Button floated='right' color="blue" icon>
                <Icon name='shopping cart' />
              </Button>
            }
          </Card.Content>
          {
            currentUser && isSeller() && 
            <Card.Content textAlign='center' extra>
              <Modal
                closeIcon
                size="mini"
                dimmer={"inverted"}
                open={open}
                trigger={
                  <Button inverted color="red" icon>
                    <Icon name='trash' />
                  </Button>
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              >
                <Header icon='archive' content='Archive Old Messages' />
                <Modal.Content>
                  <p>
                    Are you sure you want to delete this item?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                  </Button>
                  <Button color='green' onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
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
  )
}

export default CardItem;