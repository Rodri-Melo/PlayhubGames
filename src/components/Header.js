import React, { useEffect } from "react";
import "./Header.css";

function Header() {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShow(window.scrollY > 100);
    });
  }, []);


  return (
    <div className={`nav-container ${show && "nav-container-black"}`}>
     <div className="playhub-container">
        <h2 className="playhub-title">PLAYHUB GAMES</h2>
     </div>
    </div>
  );
}

export default Header;