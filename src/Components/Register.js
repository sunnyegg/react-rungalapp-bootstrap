import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


export default class Register extends Component {

    render() {
        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Register form</h3>
                <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action method="post">
                        <h3 className="text-center text-info">Register</h3>
                        <div className="form-group">
                            <label htmlFor="username" className="text-info">Username:</label><br />
                            <input type="text" name="username" id="username" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-info">Password:</label><br />
                            <input type="text" name="password" id="password" className="form-control" />
                        </div>
                        <div className="form-group">
                                 <Link to={'/'}>
                                    <button className='btn btn-primary'>Submit</button>
                                </Link>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}