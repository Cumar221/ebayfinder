import React, { Component } from "react";
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

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {show, toggle, handleDelete, item} = this.props;
  
    return (
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}> Confirm </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Are you sure you want to delete?</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" style={{width: '50%'}} onClick={() => handleDelete(item)}>
            YES
          </Button>
          <Button color="success" style={{width: '50%'}} onClick={() => toggle()}>
            NO
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}