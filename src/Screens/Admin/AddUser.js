import React, { Component } from 'react'
import Swal from 'sweetalert2';
import Bridge from '../../Components/Bridge';
import Loader from '../../Components/Loader';
import Essentials from '../../Components/Validation';

export default class AddUser extends Essentials {
    constructor(props) {
        super(props);
        this.state = {
            storeOption: [{ value: 1, label: 'Cuddalore' }, { value: 2, label: 'Chennai' }],
            RoleOption: [{ value: 1, label: 'Admin Role' }, { value: 2, label: 'Vendor Role' }],
            button: 'Submit'
        }
    }

    componentDidMount = async () => {
        let id = this.Decrypt(new URLSearchParams(this.props.location.search).get("id"));
        if (id) {
            let data = JSON.parse(id)
            this.setState({
                name: data.username,
                email: data.email,
                Password: data.password,
                Role: data.role,
                editid: data.id,
                District: data.district,
                button: 'Update'
            })
        }

    }

    Save = async () => {
        try {
            const { name, email, Password, Role, District, editid } = this.state;
            console.log(name, email, Password, Role, District);
            if (this.validateText(name, 'nameError', 'Please enter ')) return true;
            if (this.validateText(email, 'emailError', 'Please enter ')) return true;
            if (this.validateText(Password, 'PasswordError', 'Please enter')) return true;
            if (this.validateText(Role, 'RoleError', 'Please select')) return true;
            if (this.validateText(District, 'DistrictError', 'Please select')) return true;

            let body = {}
            body.username = name;
            body.email = email;
            body.password = Password;
            body.role = Role;
            body.district = District
            this.setState({ Show: true })

            let result = await Bridge.DataUpdate1("user", body, editid ? editid : 'id')
            if (result.status == 200) {
                this.setState({
                    name: '', email: '', Password: '', Role: '', District: '', button: 'Submit'
                })
                console.log('success');
                Swal.fire(
                    'Success!',
                    '',
                    'success'
                )
                // .then((result) => {

                this.handleNavigation('/admin/user')
            }
            this.setState({ Show: false })
        } catch (error) {
            this.setState({ Show: false })
            console.log(error)
        }
    };
    ViewAll = () => {

    }
    render() {
        let { name, email, Password, Role, District } = this.state;

        return (
            <section id="content-wrapper">
                  <Loader load={false} isOpen={this.state.Show} />
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card shadow1">
                            <div class="card-body  borderincr">
                                <div class="col-lg-12 row mar10">
                                    <div class="col-md-2 ">
                                        <label for="exampleInputEmail1" style={{ fontWeight: 'bold', fontSize: 18, color: '#1b2433' }}>Add User</label>
                                    </div>
                                    <div class="col-md-6 ">
                                    </div>
                                    <div class="col-md-2 ">
                                        <div className="d-flex justify-content-end">
                                            <div className="form-control  pointerdiv" style={{ backgroundColor: '#1b2433', borderRadius: 15, textAlign: 'center', }} onClick={() => this.handleNavigation('/admin/viewuser')}>
                                                <span style={{ color: 'white', textAlign: 'center', }}>View All</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 mar10 ">
                                    <div class="mar10 row form-group" >
                                        <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>Name:</label></div>
                                        <div class="col-sm-8"><input className=" form-control" name='name' value={name} onChange={this.onChangetext} type='text' placeholder='Enter name' />
                                            {this.ValidationView(this.state.nameError)}
                                        </div>
                                    </div>
                                    <div class="mar10 row form-group" >
                                        <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>E-Mail:</label></div>
                                        <div class="col-sm-8"><input className=" form-control" name='email' value={email} onChange={this.onChangetext} type='email' placeholder='Enter Mail' />
                                            {this.ValidationView(this.state.emailError)}
                                        </div>
                                    </div>
                                    <div class="mar10 row form-group" >
                                        <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>Password:</label></div>
                                        <div class="col-sm-8"><input className=" form-control" name='Password' value={Password} onChange={this.onChangetext} type='password' placeholder='Enter Password' />
                                            {this.ValidationView(this.state.PasswordError)}
                                        </div>
                                    </div>
                                    <div class="mar10 row form-group">
                                        <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>Role:</label></div>
                                        <div class="col-sm-8">
                                            <select className="form-control" style={{ height: 'calc(2.25rem + 10px)', marginBottom: 10 }} value={this.state.Role} name='Role' onChange={this.onChangetext}>
                                                <option>Select...</option>
                                                {
                                                    this.state.RoleOption.map((item, i) => {
                                                        return <option value={item.label}>{item.label}</option>;
                                                    })
                                                }

                                            </select>


                                            {this.ValidationView(this.state.RoleError)}
                                        </div>
                                    </div>
                                    <div class="mar10 row form-group">
                                        <div class="col-sm-2 labeled" ><label for="exampleInputEmail1" className='labeled'>District:</label></div>
                                        <div class="col-sm-8">
                                            <select className="form-control" style={{ height: 'calc(2.25rem + 10px)', marginBottom: 10 }} value={this.state.District} name='District' onChange={this.onChangetext}>
                                                <option>Select...</option>
                                                {
                                                    this.state.storeOption.map((item, i) => {
                                                        return <option value={item.label}>{item.label}</option>;
                                                    })
                                                }
                                            </select>
                                            {this.ValidationView(this.state.DistrictError)}
                                        </div>
                                    </div>
                                    <div class="mar10  row form-group">
                                        <div class="col-sm-2" />
                                        <div className="d-flex  col-sm-2 justify-content-end">
                                            <div className="form-control  pointerdiv" style={{ backgroundColor: '#1b2433', borderRadius: 5, textAlign: 'center', }} onClick={this.Save}>
                                                <span style={{ color: 'white', textAlign: 'center', }}>{this.state.button}</span>
                                            </div>
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
