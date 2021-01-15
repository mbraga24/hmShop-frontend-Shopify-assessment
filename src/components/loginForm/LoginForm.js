import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment, List } from 'semantic-ui-react';
import useFormFields from '../../hooks/useFormFields';
import { loginUser } from '../../api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const LoginForm = ({ history, handleCredentialsTasks }) => {

  const iconDoor = <FontAwesomeIcon icon={faDoorOpen} size="2x" />
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ header, setHeader ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ fields, handleFields ] = useFormFields({
    email: "",
    password: ""
  })

  const runAlert = (header, error) => {
    setHeader(header);
    setErrorMsg(error);
    setAlertStatus(true);
    resetAlert();
  }

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false);
    }, 5000);
  }

  const displayAlert = errors => {
    return errors.map((e, i) => (
      <List.Item key={e}>{e}</List.Item>
    ));
  }

  const handleSubmit = e => {
    e.preventDefault();

    loginUser(fields)
    .then(data => {
      if (data.error) {
        const { error, header } = data;
        runAlert(header, error);
      } else {
        const { user, token, success } = data;
        localStorage.token = token
        handleCredentialsTasks(success, user)
        history.push("/")
      }
    })
  }

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
            {iconDoor} Enter your store
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input 
                name="email"
                fluid 
                icon='user' 
                iconPosition='left' 
                placeholder='E-mail address' 
                onChange={handleFields}
              />
              <Form.Input
                name="password"
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={handleFields}
              />

              <Button color='blue' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          { 
            alertStatus &&
            <Message warning attached='bottom'>
              { 
                alertStatus && 
                <div>
                  <Header as='h5' dividing>
                    {header}
                  </Header>
                  <List bulleted style={{ textAlign: "left" }}>
                    { displayAlert(errorMsg) }
                  </List>
                </div>
              }
            </Message>
          }
          <Message>
            Don't have a store yet? <Link to="/signup">Sign Up</Link> or return <Link to="/">Home</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
export default withRouter(LoginForm);