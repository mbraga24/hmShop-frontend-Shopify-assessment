import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Form } from 'semantic-ui-react';
import CardItem from '../cardItem/CardItem';
import { queryProducts } from '../../api';

import './Styles.scss';

const Product = () => {

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchProducts, setSearchProducts ] = useState([])
  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    setSearchProducts(products)
  }, [])

  useEffect(() => {
    let type = 'name'
    queryProducts(type, searchTerm)
    .then(data => setSearchProducts(data))
  }, [searchTerm])

  const displayInventory = () => {
    return searchProducts.map(item => (
      <CardItem key={`${item.name}-${item.id}`} item={item} currentUser={currentUser}/>
    ))
  }

    return (
      <Container className="inventory">
        <h1 style={{textAlign: "center"}}>Products</h1>
        <Form className="inventory__searchInput">
          <Form.Input  
            placeholder="Search for an item"
            onChange={handleChange}
            />
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