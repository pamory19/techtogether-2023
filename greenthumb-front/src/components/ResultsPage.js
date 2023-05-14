import { useState } from "react";
import "../stylesheets/Results.css"
import NavBar from "./NavBar";

import { AiOutlineCloseCircle } from "react-icons/ai";

function ResultsPage() {
  const [popupVisible, setPopupVisible] = useState(false);

  function PopUp({plant}) {
    return (
      <div className="darken-bg-overlay">
        <article className="overlay-tab">
          <AiOutlineCloseCircle onClick={() => setPopupVisible(false)} size={25}/>
          <div></div>
          <h3>Plant Name</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor efficitur ipsum eu ultrices. Aliquam eget ipsum eget ex placerat scelerisque et accumsan mi. Maecenas pulvinar viverra purus non commodo. In at pellentesque leo. Phasellus sit amet tincidunt nulla. Nullam eu vulputate libero. Donec interdum placerat nisl, id placerat justo viverra non. Cras quis faucibus nibh. In tristique magna ut libero hendrerit aliquam. Etiam at dignissim ante, sit amet consequat neque.</p>
        </article>
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <main id="results">
        <h1>Your Results</h1>
        <section id="results-holder">
          <article className="results-card">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor efficitur ipsum eu ultrices. Aliquam eget ipsum eget ex placerat scelerisque et accumsan mi. Maecenas pulvinar viverra purus non commodo. In at pellentesque leo. Phasellus sit amet tincidunt nulla. Nullam eu vulputate libero. Donec interdum placerat nisl, id placerat justo viverra non. Cras quis faucibus nibh. In tristique magna ut libero hendrerit aliquam. Etiam at dignissim ante, sit amet consequat neque.
            </p>
          </article>
          <h2>Your Plant Matches</h2>
          <div className="accordion">
            <article onClick={() => {setPopupVisible(true)}} className="results-card">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </article>
            <article onClick={() => {setPopupVisible(true)}} className="results-card">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </article>
            <article onClick={() => {setPopupVisible(true)}} className="results-card">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </article>
          </div>
        </section>
      </main>
      {popupVisible ? <PopUp /> : <></>}
    </>
  )
}

export default ResultsPage;