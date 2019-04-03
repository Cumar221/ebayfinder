import React, { Component } from "react";
import Toolbar from "./Toolbar";
import SideNav from "./SideNav";
import Shadow  from "./Shadow";
import ebay_logo from '../img/small_125x75.gif';


export default class Settings extends Component {
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
            <div style={{ textAlign: 'center'}}>
                <div id='contact_row' className="row" style={{marginTop: '100px'}}>
                    <div className="col-md-4 col-sm-8 mx-auto p-0">
                        <div className="card p-3">
                            <div style={{textAlign: 'center'}}>
                                <h4>Settings</h4>
                            </div>
                        </div>
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