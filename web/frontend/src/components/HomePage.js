import React, { Component } from "react";
import Toolbar from "./Toolbar";
import SideNav from "./SideNav";
import Shadow  from "./Shadow";

export default class HomePage extends Component {
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
            <div style={{color: 'white', textAlign: 'center'}}>
                <div className="col-md-6 wthree_services_left">
                    <h4>What Do We Do?</h4>
                    <hr style={{background: 'white'}}/>
                    <p>We search eBay for you while you’re offline or away from your computer. 
                    You’ll get instant notification when somebody has listed an item matching your search criteria.</p>
                    <h4>How Are We Different?</h4>   
                    <hr style={{background: 'white'}}/>
                    <p>On eBay, when you create a search, you’ll get a notification on newly listed items only once a day. 
                    We will send you a notification as soon as the next BUY-IT-NOW item is listed and you have a chance to buy it immediately. 
                    Just sign in and try it for yourself.</p>
                    <br/><br/>
                </div>
                <div className="row" >
                    <div className="col-sm-4 col-md-4 wthree_services_left">
                        <div className="wthree_services_left1"> <span className="fa fa-gift" aria-hidden="true"></span> </div>
                        <h4>For Bargain Hunters</h4>
                        <p> 
                            Are you a BARGAIN HUNTER, inspired COLLECTOR, looking for the BEST DEAL or want to transform your hobby into a profitable business? 
                            Then LazyPerks is your #1 choice! 
                            Create your searches and we’ll be constantly monitoring real time eBay data for newly listed BUY-IT-NOW items that match your search criteria and we will send you instant notification the minute those items are listed. 
                            There is no need anymore to constantly refresh eBay page, LazyPerks does it for you! 
                            Be the first one to grab the best deal!
                        </p>
                    </div>
                    <div className="col-sm-4 col-md-4 wthree_services_left"> 
                        <div className="wthree_services_left1"> <span className="fa fa-dollar" aria-hidden="true"></span> </div>
                        <h4>For Businesses</h4>
                        <p> 
                            Do you have a reselling business? 
                            Then you know that timing is everything! 
                            With our FAST RESPONSE TIME, which is usually LESS THAT ONE MINUTE after the listing is published on eBay, you will get an instant notification WAY AHEAD OF YOUR COMPETITORS without having to spend your valuable time refreshing eBay pages. 
                            If you are a reseller, LazyPerks is a MUST HAVE PLATFORM to expedite your turnaround time. We help you to find products at the lowest price and resell it with the highest profit margin.
                        </p>
                    </div>
                    <div className="col-sm-4 col-md-4 wthree_services_left">
                        <div className="wthree_services_left1"> <span className="fa fa-connectdevelop" aria-hidden="true"></span> </div>
                        <h4>Custom Solutions</h4>
                        <p>
                            Texriver, Inc. specializes in the full stack development of modern web and mobile applications, using the latest technology and design patterns. We provide professional services at multiple levels, including architecture design, third party product integration, and general application development. 
                            As the developers of LazyPerks, where we created solution, that in real time collect and process millions live data records, we know big-data and real-time communications. Whether you are just getting started with a great idea, or looking to breathe a new life into existing application, we have necessary expertise to get you where you want to be.
                        </p>
                    </div>
                    <div className="services-bottom"> 
                        <h3>Our Service Have Helped Countless Bargain Hunterst To Be The First Ones To Grab The Best EBay Deals</h3> 
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