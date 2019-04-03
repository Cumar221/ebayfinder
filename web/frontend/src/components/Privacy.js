import React, { Component } from "react";
import Toolbar from "./Toolbar";
import SideNav from "./SideNav";
import Shadow  from "./Shadow";

export default class Privacy extends Component {
    constructor(props) {
      super(props);
      this.state = {
        navOpen: false,
        logged_in: localStorage.getItem('token') ? true : false,
      };
    }

    scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.setState({scroll: 'none'})
    }

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, navOpen: false});
        if (this.state.socket != null && this.state.socket.readyState === WebSocket.OPEN) {
          this.state.socket.close();
        }
    };

    openNav = () => {
        this.setState((prevState) =>{
          return {navOpen: !prevState.navOpen};
        })
      }
    
    closeNav = () =>{
        this.setState({navOpen: false})
    }  
    render() {
        let shadow
  
        if (this.state.navOpen){
            shadow = <Shadow click={this.closeNav}/>
        }
      return (
            <React.Fragment>
            <Toolbar user={this.state.username} logout={this.handle_logout} logged_in={this.state.logged_in} click={this.openNav}/>
            <SideNav logout={this.handle_logout} logged_in={this.state.logged_in} show={this.state.navOpen} click={this.openNav}/>
            {shadow}     
            <div className="banner1"></div>
            <div style={{color: 'white', textAlign: '-webkit-center'}}>
               <div class="services"> 
                    <div class="wthree_services_grid"> 
                        <div class="col-s-8 col-lg-8 wthree_services_left2" style={{textAlign: 'left'}}> 
                            <h1>Privacy Policy</h1> 
                            <hr/> 
                            <p> This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online.
                                PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a 
                                single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or 
                                otherwise handle your Personally Identifiable Information in accordance with our website. 
                            </p> 
                            <h4>What personal information do we collect from the people that visit our blog, website or app?</h4>
                            <p> When ordering or registering on our site, as appropriate, you may be asked to enter your email address or other details to help you with your experience. </p> 
                            <h4>When do we collect information?</h4> 
                            <p> We collect information from you when you register on our site, Open a Support Ticket, enter information on our site or provide us with feedback on our products or services. </p> 
                            <h4>How do we use your information?</h4> 
                            <p> we may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, 
                                or use certain other site features to personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested. </p>
                            <h4>How do we protect visitor information?</h4> 
                            <p> Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required 
                                to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. 
                            </p> 
                            <p> We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information. </p> 
                            <p>All transactions are processed through a gateway provider and are not stored or processed on our servers.</p> 
                            <h4>Do we use 'cookies'?</h4> 
                            <p> Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service 
                                provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and apply your session settings. 
                                They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to 
                                help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. 
                            </p> 
                            <p> You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings.
                                Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies. 
                            </p> 
                            <p> If you disable cookies off, some features will be disabled It won't affect the user's experience that make your site experience more efficient and some of our services will not function properly. </p> 
                            <h4>Third-party disclosure</h4> 
                            <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.</p> 
                            <h4>Third-party links</h4> 
                            <p> Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no 
                                responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites. 
                            </p> 
                            <p> We along with third-party vendors, such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers 
                                together to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our website. 
                            </p> 
                            <h4>California Online Privacy Protection Act</h4> 
                            <p> CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require a person or company in 
                                the United States (and conceivably the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly 
                                the information being collected and those individuals with whom it is being shared, and to comply with this policy. - See more at: <a href="http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf"> 
                                http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf </a> 
                            </p> 
                            <h4>According to CalOPPA we agree to the following:</h4> 
                            <p> Users can visit our site anonymously; Once this privacy policy is created, we will add a link to it on our home page or as a minimum on the first significant page after entering our website; Our Privacy Policy 
                                link includes the word 'Privacy' and can be easily be found on the page specified above. 
                            </p> 
                            <h4>COPPA (Children Online Privacy Protection Act)</h4>
                            <p> When it comes to the collection of personal information from children under 13, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, the nation's consumer 
                                protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online. 
                            </p> 
                            <p>We do not specifically market to children under 13.</p> 
                            <h4>Fair Information Practices</h4> 
                            <p> The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. 
                                Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.
                            </p> 
                            <h4>In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:</h4> <p>Within 3 business days we will notify the users via email</p> 
                            <p>Within 1 business days we will notify the users via in-site notification</p> 
                            <p> We also agree to the Individual Redress Principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law. 
                                This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance 
                                by data processors. 
                            </p> 
                            <h4>CAN SPAM Act</h4> 
                            <p> The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough 
                                penalties for violations. </p> <p>We collect your email address in order to:
                            </p> 
                            <p> <strong>•</strong> Send information, respond to inquiries, and/or other requests or questions.
                            <br/> <strong>•</strong> Process orders and to send information and updates pertaining to orders.<br/> <strong>•</strong> We may also send you additional information related to your product and/or service.<br/> 
                            </p> 
                            <p>To be in accordance with CANSPAM we agree to the following:</p> 
                            <p> <strong>•</strong> NOT use false or misleading subjects or email addresses.<br/> <strong>•</strong> Identify the message as an advertisement in some reasonable way.<br/> <strong>•</strong> Include the physical 
                                address of our business or site headquarters.<br/> <strong>•</strong> Monitor third-party email marketing services for compliance, if one is used.<br/> <strong>•</strong> Honor opt-out/unsubscribe requests quickly.<br/> 
                                <strong>•</strong> Allow users to unsubscribe by using the link at the bottom of each email.<br/> 
                            </p> 
                            <p> If at any time you would like to unsubscribe from receiving future emails, you can email us at support@lazyperks.com 
                                and we will promptly remove you from ALL correspondence. 
                            </p>
                        </div> 
                        <div class="col-s-2 col-lg-2 wthree_services_left2"> </div> 
                        <div class="clearfix"> </div> 
                    </div>
                </div>
                <div className="footer"> 
                    <div className="footer-copy"> 
                        <div className="w3agile_footer_grids row"> 
                            <div className="w3agile_footer_grid col-sm-4 col-md-4 "> 
                                <h3>About Us</h3> 
                                <p> Texriver, Inc. is the boutique software development company that specializes in eBay real-time data acquisition and data processing, enhancing eBay sellers and buyers experience and bottom line. <br/> 
                                    Our product is LAZYPERKS™ - #1 eBay bargain hunting machine, where you create your custom searches (desired price and description) and be notified as soon as the matching item is listed on eBay. 
                                    We call it a goldmine for collectors and resellers.
                                </p> 
                            </div> 
                            <div className="w3agile_footer_grid col-sm-4 col-md-4 "> 
                                <h3>Contact Info</h3> 
                                <ul> 
                                    <li><i className="fa fa-map-marker" aria-hidden="true"></i>P.O. Box 1062, <span>Cedar Park, TX</span><span>78630-1062</span></li> 
                                    <li><i className="fa fa-envelope" aria-hidden="true"></i><a href="mailto:contact@lazyperks.com">contact@lazyperks.com</a> </li> 
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>+1-512-730-1739</li> 
                                </ul> 
                            </div> 
                            <div className="w3agile_footer_grid w3agile_footer_grid1 col-sm-4 col-md-4 "> 
                                <h3>Navigation</h3> 
                                <ul>
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/contact">Contact Us</a> </li> 
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/terms">Trems of Services</a> </li> 
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/privacy">Privacy Policy</a> </li> 
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/about">About</a> </li> </ul> 
                            </div> 
                            <div className="clearfix"> </div> 
                        </div> 
                    </div> 
                    <div className="copy-right-social"> 
                        <div className="footer-pos"> 
                            <a onClick= {this.scrollToTop} className="scroll"> <span></span> </a> 
                        </div> 
                        <div className="copy-right"> 
                            <p> © <a href="http://www.texriver.com" target="_blank"> 2014 - 2019 Texriver, Inc.</a> 
                               
                            </p> 
                        </div>
                         <div className="copy-right-social1"> 
                            <ul className="wthree_social_icons1"> 
                                <li> <a href="https://www.facebook.com/lazyperks" target="_blank" className="icon1 w3_facebook"> 
                                    <i className="fa fa-facebook" aria-hidden="true"></i> </a> </li> 
                                <li> <a href="https://twitter.com/lazyperks" target="_blank" className="icon1 w3_twitter"> 
                                    <i className="fa fa-twitter" aria-hidden="true"></i> </a> </li> 
                            </ul> 
                        </div>
                        <div className="clearfix"> </div> 
                    </div> 
                </div>
            </div>
            </React.Fragment>
        );
    }
  }