import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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
import { resolve, reject } from "q";

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
      Axios.post("http://100.24.15.0:3000/api/v1/login", data)
        .then(res => {
          storage.set("token", res.data.token);

          resolve();
          window.location.href = "/home";
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // submitLogin(event) {
  //   event.preventDefault();
  //   let data = new FormData(event.target);

  //   Axios.post("http://100.24.15.0:3000/api/v1/login", data)
  //     .then(res => {
  //       let success = res.data.success;
  //       if (success === 200) {
  //         ls.set("token", res.data.token);
  //         this.setState({
  //           message: "Login Success!"
  //         });
  //         console.log(this.state.message);
  //         // } else {
  //         //   this.setState({
  //         //     message: "User / Password is invalid!"
  //         //   });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       // this.setState({
  //       //   message: "Login Failed!"
  //       // });
  //     });
  // }

  // onChangeLogin(e) {
  // 	this.setState({ [e.target.value]: e.target.value })
  // }

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
      // <Form onSubmit={this.submitLogin}>
      //   <FormGroup>
      //     <Label>User</Label>
      //     <Input type="text" name="user" />
      //   </FormGroup>
      //   <FormGroup>
      //     <Label>Password</Label>
      //     <Input type="password" name="password" />
      //   </FormGroup>
      //   <Button color="primary">Login</Button>{" "}
      // </Form>
      // <div id="login">
      //   <h3 className="text-center text-white pt-5">Login form</h3>
      //   <div className="container">
      //     <div
      //       id="login-row"
      //       className="row justify-content-center align-items-center"
      //     >
      //       <div id="login-column" className="col-md-6">
      //         <div id="login-box" className="col-md-12">
      //           <form
      //             id="login-form"
      //             className="form"
      //             onSubmit={this.submitLogin}
      //           >
      //             <h3 className="text-center text-info">Login</h3>
      //             <div className="form-group">
      //               <label htmlFor="username" className="text-info">
      //                 Username:
      //               </label>
      //               <br />
      //               <input
      //                 type="text"
      //                 name="user"
      //                 id="user"
      //                 className="form-control"
      //                 // value={this.state.user}
      //                 // onChange={this.onChangeLogin}
      //               />
      //             </div>
      //             <div className="form-group">
      //               <label htmlFor="password" className="text-info">
      //                 Password:
      //               </label>
      //               <br />
      //               <input
      //                 type="password"
      //                 name="password"
      //                 id="password"
      //                 className="form-control"
      //                 // value={this.state.password}
      //                 // onChange={this.onChangeLogin}
      //               />
      //             </div>
      //             <div className="form-group">
      //               <Link to={"/home"}>
      //                 <button className="btn btn-primary">Submit</button>
      //               </Link>
      //             </div>
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
