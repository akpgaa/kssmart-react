import React, { Component } from 'react'
import Essentials from '../../Components/Validation';

export default class User extends Essentials {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    componentDidMount = async () => {
        let user = await this.CheckLogin()
        this.setState({ user })
    }
    render() {
        let { user } = this.state;
        return (
            <section id="content-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card borderincr" style={{ background: "#e6e6e6" }}>
                            <div class="card-body row">
                                <div class="col-md-1"></div>
                                <div class="col-md-1">
                                    <img class='borderincr shadow1' src='https://www.w3schools.com/css/pineapple.jpg' alt='' style={{ borderRadius: 50, width: 50, height: 50 }} />
                                </div>
                                <div class="col-md-3 column">
                                    <div class='col-lg-6'>
                                        Welcome!
                                    </div>
                                    <div class='col-lg-6'>
                                        {user && user.username}
                                    </div>
                                </div>
                                <div class="col-md-3"></div>
                                <div class="col-md-3 justify-content-end" style={{ float: 'right' }}>
                                    <div className="d-flex justify-content-end">
                                        <div className="form-control  pointerdiv" style={{ backgroundColor: 'red', borderRadius: 25, textAlign: 'center', }} onClick={this.Logout}>
                                            <span style={{ color: 'white', textAlign: 'center', }}>Logout</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section >
        )
    }
}
