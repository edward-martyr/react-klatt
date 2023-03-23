import React from 'react';
import { Typography } from '@mui/material';

import './style.scss';

const Footer = () => {
  const thisYear = new Date().getFullYear();
  const copyrightYearStart = 2023;
  const copyrightYearRange = thisYear > copyrightYearStart ? `${copyrightYearStart}‒${thisYear}` : copyrightYearStart;
  return (
    <footer id="footer">
      <div className="copyright">
        <Typography color="grey">
          ©&thinsp;{copyrightYearRange}&ensp;Yuanhao ‘Nyoeghau’ Chen
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
