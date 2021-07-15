import React from 'react';
import './Home.css'

const Home = () => {

  return (
    <div>
      <div className="title-and-links-container">
        <div className="title-and-links">
          <h1 className="title">Hey freelancer, <br></br>you are needed!</h1>
          <div className="links">
            <a href="/signin" className="link signin">Sign In</a>
            <a href="/signup" className="link signup">Sign Up</a>
          </div>
        </div>
      </div>
      <div>
        <h1>About</h1>
      </div>
      <div>
        <h1>Features</h1>
      </div>
      <div>
        <h1>Footer</h1>
      </div>
    </div>
  )
}

export default Home