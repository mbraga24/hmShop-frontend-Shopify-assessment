import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Grid, Card, Icon, Button } from 'semantic-ui-react'

import { deleteProduct } from '../../api';
import { REMOVE_PRODUCT, SET_BANNER } from '../../store/type';
import './Styles.scss';

const OrderItem = ({ product = null, currentUser }) => {

  console.log(product)

  const [ open, setOpen ] = useState(false);
  const [ loader, setLoader ] = useState(false);
  const { user } = product
  const { first_name, last_name } = user
  const sellerFullName = `${first_name} ${last_name}`
  const dispatch = useDispatch()

  // ============================================================
  //                     BUG ON SERIALIZER
  // ============================================================

  // const handleDelete = () => {
  //   setLoader(true)
  //   deleteProduct(item.id, localStorage.token)
  //   .then(data => {
  //     setTimeout(() => {
  //       dispatch({ type: REMOVE_PRODUCT, payload: data.product })
  //       dispatch({ type: SET_BANNER, payload: data.confirmation });
  //       setOpen(false)
  //       setLoader(false)
  //     }, [2000])
  //   })
  // }

  // const isSeller = () => {
  //   return product.user.email === currentUser.email
  // }

    return (

      <Grid.Column className="orderItem" id="cardContainer">
        <Card className="orderItem__card">
          <div  role="img" 
                aria-label={product.name}
                title={product.name}
                className="orderItem__image" 
                style={{backgroundImage: `url(${product.image_url})` }} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Description>
              Price: ${product.price}
            </Card.Description>
            <Card.Description>
              Qty: 2
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a floated='left'>
              <Icon name='user' />
              {sellerFullName}
            </a>
          </Card.Content>
          {
            currentUser && 
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
                <Header icon='trash' content='Please confirm' />
                <Modal.Content>
                  <p>
                    Are you sure you want to delete this product?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  {
                  !loader && 
                  <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                  </Button>
                  }
                  {/* <Button color='green' loading={loader} onClick={handleDelete}> */}
                  <Button color='green' loading={loader}>
                    <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
              <Button inverted disabled color="blue" icon>
                <Icon name='add' />
              </Button>
              <Button inverted disabled color="orange" icon>
                <Icon name='minus' />
              </Button>
            </Card.Content>
          }
        </Card>
      </Grid.Column>
  )
}

export default OrderItem;