import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Image, Form, Button, Card, Placeholder } from 'semantic-ui-react'
import CardItem from '../cardItem/CardItem';
import useFormFields from '../../hooks/useFormFields';
import { newProduct } from '../../api';

import './Styles.scss';

const Inventory = () => {

  const [ imageLoader, setImageLoader ] = useState(false)
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const [ fields, fieldChange ] = useFormFields({
    name: "",
    price: "",
    quantity: ""
  })


  const displayInventory = () => {
    return products.map(item => (
      <CardItem key={item.id} item={item} userLoggedIn={currentUser}/>
    ))
  }

  const fileChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const onFormSubmit = e => {
    e.preventDefault()
    setImageLoader(true)
    // console.log(fields)
    const formData = new FormData();

    console.log("file", file);
    console.log("fileName", fileName)
    console.log("token", localStorage.token)

    formData.append("file", file);
    formData.append("fileName", fileName)
    // formData.append("token", localStorage.token)
    formData.append("name", fields.name)
    formData.append("price", fields.price)
    
    console.log("formData", formData)

    newProduct(formData, localStorage.token)
    .then(r => r.json())
    .then(newProduct => {
      setImageLoader(false)
      console.log("imageLoader", imageLoader)
      console.log("newProduct", newProduct)
      setFileName("")
    })

  }


    return (
      <Container className="inventory">
        <h1 style={{textAlign: "center"}}>INVENTORY</h1>
        <div className="inventory__innerContainer">
            <Card className="inventory__imageHolder">
              {true ? 
                <Card.Content>
                  <Placeholder style={{margin: 10, height: 200, width: 240 }}>
                    <Placeholder.Image square />
                  </Placeholder>
                </Card.Content> :
                <Card.Content>
                  <Image 
                    // src={require('./assets/placeholder-product.png')}
                    as="label"
                    htmlFor="file"
                    src='https://cdn.create.web.com/images/industries/common/images/placeholder-product-image-4x3.jpg' 
                    size='big' 
                    />
                </Card.Content>
              }
              </Card>
            <div className="inventory__imageFields">
              <Form onSubmit={onFormSubmit}>
                <Form.Field>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    hidden
                    onChange={fileChange}
                  />
                  <Form.Input
                    fluid
                    label="File name"
                    placeholder="File name"
                    readOnly
                    value={fileName}
                  />
                  <Form.Input
                    name="name"
                    fluid
                    label="Product Name"
                    placeholder="Leather Shoes"
                    onChange={fieldChange}
                  />
                  <Form.Group widths='equal'>
                    <Form.Input 
                      name="price"
                      fluid 
                      label='Price' 
                      placeholder="$12.99" 
                      onChange={fieldChange}
                    />
                    <Form.Input 
                      name="quantity"
                      fluid 
                      label="Quantity" 
                      placeholder='2' 
                      onChange={fieldChange}
                    />
                  </Form.Group>
                  <Button type="submit">
                    Create Product
                  </Button>    
                </Form.Field>
              </Form>
            </div>
        </div>
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Inventory;