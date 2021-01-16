import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Image, Form, Button, Card, Placeholder } from 'semantic-ui-react'
import useFormFields from '../../hooks/useFormFields';

import { newProduct } from '../../api';
import './Styles.scss';

const AddProductForm = ({ formNumber, click }) => {

  let disableName;
  const [ imageLoader, setImageLoader ] = useState(false)
  const [ placeholder, setPlaceholder ] = useState(null)
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const [ fields, handleFieldChange ] = useFormFields({
    name: "",
    price: "",
    quantity: ""
  })

  if (fileName === "") {
    disableName = true;
  } else {
    disableName = false;
  }

  useEffect(() => {
    setPlaceholder("./images/placeholder-product.png")
  }, [imageLoader])


  const fileChange = e => {
    setFile(e.target.files[0]);
    setPlaceholder(URL.createObjectURL(e.target.files[0]))
    setFileName(e.target.files[0].name);
  }

  const onFormSubmit = e => {
    e.preventDefault()
    setImageLoader(true)
    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", fileName)
    formData.append("name", fields.name)
    formData.append("price", fields.price)
    
    console.log("formData", formData)

    newProduct(formData, localStorage.token)
    .then(r => r.json())
    .then(newProduct => {
      console.log("newProduct", newProduct)
      setImageLoader(false)
    })
  }

    return (
    <Container className="addProductForm">
      <div className="addProductForm__innerContainer">
        <Card>
        {imageLoader ? 
          <Card.Content>
            <Placeholder style={{margin: 5, height: 200, width: 250 }}>
              <Placeholder.Image square />
            </Placeholder>
          </Card.Content> :
          <Card.Content style={{height: "100%"}}>
            <Image 
            as="label"
            htmlFor={`file-${formNumber}`}
            src={`${placeholder}`} 
            size='big' 
            style={{margin: 5, height: 200, width: 250}}
            />
          </Card.Content>
        }
        </Card>
        <div className="addProductForm__imageFields">
          <Form onSubmit={onFormSubmit}>
            <Form.Field>
              <input
              name="file"
              type="file"
              id={`file-${formNumber}`}
              accept="image/png, image/jpeg, image/jpg"
              hidden
              onChange={fileChange}
              />
              <Form.Input
              fluid
              label="Image"
              placeholder="Image"
              readOnly
              disabled={disableName}
              value={fileName}
              />
              <Form.Input
              name="name"
              fluid
              label="Product Name"
              placeholder="Leather Shoes"
              onChange={handleFieldChange}
              />
            <Form.Group widths='equal'>
              <Form.Input 
              name="price"
              fluid 
              label='Price' 
              placeholder="$39.99" 
              onChange={handleFieldChange}
              />
              <Form.Input 
              name="quantity"
              fluid 
              label="Quantity" 
              placeholder='2' 
              onChange={handleFieldChange}
              />
            </Form.Group>
              <Button type="submit" color="blue" loading={imageLoader}>
                Add New Product
              </Button>    
              <Button type="button" color="red" onClick={click}>
                Delete Form
              </Button>    
            </Form.Field>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default AddProductForm;