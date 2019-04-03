import React, { Component } from "react";
import Select from 'react-select';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const MAX_OPTIONS = 3;

export const sites = [
  {  name: 'site', value:'Australia',    label: 'Australia (AUD)' },
  {  name: 'site', value:'Austria' ,     label: 'Austria (EUR)' },
  {  name: 'site', value:'Belgium' ,     label: 'Belgium (EUR)' },
  {  name: 'site', value:'Canada' ,      label: 'Canada (CAD)' },
  {  name: 'site', value:'France' ,      label: 'France (EUR)' },
  {  name: 'site', value:'Germany' ,     label: 'Germany (EUR)' },
  {  name: 'site', value:'Ireland' ,     label: 'Ireland (EUR)' },
  {  name: 'site', value:'Italy' ,       label: 'Italy (EUR)' },
  {  name: 'site', value:'Netherlands' , label: 'Netherlands (EUR)' },
  {  name: 'site', value:'Spain' ,       label: 'Spain (EUR)' },
  {  name: 'site', value:'Switzerland' , label: 'Switzerland (CHF)' },
  {  name: 'site', value:'UK' ,          label: 'UK (GBP)' },
  {  name: 'site', value:'USA' ,         label: 'USA (USD)' }
];

export const categories = [
  { name: 'category', label: 'Antiques', value: 20081},
  { name: 'category', label: 'Art', value: 550},
  { name: 'category', label: 'Baby', value: 2984},
  { name: 'category', label: 'Books', value: 267},
  { name: 'category', label: 'Business & Industrial', value: 12576},
  { name: 'category', label: 'Cameras & Photo', value: 625},
  { name: 'category', label: 'Cell Phones & Accessories', value: 15032},
  { name: 'category', label: 'Clothing Shoes & Accessories', value:11450},
  { name: 'category', label: 'Coins & Paper Money', value: 20081},
  { name: 'category', label: 'Collectibles', value: 1},
  { name: 'category', label: 'Computers/Tablets & Networking', value: 58058},
  { name: 'category', label: 'Consumer Electronics', value: 293},
  { name: 'category', label: 'Crafts', value:14339},
  { name: 'category', label: 'Dolls & Bears', value: 237},
  { name: 'category', label: 'DVDs & Movies', value:11232},
  { name: 'category', label: 'eBay Motors', value: 6000},
  { name: 'category', label: 'Entertainment Memorabilia', value: 45100},
  { name: 'category', label: 'Gift Cards & Coupons', value: 20081},
  { name: 'category', label: 'Health & Beauty', value:26395},
  { name: 'category', label: 'Home & Garden', value: 11700},
  { name: 'category', label: 'Jewelry & Watches', value: 281},
  { name: 'category', label: 'Music', value: 11233},
  { name: 'category', label: 'Musical Instruments & Gear', value: 619},
  { name: 'category', label: 'Pet Supplies', value: 1281},
  { name: 'category', label: 'Pottery & Glass', value: 870},
  { name: 'category', label: 'Real Estate', value: 20081},
  { name: 'category', label: 'Specialty Services', value: 316},
  { name: 'category', label: 'Sporting Goods', value: 888},
  { name: 'category', label: 'Sports Mem, Cards & Fan Shop', value: 64482},
  { name: 'category', label: 'Stamps', value:20081},
  { name: 'category', label: 'Tickets', value:1305}, 
  { name: 'category', label: 'Toys & Hobbies', value: 220},
  { name: 'category', label: 'Travel', value:3252},
  { name: 'category', label: 'Video Games', value:1249},
  { name: 'category', label: 'Everything Else', value: 99},
]

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteMaxReached: false,
      categoryMaxReached: false,
      activeItem: this.props.activeItem,
      site: this.props.site,
      category: this.props.category,
      selectedSiteOptions: [],
      selectedCategoryOptions: []
    };
  }

  handleChange = (e) => {
      let { name, value } = e.target;
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
  
  };

  handleCategorySelect = (e, { action, option }) => {
    let name = 'category';
    var list = "";

    if (action === "select-option" && this.state.categoryMaxReached) {
      return;
    }
    
    if (action === "select-option" && e.length === MAX_OPTIONS) {
      this.setState({ categoryMaxReached: true });
    }

    e.forEach(element => {
      if (list === ""){
        list = element.label;
      }
      else{
        list = list.concat(', ' ,element.label);
      }
    });

    const activeItem = { ...this.state.activeItem, [name]: list};
    const categoryMaxReached = e.length >= MAX_OPTIONS;
    this.setState({ activeItem , selectedOptions: e, categoryMaxReached});
  }

  handleSiteSelect = (e, { action, option }) => {
    let name = 'site';
    var list = "";

    if (action === "select-option" && this.state.siteMaxReached) {
      return;
    }
    
    if (action === "select-option" && e.length === MAX_OPTIONS) {
      this.setState({ siteMaxReached: true });
    }

    e.forEach(element => {
      if (list === ""){
        list = element.value;
      }
      else{
        list = list.concat(', ' ,element.value);
      }
    });
    
    const activeItem = { ...this.state.activeItem, [name]: list};
    const siteMaxReached = e.length >= MAX_OPTIONS;
    this.setState({ activeItem , selectedOptions: e, siteMaxReached});
  }

  noOptionsCategoryMessage = ({ inputValue }) => {
    const { categoryMaxReached } = this.state;
    return categoryMaxReached
      ? `You can only select ${MAX_OPTIONS} options...`
      : `No options matching "${inputValue}"`;
  };

  noOptionsSiteMessage = ({ inputValue }) => {
    const { siteMaxReached } = this.state;
    return siteMaxReached
      ? `You can only select ${MAX_OPTIONS} options...`
      : `No options matching "${inputValue}"`;
  };

  render() {
    const { toggle, onSave } = this.props;
    const { siteMaxReached, categoryMaxReached, selectedSiteOptions, selectedCategoryOptions } = this.state;
    
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Search Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">SEARCH NAME</Label>
              <Input
                type="text"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Search Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="site">SELECT SITE</Label>
              <Select defaultValue={this.state.site} placeholder="Select Site..." options={siteMaxReached ? selectedSiteOptions :sites} isMulti onChange={this.handleSiteSelect} noOptionsMessage={this.noOptionsSiteMessage}/>
            </FormGroup>
            <FormGroup>
              <Label for="category">CATEGORY</Label>
              <Select  defaultValue={this.state.category} isClearable={true} placeholder="Select Category..." isMulti options={categoryMaxReached ? selectedCategoryOptions : categories} onChange={this.handleCategorySelect} noOptionsMessage={this.noOptionsCategoryMessage}/>
            </FormGroup>
            <FormGroup>
              <Label for="minPrice">LOWEST PRICE</Label>
              <Input
                type="number"
                min="0"
                name="minPrice"
                value={this.state.activeItem.minPrice}
                onChange={this.handleChange}
                placeholder="0.00"
              />
            </FormGroup>
            <FormGroup>
              <Label for="maxPrice">HIGHEST PRICE</Label>
              <Input
                type="number"
                min="0"
                name="maxPrice"
                value={this.state.activeItem.maxPrice}
                onChange={this.handleChange}
                placeholder="0.00"
              />
            </FormGroup>
            <FormGroup>
              <Label for="keyword">ENTER KEYWORDS (EXACT WORDS, ANY ORDER):</Label>
              <Input
                type="text"
                name="keyword"
                value={this.state.activeItem.keyword}
                onChange={this.handleChange}
                placeholder="All entered words will be included into the search"
              />
            </FormGroup>
           
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}