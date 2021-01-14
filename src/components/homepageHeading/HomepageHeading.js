import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Container } from 'semantic-ui-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStoreAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import './Styles.scss';

const HomepageHeading = ({ headers, userLoggedIn }) => {

  const iconStore = <FontAwesomeIcon icon={faStoreAlt} size="x2" />
  const iconDoor = <FontAwesomeIcon icon={faDoorOpen} size="x2" />

  return(
    <Container text className="homepageHeading">
      <h1 className="homepageHeading__mainHeader">{headers.header}</h1>
      <h2 className="homepageHeading__callAction">{headers.callAction}</h2>
      {
      !userLoggedIn &&
        <div>
          <Button as={Link} to="/signup" primary size='huge'>
            {headers.buttonOne} {iconStore}
          </Button>
          <Button as={Link} to="/login" positive size='huge'>
            {headers.buttonTwo} {iconDoor}
          </Button>
        </div>
      }
    </Container>
  )
}

export default HomepageHeading;