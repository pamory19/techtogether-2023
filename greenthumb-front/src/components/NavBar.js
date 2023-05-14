import { useState } from "react";
import "../stylesheets/NavBar.css";

function NavBar() {
  const [activeView, setActiveView] = useState("home");

  return (
    <nav>
      <a href="/">🌿 GreenThumb</a>
      {/* <a href=".">About Us</a> */}
    </nav>
  )
}

export default NavBar;