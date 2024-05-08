import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import "./Contact.css"

const Contact = () => {
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
                      <div className="form-col"></div>

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