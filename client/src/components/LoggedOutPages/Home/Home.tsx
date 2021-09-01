import React from 'react';
import './Home.css'

import Musician1Svg from '../../../images/musician1svg.svg'
import Musician2Svg from '../../../images/musician2svg.svg'
import Pianosvg from '../../../images/pianosvg.svg'

const Home = () => {

  return (
    <div className="home-container">
      <nav className="home-page-navigation">
        <div className="home-page-navigation-links home-page-scroll-links">
          <a href="#home" className="home-navigation-link">HalfEatenBiscuit <i className="fas fa-cookie-bite"></i></a>
          <div className="home-hidden-links">
            <a href="#about" className="home-navigation-link">About</a>
            <a href="#features" className="home-navigation-link">Features</a>
          </div>
        </div>
        <div className="home-page-navigation-links home-page-sign-links">
          <a href="/signin" className="home-navigation-link sign-link">Sign In</a>
          <a href="/signup" className="home-navigation-link sign-link">Sign Up</a>
        </div>
      </nav>

      <div className="scroll-container">

        <div className="scroll-page title-section" id="home">
          <div className="home-page-image-container">
            <img src={Musician1Svg} alt="" className="home-page-image home-page-musician1-image" />
          </div>
          <div className="title-container">
            <h1 className="title">Hey artist, <br></br>show your work!</h1>
          </div>
        </div>

        <div className="scroll-page about-section" id="about">
          <div className="home-page-image-container">
            <img src={Musician2Svg} alt="" className="home-page-image home-page-musician2-image" />
          </div>
          <div className="scroll-page-content">
            <h1>About</h1>
            <p>Half eaten biscuit is for artists aiming to make their projects a reality</p>
          </div>
        </div>

        <div className="scroll-page features-section" id="features">
          <div className="home-page-image-container">
            <img src={Pianosvg} alt="" className="home-page-image home-page-piano-image" />
          </div>
          <div className="scroll-page-content">
            <h1>Features</h1>
            <p>Jobmarket</p>
            <p>Messaging, contacting</p>
            <p>Profiles</p>
            <p>Mobile</p>
          </div>
        </div>

        <div className="scroll-page footer-section">
          <h1>Footer</h1>
          <p>Might not be required</p>
        </div>
      </div>
    </div>
  )
}

export default Home