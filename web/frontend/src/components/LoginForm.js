import React from 'react';
import logo from '../img/logo.png'
import {NotificationManager} from 'react-notifications';
import Toolbar from "./Toolbar";
import SideNav from "./SideNav";
import Shadow  from "./Shadow";

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: this.props.error
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  createNotification = (type, data) => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success(data['price'], data['title'],5000, () => {
          window.open(data['url'], '_blank');
        });
        
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Please login/sign up again', 'Error', 5000);
        break;
      default:
        console.log('error')
    }
  };

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) {
          this.createNotification('error')
          this.setState({login_error: true})
          throw (res.statusText);
        }
        return res.json()
    })
    .then(json => {
      localStorage.setItem('token', json.token);
      this.props.history.push('/search')
      
    }).catch(function(e) {
      console.log("error", e);
    });
  };

  openNav = () => {
    this.setState((prevState) =>{
      return {navOpen: !prevState.navOpen};
    })
  }
  closeNav = () =>{
    this.setState({navOpen: false})
  }  

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.setState({scroll: 'none'})
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
        <div id='login_row' className="row" style={{marginTop: '100px'}}>
            <div className="col-md-4 col-sm-6 mx-auto p-0">
              <div className="card p-3">
                <form onSubmit={e => this.handle_login(e, this.state)}>
                  <div className="row" style={{justifyContent: 'center'}}>
                    <div className="col-sm-10 col-md-10 col-lg-10 ">
                      <img alt='logo' src={logo} style={{position: "relative", width: '100%'}}/>
                      <h4 style={{textAlign: 'center'}}>Sign In</h4>
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handle_change} required
                      />
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handle_change}
                        required
                      />
                      <button style={{margin: '20px 0px', width: '100%'}} className="btn btn-primary">Submit</button>
                      <div style={{textAlign: 'center'}}>
                        <p onClick={() => this.props.history.push('/signup')}> Don't have an account? Sign Up</p>
                      </div>
                    </div>
                  </div>
                </form>
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
        </React.Fragment> 
    );
  }
}

export default LoginForm;