import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Container } from 'semantic-ui-react';

import './Styles.scss';

const HomepageHeading = ({ headers, userLoggedIn }) => {
  return(
    <Container text className="HomepageHeading">
      <Header
        id="Header-1"
        as='h1'
        content={headers[0]}
        inverted={!userLoggedIn}
      />
      <Header
        id="Header-2"
        as='h2'
        content={headers[1]}
        inverted={!userLoggedIn}
      />
      {
      !userLoggedIn &&
        <Button as={Link} to="/signup" primary size='huge'>
        {headers[2]} <Icon name='right arrow' />
        </Button>
      }
    </Container>
  )
}

export default HomepageHeading;