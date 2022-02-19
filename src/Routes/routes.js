import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Header from "../Header/Header";
import AddUser from "../Screens/Admin/AddUser";
import Login from "../Screens/Login";
import Main from "../Screens/Main";
import User from "../Screens/Admin/User";
import ViewUser from '../Screens/Admin/ViewUser'
import Product from '../Screens/Admin/Product'
import ViewProduct from "../Screens/Admin/ViewProducts";
import ProductHome from "../Screens/Vendor/Home";
import ViewProducts from "../Screens/Admin/ViewProducts";
import Essentials from "../Components/Validation";

export default class routes extends Essentials {

    state = {
        data: {}
    }
    changedata = (id) => {
        this.setState({ data: id })
    }
    render() {
        return (
            <Router>
                <Switch>

                    <Route exact path={"/"} render={props => {
                        return (
                            <React.Fragment>
                                <div id="">                                  
                                    <ProductList {...props}  Login={true}/>
                                </div>
                            </React.Fragment>
                        )
                    }}
                    />
                    <Route exact path={"/Login"} render={props => {
                        return (
                            <React.Fragment>
                                <div id="">
                                    <Login {...props} />
                                </div>
                            </React.Fragment>
                        )
                    }}
                    />
                    <Route exact path={"/admin/home"} render={props => {
                        return (
                            <React.Fragment>
                                <div id="wrapper">
                                    <Header {...props} />
                                    <Main  {...props} />
                                </div>
                            </React.Fragment>
                        )
                    }} />
                    <Route exact path={"/admin/user"} render={props => {
                        return (
                            <React.Fragment>
                                <div id="wrapper">
                                    <Header {...props} />
                                    <User  {...props} />
                                    <AddUser {...props} />
                                </div>
                            </React.Fragment>
                        )
                    }} />

                    <Route exact path={"/admin/viewuser"} render={props => {
                        return (
                            <React.Fragment>
                                <div id="wrapper">
                                    <Header {...props} />
                                    <User  {...props} />
                                    <ViewUser {...props} />
                                </div>
                            </React.Fragment>
                        )
                    }} />
                    <Route exact path={"/admin/Product"} render={props => {
                        return (
                            <React.Fragment>
                                <div id="wrapper">
                                    <Header {...props} />
                                    <User  {...props} />
                                    <Product {...props} />
                                </div>
                            </React.Fragment>
                        )
                    }} />
                    <Route exact path={"/admin/ViewProduct"} render={props => {
                        return (
                            <React.Fragment>
                                <div id="wrapper">
                                    <Header {...props} />
                                    <User  {...props} />
                                    <ViewProduct {...props} />
                                </div>
                            </React.Fragment>
                        )
                    }} />
                    <Route exact path={"/vendor/Home"} render={props => {
                        return (
                            <React.Fragment>
                                {/* <div id=""> */}
                                <ProductHome {...props} />
                                {/* </div> */}
                            </React.Fragment>
                        )
                    }} />

                </Switch>
            </Router>
        )
    }
}
