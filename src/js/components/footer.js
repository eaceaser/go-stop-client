import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__container">
      <p>
        <strong>GoStop</strong> Open Source Go &nbsp; · &nbsp;
        <a href="https://github.com/ianwessen/go-stop-client">
          GitHub Source
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
