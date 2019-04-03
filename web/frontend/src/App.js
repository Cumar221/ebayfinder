import React, { Component } from "react";
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import HomePage from './components/HomePage'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Search from "./components/Search";
import Result from "./components/Result";
import Contact from "./components/Contact";
import About from "./components/About";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import NotFound from "./components/NotFound";
import Settings from "./components/Settings";
import ring from "./audio/default.wav"

 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      user_id: ''
    };
  }

  notification(){
    var loc = window.location
    var wsStart = 'ws://'
    if (loc.protocol === 'https:' ){
      wsStart = 'wss://'
    }
    var endpoint = wsStart + "localhost:8000/socketserver"
    var socket = new WebSocket(endpoint)
    this.setState({socket})

    socket.onmessage = (e) => {
     
      var data = JSON.parse(e.data);
      if(data['username'] === this.state.username){
        this.createNotification('success', data)
      }
    }
    socket.onopen = (e) => {
      console.log("open")
    }
    socket.onerror = (e) => {
      console.log("error")
    }
    socket.onclose = (e) => {
      console.log("close")
    }
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        if (!res.ok) {
          this.handle_logout()
        }
        return res.json()
      })
      .then(json => {
        this.notification();
        this.setState({ username: json.username, user_id: json.id });
      });
    }
   
    if(!this.state.logged_in){
      this.setState({displayed_form: 'login'})
    }
    
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <main id="main" style={{height: "100%"}}>
        <NotificationContainer/>
        <audio ref={(green) => { this.green = green; }}>
			      <source src={ring} type="audio/wav"></source>
		    </audio>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={HomePage}></Route>
              <Route path='/contact' component={Contact}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/signin' component={LoginForm}></Route>
              <Route path='/signup' component={SignupForm}></Route>
              <Route path='/search' component={Search}></Route>
              <Route path='/result' component={Result}></Route>
              <Route path='/terms' component={Terms}></Route>
              <Route path='/privacy' component={Privacy}></Route>
              <Route path='/settings' component={Settings}></Route>
              <Route path='*' component={NotFound}></Route>
            </Switch>
          </div>
          
        </BrowserRouter>
        <i id="myBtn" className="fa fa-arrow-up" onClick= {this.scrollToTop} style={{display: this.state.scroll}}></i>
      </main>
    );
  }
}

export default App;
