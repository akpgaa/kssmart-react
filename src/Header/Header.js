import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Essentials from '../Components/Validation'

export default class Header extends Essentials {

    async componentDidMount() {
        let result = await this.CheckLogin()
        if (result == false) {
            window.location.href = '/'
        } else if (result && result.role == 'Vendor Role') {
            this.handleNavigation('/vendor/home')
        }
    }

    check = (val) => {
        let first = this.props.location.pathname
        // console.log(first);
        return first === `/${val}` ? 'active' : '';
    }
    render() {

        return (
            <React.Fragment>
                <aside id="sidebar-wrapper">
                    <div class="sidebar-brand" onClick={() => this.handleNavigation(`/admin/user`)}>
                        <h2>Logo</h2>
                    </div>
                    <ul class="sidebar-nav">
                        <li class={this.check('admin/user')}>
                            <Link className="nav-link active" to={`/admin/user`}>
                                <i class="fa fa-user-plus"></i>Add User
                            </Link>
                        </li>
                        <li class={this.check('admin/viewuser')}>
                            <Link className="nav-link" to={`/admin/viewuser`}>
                                <i class="fa fa-user"></i>View User
                            </Link>   </li>
                        <li class={this.check('admin/Product')}>
                            <Link className="nav-link" to={`/admin/Product`}>
                                <i class="fa fa-shopping-bag"></i>Accept Product
                            </Link> </li>
                        <li class={this.check('admin/ViewProduct')}>
                            <Link className="nav-link" to={`/admin/ViewProduct`}>
                                <i class="fa fa-cart-plus"></i>View Product
                            </Link> </li>
                    </ul>
                </aside>
                <div id="navbar-wrapper">
                    <nav class="navbar navbar-inverse">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <a href="#" class="navbar-brand" id="sidebar-toggle"><i class="fa fa-bars"></i></a>
                            </div>
                        </div>
                    </nav>
                </div>
            </React.Fragment>

        )
    }
}
