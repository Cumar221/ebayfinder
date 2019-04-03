import React from 'react';
import logo from '../img/logo.png'

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_nav">
            <i className="fa fa-bars" style={{fontSize: '1.5rem'}}onClick={props.click}></i>
            <div className="toolbar_logo"><a href="/"><img alt='logo' src={logo} width="100" height="100"/></a></div>
            <div className="spacer"/>
            {!props.logged_in ? (
            <div className="agileinfo_menu_right"> 
                <ul> 
                    <li> <a href="/signin">Sign In</a> </li> 
                    <li> <a href="/signup">Sign Up</a> </li> 
                </ul> 
                <div className="agileinfo_menu_right_pos"> 
                    <p>Or</p> 
                </div> 
            </div>
            ): (
            <div className="agileinfo_menu_right"> 
                <ul> 
                    <li onClick={props.logout}><a>Sign Out</a></li> 
                </ul> 
            </div>)}
        </nav>
    </header>

);

export default toolbar;