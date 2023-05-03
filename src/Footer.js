import './Styles/Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

import React from 'react'

function Footer() {
  return (
    <div className='footer'>
      <div className="footer__media">
        <Link target='_blank' to='https://github.com/Ludacris2G'>
          <GitHubIcon className='footer__icon'/>
        </Link>

        <Link target='_blank' to='https://www.instagram.com/lee.veu/'>
          <InstagramIcon className='footer__icon'/>
        </Link>

        <Link target='_blank' to='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'>
          <CoronavirusIcon className='footer__icon'/>
        </Link>

        <SportsMartialArtsIcon className='footer__icon'/>
      </div>
      <div className="footer__text">
        <span>Info • </span>
        <span>Support • </span>
        <span>Marketing</span>
      </div>
      <div className="footer__text">
        <span>Terms of Use • </span>
        <span>Privacy Policy</span>
      </div>
      <h6 className='footer__company'>© 2023 memag</h6>
      <small className='footer__small'>made by lee</small>
    </div>
  )
}

export default Footer
