import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const SingupForm = () => {

  const icon = <FontAwesomeIcon icon={faStoreAlt} size="x2" />

  return (
    <Segment
      className="SingupForm"
      textAlign='center'
      inverted
      style={{ minHeight: 700,  padding: '1em 0em' }}
      vertical
    >
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' className="loginForm__header" textAlign='center'>
            {icon} Create your store
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='hand point right' iconPosition='left' placeholder='First Name' />
              <Form.Input fluid icon='hand point right' iconPosition='left' placeholder='Last Name' />
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button color='blue' fluid size='large'>
                Sign up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to="/login">Log in</Link> or return <Link to="/">Home</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
export default SingupForm;