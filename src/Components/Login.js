import React, { Component } from "react";
import Axios from "axios";
import storage from "local-storage";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      user: "",
      password: "",
      token: ""
    };
  }

  setUser(event) {
    let value = event.target.value;
    this.setState({
      user: value
    });
  }

  setPassword(event) {
    let value = event.target.value;
    this.setState({
      password: value
    });
  }

  submitLogin(data) {
    return new Promise((resolve, reject) => {
      Axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login`, data)
        .then(res => {
          storage.set("token", res.data.token);

          resolve((window.location.href = "/home"));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col className="mt-5 text-center border">
            <h5 className="text-center pt-5">Login Form</h5>

            <Form className="mt-5 mb-5">
              <FormGroup>
                <Label className="text-left">
                  User:{" "}
                  <Input
                    type="text"
                    name="user"
                    placeholder="Input Your User"
                    onChange={event => this.setUser(event)}
                  ></Input>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className="text-left">
                  Password:
                  <Input
                    type="password"
                    name="password"
                    placeholder="Input Your Password"
                    onChange={event => this.setPassword(event)}
                  ></Input>
                </Label>
              </FormGroup>

              <FormGroup>
                <Button
                  onClick={() =>
                    this.submitLogin({
                      user: this.state.user,
                      password: this.state.password
                    })
                  }
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}
