import React from 'react';
import { Segment, Visibility } from 'semantic-ui-react';
import HomepageHeading from '../homepageHeading/HomepageHeading';
import Products from '../products/Products';

import './Styles.scss';

const Home = ({ setFixed, userLoggedIn }) => {

  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)
  let headers = []

  if (userLoggedIn) {
    let name = "Marlon!"
    headers.push(`Hey ${name}`)
    headers.push("Take your business anywhere.")
  } else {
    headers.push("Homify")
    headers.push("Your business anywhere...")
    headers.push("Create store")
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