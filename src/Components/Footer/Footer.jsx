import React from 'react';
import moment from 'moment';

const Footer = () => (
  <footer className="bg-white sticky-footer">
    <div className="container my-auto">
      <div className="text-center my-auto copyright">
        <span>Copyright © Brand {moment().year()}</span>
      </div>
    </div>
  </footer>
);

export default Footer;
