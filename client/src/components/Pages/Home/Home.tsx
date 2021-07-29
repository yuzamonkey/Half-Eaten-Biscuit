import React from 'react';
import './Home.css'
import Man from '../../../images/man.jpeg'

const Home = () => {


  return (
    <div className="home-container">
      <div className="navigation-and-images-container">
        <div className="navigation-container">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#footer">Footer</a>
        </div>
      </div>

      <div className="title-and-links-container">
        <div className="title-and-links">
          <h1 className="title">Hey freelancer, <br></br>you are needed!</h1>
          <div className="links">
            <a href="/signin" className="link signin">Sign In</a>
            <a href="/signup" className="link signup">Sign Up</a>
            {/* <img src={Man} alt="" /> */}
          </div>
        </div>
      </div>
      <div id="about">
        <h1>About</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non adipisci tempora necessitatibus molestiae eius ea tenetur quibusdam delectus, unde et, sint, itaque assumenda iusto modi. Voluptates architecto non, fugit cupiditate assumenda earum, libero temporibus nostrum unde qui ea totam ut, iure eligendi voluptas labore! Vel ratione enim ad autem! Blanditiis consequuntur ab perspiciatis. Incidunt architecto accusantium repellendus error laudantium delectus eius repudiandae, optio corporis quasi ut provident libero ex ducimus fugit aut id alias recusandae eaque voluptate fuga neque quod. Cumque aperiam assumenda illo rerum facere minima, labore ad amet molestias? Voluptate eligendi aliquid, repellat esse a sed ipsum qui?</p>
      </div>
      <div id="features">
        <h1>Features</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ut ipsa nesciunt quod sequi pariatur, cumque, unde esse earum aliquid officiis eligendi? Atque aspernatur sequi tenetur aut qui, incidunt numquam reiciendis neque, laudantium officia deserunt non, eius illum facilis magnam nihil dolor enim. Incidunt repellat ipsum sequi nihil dolor quas obcaecati, necessitatibus iusto eum. Quo voluptatem aspernatur harum totam! Beatae maxime fugit corrupti! Eveniet hic totam doloribus eos recusandae! Quidem culpa tenetur consequatur rem aut voluptatem illo, fugit quaerat quo, quis assumenda tempore asperiores architecto adipisci cum. Repudiandae voluptate exercitationem fugit magnam! Ab ipsa minima eveniet odit amet doloremque soluta!</p>
      </div>
      <div id="footer">
        <h1>Footer</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, a assumenda eveniet deleniti itaque amet, vero excepturi alias voluptate cum at obcaecati beatae dolor aperiam tenetur ipsum impedit debitis officia sapiente! Id officiis ex mollitia veritatis. Ullam dignissimos impedit nemo culpa, non sunt perferendis modi officia odit molestiae repellendus? Laboriosam amet quos aspernatur? Rem iste, dolores officiis in, magni neque incidunt minus iusto pariatur eveniet error provident nobis nam animi ullam voluptates velit nihil reiciendis temporibus aut molestias. Quos voluptatibus praesentium, ut nam saepe culpa nisi iusto nostrum earum magni asperiores aspernatur? Voluptas officia fugit in vitae esse sunt placeat.</p>
      </div>

    </div>
  )
}

export default Home