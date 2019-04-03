import React, { Component } from "react";
import Select from 'react-select';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios";
import Pagination from "react-js-pagination";
import Modal, {sites,categories} from "./Modal";
import ConfirmModal from "./ConfirmModal";
import Toolbar from "./Toolbar";
import SideNav from "./SideNav";
import Shadow  from "./Shadow";
import{NavLink} from 'react-router-dom';
import ring from "../audio/default.wav"

export default class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bellOn: true,
        title: 'SEARCH',
        socket: null,
        deleteItem: null,
        itemCount: 0,
        login_error: false,
        displayed_form: '',
        logged_in: localStorage.getItem('token') ? true : false,
        username: '',
        user_id: 0,
        navOpen: false,
        searchNotifications: {},
        selectedOption: null,
        modal: false,
        confirm_modal: false,
        site: Object,
        category: [],
        activePage: 1,
        activeItem: {
          name: "",
          site: "",
          category: "",
          minPrice: "",
          maxPrice: "",
          keyword: ""
        },
        sites:[{label: 'All', value: 'all'}],
        results: [{label: 'All', value: 'all'}],
        viewCompleted: true,
        searchList: [],
        resultList: [],
      };
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
          this.getNotifications();
          this.setState({ username: json.username, user_id: json.id });
          this.searchList();
        });
      }
     
      if(!this.state.logged_in){
        this.setState({displayed_form: 'login'})
      }
    }

    importAll(r) {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return images; });
      return images;
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

    editItem = item => {
      this.handleCategory(item)
      this.handleSite(item)
      this.setState({activeItem: item, modal: !this.state.modal });
    };

    confirmDelete = item => {
      console.log(item)
      this.setState({ confirm_modal: !this.state.confirm_modal, deleteItem: item });
    }

    handleSearchDelete = item => {
      axios
        .delete(`http://localhost:8000/api/search/${item.id}`, {headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {this.searchList(); this.toggleConfirmModal()}).catch(err => {
          this.handle_logout()
        });;
    };

    updateSites = () =>{
      var sites = [{label: 'All', value: 'all'}]
      this.setState({selectedOption: null})
      for (const element of this.state.searchList){
        if (!(sites.some(e => e.label === element['site']))){
          sites.push({
            label: element['site'],
            value: element['site']
          })
        }
      }
      this.setState({sites: sites})
    }

    searchList = () => {
      axios
        .get("http://localhost:8000/api/search/", {headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          let items = res.data
          this.setState({ searchList: items.reverse(), itemCount: items.length})
          this.updateSites()
         
          
        })
        .catch(err => {
          this.handle_logout()
        });
    };

    getNotifications = async() => {
      let res = await axios
        .get("http://localhost:8000/api/notification/", {headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }});
        let items = await res.data
          var dict = {}
          var list = []
          items.forEach(item =>{
            dict[item.id] = item
          })
          list.push(dict)
          this.setState({searchNotifications: dict})     
    };

    createNotification = (type, data) => {
      switch (type) {
        case 'info':
          var status = ''
          if (data['status'])
            status = 'ON'
          else
            status = 'OFF'
          NotificationManager.info(data['option'] + ' is ' + status, data['search']);
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
            
            throw Error(res.statusText);
          }
          return res.json()
      })
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
          user_id: json.user.id
        });
        this.searchList();
        this.notification();
        
      }).catch(function() {
        console.log("error");
      });
    };

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    toggleConfirmModal = () => {
      this.setState({ confirm_modal: !this.state.confirm_modal });
    };

    handleCategory = (item) =>{
      var res = item.category.split(", ");
      var category = []
  
      for (const element of categories) {
        if(res.includes(element.label)){
          category.push(element)
        }
      }
      this.setState({category})
    }

    handleSite = (item) =>{
      var site = null;
      for (const element of sites) {
        if(element.value === item.site){
          site = element
        }
      }
      this.setState({site})
    }

    handleSubmit = item => {
      item["user"] =  this.state.user_id
      item["_token"] = `JWT ${localStorage.getItem('token')}`
  
      
      this.toggle();
      if (item.id) {
        axios
          .put(`http://localhost:8000/api/search/${item.id}/`, item , {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }})
          .then(res => this.searchhList()).catch(err => {
            this.handle_logout()
          });;
        return;
      }
      axios
        .post("http://localhost:8000/api/search/", item, {headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => this.searchList()).catch(err => {
          this.handle_logout()
        });;
    };
  

    handleSearchFilter = (item) => {
      this.setState({selectedOption: item})
      axios
        .get("http://localhost:8000/api/search/", {headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          var dict = []
          var newItems = res.data
  
          if(item['value'] === 'all'){
            dict = newItems
          }
          else{
            newItems.forEach(element => {
              if (item['value'] === element['site']){
                dict.push(element)
              }
          });
        }
          this.setState({searchList: dict.reverse()})
        })
        .catch(err => {
          this.handle_logout()
        });
    }

    createItem = () => {
      const item = { name: "", site: "", category: "", minPrice: "", maxPrice: "", keyword: ""};
      this.setState({ site: null, category: null, activeItem: item, modal: !this.state.modal });
    };

    handle_logout = () => {
      localStorage.removeItem('token');
      this.setState({ logged_in: false, username: '' ,displayed_form: 'login', navOpen: false});
      if (this.state.socket != null && this.state.socket.readyState === WebSocket.OPEN) {
        this.state.socket.close();
      }
    };

    handlePageChange = (pageNumber) => {
      this.setState({activePage: pageNumber});
    }

    openNav = () => {
      this.setState((prevState) =>{
        return {navOpen: !prevState.navOpen};
      })
    }
    closeNav = () =>{
      this.setState({navOpen: false})
    }  

    resultNotification = (item) => {
      let status = !this.state.searchNotifications[item.id]['status']
      if (item.id) {
        axios
          .put(`http://localhost:8000/api/notification/${item.id}/`, {user: this.state.user_id , id: item.id, search: item.id, status: status}, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }})
          .then(res => {
            this.getNotifications()
            this.sound.play()
            this.createNotification('info', {option: 'Sound', status: status, search: item.name})
          })
          .catch(err => {
            this.handle_logout()
          });;
        return;
      }
      this.setState({bellOn: !this.state.bellOn})
    }
  
    renderItems = () => {
      const { viewCompleted } = this.state;
      var newItems = []

      newItems = this.state.searchList
      const index = this.state.activePage*6
      newItems = newItems.slice(index-6, index-1) 
      const images = this.importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));
      return newItems.map(item => (
        <React.Fragment key={item.id}>
          <div className="row" >
            <div className="col-sm-4 col-md-5 col-lg-4 "> <img alt='flag' src={images[`${item.site}.png`]} /></div>
            <table className=" table col-md-12 col-lg-8 list-group-item justify-content-between" >
            <tbody >
              <tr><th>Name:</th><td>{item.name}</td></tr>
              <tr><th>Site:</th><td>{item.site}</td></tr>
              <tr><th>Category:</th><td>{item.category}</td></tr>
              <tr><th>Search Words:</th><td>{item.keyword}</td></tr>
              <tr><th>Price Range:</th><td>{item.minPrice} - {item.maxPrice}</td></tr>
              <tr><td><span>
                <i className="fa fa-pencil-square-o action" title="Edit search" onClick={() => this.editItem(item)}></i>
                {this.state.searchNotifications[item.id] != undefined ? this.state.searchNotifications[item.id]['status'] ?
                <i className="fa fa-bell" title="Notification" onClick={() => this.resultNotification(item)}></i>
                :
                <i className="fa fa-bell-slash" title="Notification" onClick={() => this.resultNotification(item)}></i>
                :   <i className="fa fa-bell" title="Notification" onClick={() => this.resultNotification(item)}></i>
              }
                <i className="fa fa-trash-o action" title="Delete search" onClick={() => this.confirmDelete(item)}></i>
                <NavLink to={{ pathname: '/result', state: {label: item.name, value: item.id}}}><i className="fa fa-chevron-right" title="Show search results"></i></NavLink>
              </span></td></tr>
            </tbody>
            </table>
            
          </div>
        </React.Fragment>
      ));
    };
    
    render() {
      let shadow  
      if (this.state.navOpen){
        shadow = <Shadow click={this.closeNav}/>
      }
      return (
        <div>
        {this.state.logged_in 
        ? <React.Fragment> 
          <audio ref={(sound) => { this.sound = sound; }}>
			      <source src={ring} type="audio/wav"></source>
		      </audio>
           <Toolbar user={this.state.username} logout={this.handle_logout} logged_in={this.state.logged_in} click={this.openNav}/>
            <SideNav logout={this.handle_logout} logged_in={this.state.logged_in} show={this.state.navOpen} click={this.openNav}/>
            {shadow}
            <h1 style={{marginTop: '100px', marginBottom: '30px'}} className="text-white text-uppercase text-center">SEARCH</h1>
            <div id='app_row' className="row">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="row" style={{marginBottom:10}}>
                    <div style={{paddingLeft: '15px'}}>
                    <button id="newButton" onClick={this.createItem} className="btn btn-primary">NEW</button>  
                    </div>
                    <div style={{flex: '1'}}>
                      <Select defaultValue={this.state.sites[0]} value={this.state.selectedOption}  placeholder="Select Search..."  options={this.state.sites} onChange={this.handleSearchFilter}/>
                    </div>
                  </div>
                  
                  {this.renderItems()}
                  <div>
                    {this.state.itemCount === 0 ? ( <h2 style={{textAlign: "center"}}>Empty</h2>) :
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.state.itemCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                      />
                    }
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
          <ConfirmModal
                show={this.state.confirm_modal}
                toggle={this.toggleConfirmModal}
                handleDelete={this.handleSearchDelete}
                item = {this.state.deleteItem}
              />
              {this.state.modal ? (
                  <Modal
                    activeItem={this.state.activeItem}
                    toggle={this.toggle}
                    site={this.state.site}
                    category={this.state.category}
                    onSave={this.handleSubmit}
                  />
                ) : null}
            </React.Fragment> 
            : this.props.history.push('/signin')}
            </div>
      )} 
  }