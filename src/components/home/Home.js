import React from 'react';
import { Segment, Visibility } from 'semantic-ui-react';
import HomepageHeading from '../homepageHeading/HomepageHeading';

import './Styles.scss';

const Home = ({ setFixed, userLoggedIn }) => {

  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)
  let headers = {}

  if (userLoggedIn) {
    headers.header = `Hello ${userLoggedIn.first_name}`;
    headers.callAction = "Take your business anywhere.";
  } else {
    headers.header = "HmShop";
    headers.callAction = "Build, shop, manage, and more. From anywhere.";
    headers.buttonOne = "Create store";
    headers.buttonTwo = "Check your store";
  }

    return (
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
        className="home"
      >
        <Segment
          className={`home__segment ${userLoggedIn ? "home__userActive" : "home__userInactive"}`}
          textAlign='center'
          inverted={!userLoggedIn}
          style={{ minHeight: 700,  padding: '1em 0em' }}
          vertical
        >
          <HomepageHeading headers={headers} userLoggedIn={userLoggedIn}/>
        </Segment>
      </Visibility>
  )
}

export default Home;