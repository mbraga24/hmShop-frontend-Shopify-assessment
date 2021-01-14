import React from 'react';
import { Container } from 'semantic-ui-react';

import './Styles.scss';

const AppNavegation = () => {
  return(
    <Container className="appNavegation">
        <h1 className="appNavegation__title">You are logged in</h1>
        <div className="appNavegation__options">
        </div>

    </Container>
  )
}

export default AppNavegation;