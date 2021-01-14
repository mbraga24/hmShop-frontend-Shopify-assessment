import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const LoginForm = () => {

  const icon = <FontAwesomeIcon icon={faDoorOpen} />

  return (
    <Segment
      className="loginForm"
      textAlign='center'
      inverted
      style={{ minHeight: 700,  padding: '1em 0em' }}
      vertical
      >
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' className="loginForm__header" textAlign='center'>
            {icon} Enter your store
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button color='blue' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have a store yet? <Link to="/signup">Sign Up</Link> or return <Link to="/">Home</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
export default LoginForm;