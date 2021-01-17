import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import OrderItem from '../orderItem/OrderItem';

import './Styles.scss';

const Cart = () => {

  const orders = useSelector(state => state.order.orders);
  const currentUser = useSelector(state => state.app.currentUser);

  const displayOrders = () => {
    return orders.map(order => (
      <Grid.Column key={`${order.product.name}-${order.product.price}`}>
        <OrderItem order={order} currentUser={currentUser}/>
      </Grid.Column>
    ))
  }

    return (
      <div className="cart">
        <Container>
          <h1>Cart</h1>
          <Grid>
            <Grid.Row columns={3}>
              {displayOrders()}
            </Grid.Row>
          </Grid>
        </Container>
      </div>
  )
}

export default Cart;