import React, { useState } from 'react';
import { Container, Grid, Image, Form, Button, Icon } from 'semantic-ui-react'
import CardItem from '../cardItem/CardItem';

import inventory from '../../testData';
import './Styles.scss';

const Inventory = ({ userLoggedIn }) => {

  const fileName = true
  const displayInventory = () => {
    return inventory.map(item => (
      <CardItem key={item.id} item={item} userLoggedIn={userLoggedIn}/>
    ))
  }
    return (
      <Container className="inventory">
        <h1 style={{textAlign: "center"}}>INVENTORY</h1>
        <div className="inventory__innerContainer">
            <Image 
              src='https://react.semantic-ui.com/images/wireframe/image.png' 
              size='medium' 
              disabled 
              className="inventory__imageHolder"/>
            <div className="inventory__imageFields">
              {/* <Form onSubmit={onFormSubmit}> */}
              <Form>
                <Form.Field>
                  <label>Image Upload </label>
                  <Button type="button" as="label" htmlFor="file" animated="fade" className="Project-Archived-Button-Color">
                    <Button.Content visible>
                      <Icon name="file" />
                    </Button.Content>
                    <Button.Content hidden>Upload Image</Button.Content>
                  </Button>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    hidden
                    // onChange={fileChange}
                  />
                  <Form.Input
                    fluid
                    label="File name"
                    placeholder="Use the button above to browse your file system"
                    readOnly
                    // value={fileName}
                  />
                  <Form.Input
                    fluid
                    label="Product Name"
                    placeholder="Leather Shoes"
                    // value={fileName}
                  />
                  <Form.Input
                    fluid
                    label="Price"
                    placeholder="$12.99"readOnly
                    // value={fileName}
                  />
                  <Form.Input
                    fluid
                    label="Quantity"
                    placeholder="2"readOnly
                    // value={fileName}
                  />
                  <Button type="submit">
                    Upload File
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