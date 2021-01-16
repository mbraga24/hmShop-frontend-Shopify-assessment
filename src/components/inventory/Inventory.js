import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Button } from 'semantic-ui-react'
import CardItem from '../cardItem/CardItem';
import AddProductForm from '../addProductForm/AddProductForm'

import './Styles.scss';

const Inventory = () => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const [productFormList, setProductFormList] = useState([]);

  const handleDeleteComponent = index => {
    const productForms = [...productFormList]
    productForms.splice(index, 1);
    setProductFormList([...productForms])
  }

  const addFormOnClick = e => {
    let formNumber = productFormList.length
    setProductFormList(productFormList.concat(<AddProductForm 
            key={formNumber} 
            formNumber={formNumber} 
            click={() => handleDeleteComponent(formNumber)}
            />));
  };

  const displayInventory = () => {
    return products.map(item => (
      <CardItem key={`${item.name}-${item.id}`} item={item} userLoggedIn={currentUser}/>
    ))
  }

    return (
      <Container className="inventory">
        <h1 style={{textAlign: "center"}}>INVENTORY</h1>
        <div className="inventory__buttonWrapper">
          <Button icon='add' color="blue" onClick={addFormOnClick}>
            Sell a new product
          </Button>
        </div>
        {productFormList}
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Inventory;