import React from "react";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaEnvelope } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';
import './Footer.css'

const Footer = () => {
  const handleServiceClick = () => {
    // Scroll to the service section on the home page
    const serviceSection = document.getElementById('ser');
    serviceSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer>
        <div className="footer_logo">
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            <h1 className="fw-bold text-weight-bold m-0" style={{ color: "DarkRed", fontSize: "3rem" }}>HOME<span className="text-weight-bold" style={{ color: "orange" }}> HARBOR</span></h1>
          </a>
        </div>
        <div className="pages">
          <h3>Pages</h3>
          <a href="/">Home</a>|
          <a href="#" onClick={handleServiceClick}>Services</a>|
          <a href="/about">About Us</a>|
          <a href="/viewfeedback">Feedback</a>|
        </div>
        {/* <div className="doc">
          <h3>Documentations</h3>
          <a href="/privacypolicy">Privacy Policy</a>|
          <a href="/termsandconditions">Terms and Conditions</a>
        </div> */}
        <div className="social">
          <h3>Follow</h3>
          <a href="https://www.instagram.com/" target="_blank"><FaInstagram /></a>|
          <a href="https://twitter.com/login?lang=en" target="_blank"><BsTwitter /></a>|
          <a href="https://www.facebook.com/" target="_blank">< FaFacebookF /></a>|
          <a href="https://www.youtube.com/">< BsYoutube /></a>
        </div>
        <div className="contact">
          <h3>Contact Us</h3>
          <a href="https://api.WhatsApp.com/send?phone=+911234567890" target="_blank"><IoLogoWhatsapp/></a>|
          <a href="mailto: nikitajijopallath@gmail.com"><FaEnvelope/></a>|
          <a href="tel: +911234567890"><MdPhone/></a>
        </div>
        <hr/>
        <p>Copyright &copy; 2024 Home Harbor. All rights reserved</p>
      </footer>
    </>
  );
};

export default Footer;
