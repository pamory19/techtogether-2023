import Lottie from "lottie-react";
import movingPlant from "../images/lottie/plant-moving.json";
import plantFrame from "../images/lottie/frame.json";

import { ReactSVG } from 'react-svg'

import "../stylesheets/Homepage.css"
import NavBar from "./NavBar";

function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <div>
          <h1>
            Plant your questions -
            <br />
            we'll help them grow
          </h1>
        </div>
        <div>
          <button class="main-btn">Get Started!</button>
          <div id="moving-plant">
            <Lottie animationData={movingPlant} />
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
