import React from 'react';
import logo from '../img/logo.png';
import{NavLink} from 'react-router-dom';


const sideNav = props => {
    let classes = 'side_nav';
    if (props.show){
        classes = 'side_nav open';
    }
    return ( 
        <nav className={classes}>
            <i style={{position: "absolute", right: 0, fontSize: '2.0rem'}} onClick={props.click} className="fa fa-times"></i>
            <img alt="logo" src={logo} style={{width: '100%', zIndex: '-1', top: '-35px'}}/>
            {props.logged_in ? (
                <ul>
                    <NavLink to="/"><li><i className="fa fa-home"></i>Home</li></NavLink>
                    <NavLink to="/search"><li><i className="fa fa-search"></i>Search</li></NavLink>
                    <NavLink to="/result"><li><i className="fa fa-list-ul"></i>Result</li></NavLink> 
                    <NavLink to="/settings"><li><i className="fa fa-cogs"></i>Settings</li></NavLink>
                    <li onClick={props.logout}><i className="fa fa-sign-out" ></i>Logout</li>
                </ul>
             ): (
                <ul>
                    <NavLink to="/"><li><i className="fa fa-home"></i>Home</li></NavLink>
                    <NavLink to="/contact"><li><i className="fa fa-phone"></i>Contact</li></NavLink>
                </ul>
             )}
        </nav>);
};

export default sideNav;