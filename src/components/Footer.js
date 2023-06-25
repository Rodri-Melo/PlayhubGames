import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <button className="scroll-button" onClick={scrollToTop}>
          Voltar ao Topo
        </button>
        <p className="brand-name">PlayHub Games</p>
      </div>
    </footer>
  );
};

export default Footer;
