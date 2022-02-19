import React, { Component } from 'react'
import Bridge from '../Components/Bridge';
import Loader from '../Components/Loader';
import Essentials from '../Components/Validation'
import { Userdata } from '../Config/Storagedata';

export default class Login extends Essentials {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    Login = async () => {
        try {
            let { email, Password, } = this.state;
            if (this.validateText(email, 'emailError', 'Please enter ')) return true;
            if (this.validateText(Password, 'PasswordError', 'Please enter ')) return true;
            this.setState({ Show: true })
            let result = await Bridge.loginCheck(email, Password)
            if (result.length > 0) {
                let Encrypted = this.Encrypt(JSON.stringify(result[0]))
                await localStorage.setItem(Userdata, Encrypted)

                if (result[0].role == 'Admin Role') {
                    this.HrefNavigation('/admin/user')
                } else if (result[0].role == 'Vendor Role') {
                    this.HrefNavigation('/vendor/home')
                } else {

                    this.setState({ PasswordError: 'error' })
                }
                this.setState({ Show: false })
            } else {
                this.setState({ Show: false })
                this.setState({ PasswordError: 'Username and Password does not match' })
            }
        } catch (error) {
            this.setState({ Show: false })
            console.log(error);
        }
    }
    render() {
        let { name, email, Password } = this.state;
        return (
            <div class="global-container ">
                <Loader load={false} isOpen={this.state.Show} />
                <div class="card login-form shadow1" style={{ margin: 50 }}>
                    <div class="card-body">
                        <h3 class="card-title text-center">Admin/Vendor Login</h3>
                        <div class="card-text">
                            {/* <!--
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">Incorrect username or password.</div> --> */}
                            <form>
                                {/* <!-- to error: add class "has-danger" --> */}
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    {/* <input type="email" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" /> */}
                                    <input class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' defaultValue={email} onChange={this.onChangetext} type='email' />
                                    {this.ValidationView(this.state.emailError)}
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    {/* <a href="#" style={{ float: 'right', fontSize: 12 }}>Forgot password?</a> */}
                                    <input type="password" class="form-control form-control-sm" id="exampleInputPassword1" name='Password' defaultValue={Password} onChange={this.onChangetext} />
                                    {this.ValidationView(this.state.PasswordError)}
                                </div>
                                <button type="button" onClick={this.Login} class="btn btn-primary btn-block">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
