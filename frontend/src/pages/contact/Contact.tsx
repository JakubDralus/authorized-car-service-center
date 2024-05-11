import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import React, { useState } from 'react';
import "./Contact.css"

const Contact = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const infoClassName = `info${isHovered ? '.hovered' : ''}`;
    return (
    <> 
        <Navbar/>
           <div className="contact-container">
                <div className="contact-banner">
                    <div className="banner-wrapper">
                        <div className="banner-info-container">
                            <h1>Contact us</h1>
                            <div>Get in touch with us</div>
                        </div>
                    </div>
                </div>

                <div className="content-wrap">
                    <div className="contact-info">
                        <div className="contact-info-wrap">
                          <div className="info" > 
                            <div className="info-col">
                                <div className="info-box-col"> 
                                  <div className="info-box-col-content">
                                    <div className="info-box">
                                      <div className="info-box-left-right-wrap">
                                        <div className="info-box-content">
                                            <div className="info-box-content-icon">

                                            </div>
                                            <div className="info-box-content-title">
                                                <h3>Opening Times </h3>
                                            </div>

                                            <div className="info-box-separator">
                                                <div className="info-box-separator-line">
                                                </div>
                                            </div>
                                            
                                            <div className="info-box-content-text">
                                                <div className="info-box-text">
                                                    <p>Monday - Friday 24/7</p> 
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                      
                                  </div> 
                                </div>
                            </div>
                          </div>

                          <div className="info"> 
                            <div className="info-col">
                                <div className="info-box-col"> 
                                  <div className="info-box-col-content">
                                    <div className="info-box">
                                      <div className="info-box-left-right-wrap">
                                        <div className="info-box-content">
                                            <div className="info-box-content-icon">

                                            </div>
                                            <div className="info-box-content-title">
                                                <h3>Contact Phone</h3>
                                            </div>

                                            <div className="info-box-separator">
                                                <div className="info-box-separator-line">
                                                </div>
                                            </div>
                                            
                                            <div className="info-box-content-text">
                                                <div className="info-box-text">
                                                    <p>669 244 105</p> 
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                      
                                  </div> 
                                </div>
                            </div>
                          </div>

                          <div className="info"> 
                            <div className="info-col">
                                <div className="info-box-col"> 
                                  <div className="info-box-col-content">
                                    <div className="info-box">
                                      <div className="info-box-left-right-wrap">
                                        <div className="info-box-content">
                                            <div className="info-box-content-icon">

                                            </div>
                                            <div className="info-box-content-title">
                                                <h3>E-mail </h3>
                                            </div>

                                            <div className="info-box-separator">
                                                <div className="info-box-separator-line">
                                                </div>
                                            </div>
                                            
                                            <div className="info-box-content-text">
                                                <div className="info-box-text">
                                                    <p> krolstarejwsi69@gmail.com</p> 
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                      
                                  </div> 
                                </div>
                            </div>
                          </div>
                          
                          <div className="info"> 
                            <div className="info-col">
                                <div className="info-box-col"> 
                                  <div className="info-box-col-content">
                                    <div className="info-box">
                                      <div className="info-box-left-right-wrap">
                                        <div className="info-box-content">
                                            <div className="info-box-content-icon">

                                            </div>
                                            <div className="info-box-content-title">
                                                <h3>Adress </h3>
                                            </div>

                                            <div className="info-box-separator">
                                                <div className="info-box-separator-line">
                                                </div>
                                            </div>
                                            
                                            <div className="info-box-content-text">
                                                <div className="info-box-text">
                                                    <p>Mieczysława Medweckiego 2, 31-870 Kraków</p> 
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                      
                                  </div> 
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>

                <div className="form-row-content-wrap">
                  <div className="form-row-content">
                    <div className="form-col-group">
                      <div className="form-col">
                        <div className="form-map-col">
                          <div className="form-map-col-module">
                            <div className="form-map-col-content">
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.5038975127472!2d20.014752812340166!3d50.07685191407425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716453af1fd622f%3A0xa62689a1c5160b1f!2zS0ZDIEtyYWvDs3cgQ3p5xbx5bnk!5e0!3m2!1spl!2spl!4v1715425964801!5m2!1spl!2spl" width="600" height="450" className="map"></iframe>   
                            </div>
                          </div>
                        </div>
                        
                      </div>

                      <div className="form-col">
                        <div className="form-col-content">
                          <div className="form-col-header">
                            
                            <h2>
                              <span> Message us</span>
                            </h2>
                          </div>

                          <div className="form-col-module">
                            <div className="form-col-module-content">
                              <div className="form-col-module-content-inner">
                                <div className="form-col-module-wrapper">
                                  <form>
                                    <div className="form-body">
                                      <ul className="form-list-fields">
                                        <li className="list-field"></li>
                                        <li className="list-field"></li>
                                        <li className="list-field"></li>
                                        <li className="list-field"></li>
                                      </ul>
                                    </div>
                                    <div className="form-footer"></div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>            
                      </div>
                    </div>
                  </div>
                </div>
           </div>
        <Footer/>
    </>)
}
export default Contact