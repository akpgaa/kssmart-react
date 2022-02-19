import React, { Component } from 'react'
import Swal from 'sweetalert2';
import Bridge from '../../Components/Bridge';
import Essentials from '../../Components/Validation';
import { ACCESS_POINT } from '../../Config';

export default class ProductHome extends Essentials {
    constructor(props) {
        super(props);
        this.state = {
            Products: [
            ],
            user: null,
        }
    }
    componentDidMount = () => {
        this.Mainfun()
    }
    Mainfun = async () => {
        try {
            let user = await this.CheckLogin()
            if (user == false) {
                window.location.href = '/'
                return false
            } else if (user && user.role == 'Admin Role') {
                this.handleNavigation('/admin/user')
            }
            let body = { id: user.id }
            let result = await Bridge.GetData('product', body)
            if (result) {
                this.setState({
                    Products: result.data,
                    loading: false,
                    user
                });

            }
        } catch (error) {
            this.setState({ loading: false })
            console.log(error)
        }
    }
    Save = async () => {
        try {
            const { name, email, Price, Products, Description, Image, user } = this.state;
            if (this.validateText(name, 'nameError', 'Please enter ')) return true;
            if (this.validateText(Description, 'DescriptionError', 'Please enter ')) return true;
            if (this.validateText(Price, 'PriceError', 'please enter')) return true;
            if (this.validateText(Image, 'fileErr', 'please select image')) return true;

            const form = new FormData();
            form.append("name", name)
            form.append("info", Description)
            form.append("price", Price)
            form.append(`file`, Image);
            form.append("user", user.id)
            // form.append("adminId", userdetails.id)
            // form.append('alias', Suppliercode.toUpperCase())
            // form.append("image", JSON.stringify(filearray))
            // file.map((ival, i) => {
            //     // console.log(ival);
            //     form.append(`file`, ival);
            // });
            this.setState({ Show: true })
            let result = await Bridge.DataUpdate("product", form, 'id')
            if (result.status == 200) {
                this.setState({
                    name: '', Description: '', Price: '', file: null, button: 'Submit'
                })
                console.log('success');
                Swal.fire(
                    'Success!',
                    '',
                    'success'
                )
                // .then((result) => {

                window.location.reload();
            }
            this.setState({ Show: false })
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        let { name, email, Price, Products, Description, user } = this.state;
        // console.log(Products);
        return (

            <div class='row ' style={{ background: '#dbdbdb', margin: 0, }}>


                <div class="col-lg-12 row" style={{ padding: 50 }}>
                    <div class="col-sm-2">
                        <img class='borderincr shadow1' src='https://www.w3schools.com/css/pineapple.jpg' alt='' style={{ borderRadius: 50, width: 75, height: 75, objectFit: 'contain' }} />
                    </div>
                    <div class="col-sm-7 row">
                        <div class='col-lg-6'>
                            Name: &nbsp; {user ? user.username : null}
                        </div>
                        <div class='col-lg-6'>
                            E-Mail:  &nbsp; {user ? user.email : null}
                        </div>
                        <div class='col-lg-6'>
                            District: &nbsp; {user ? user.district : null}
                        </div>
                    </div>

                    <div class="col-sm-2 justify-content-end" style={{ float: 'right' }}>
                        <div className="d-flex justify-content-end">
                            <div className="form-control  pointerdiv" style={{ backgroundColor: 'red', borderRadius: 25, textAlign: 'center', }} onClick={this.Logout}>
                                <span style={{ color: 'white', textAlign: 'center', }}>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 shadow2 pad20" style={{ background: 'white' }}>
                    <div class="row pad20">
                        <div class="col-lg-12 pad20">
                            {/* <div class="col-lg-4 justify-content-end" style={{ float: 'right' }}>
                                <div className="d-flex justify-content-end">
                                    <div className="form-control  pointerdiv" style={{ backgroundColor: '#1b2433', borderRadius: 10, textAlign: 'center', }} onClick={this.Logout}>
                                        <span style={{ color: 'white', textAlign: 'center', }}>Add Product</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div class="col-lg-12  mar10">
                            <div class="col-lg-2 ">
                                <label for="exampleInputEmail1" style={{ fontWeight: 'bold', fontSize: 18, color: '#1b2433' }}>Add Products</label>
                            </div>
                        </div>
                        <div class="col-lg-2 " />
                        <div class="col-lg-10 ">

                            <div class="col-lg-10 pad20">
                                <div class="mar10 row form-group" >
                                    <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>Title:</label></div>
                                    <div class="col-sm-8"><input className=" form-control" name='name' defaultValue={name} onChange={this.onChangetext} type='text' placeholder='Enter Title' />
                                        {this.ValidationView(this.state.nameError)}
                                    </div>
                                </div>
                                <div class="mar10 row form-group" >
                                    <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>Description:</label></div>
                                    <div class="col-sm-8"><textarea className=" form-control" name='Description' defaultValue={Description} onChange={this.onChangetext} type='email' placeholder='Enter Description' />
                                        {this.ValidationView(this.state.DescriptionError)}
                                    </div>
                                </div>
                                <div class="mar10 row form-group" >
                                    <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>Price:</label></div>
                                    <div class="col-sm-8"><input className=" form-control" name='Price' defaultValue={Price} onChange={this.onChangetext} type='number' placeholder='Enter Price' />
                                        {this.ValidationView(this.state.PriceError)}
                                    </div>
                                </div>
                                <div class="mar10 row form-group" >
                                    <div class="col-sm-2 labeled"><label for="exampleInputEmail1" className='labeled'>Image:</label></div>
                                    <div class="col-sm-8"><input accept={["image/*"]} className=" form-control" name='Image' onChange={this.selectSingleImage} type='file' max={1} placeholder='Select' />
                                        <span class="labeled" style={{ fontSize: 10 }}>*Maximum Upload Size 2MB</span>
                                        {this.ValidationView(this.state.fileErr)}
                                    </div>
                                </div>

                                <div class="mar10 row form-group" >
                                    <div class="col-sm-2 labeled"></div>
                                    <div class="col-sm-4">
                                        <div className="form-control  pointerdiv" style={{ backgroundColor: '#1b2433', borderRadius: 10, textAlign: 'center', }} onClick={this.Save}>
                                            <span style={{ color: 'white', textAlign: 'center', }}>Submit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2" />
                        </div>

                    </div>
                </div>
                {/* <div class="col-lg-1" style={{ margin: 0, padding: 0 }}></div> */}
                <div class="col-lg-4" style={{ marginLeft: 0 }}>
                    <SideProduct Products={Products} isNeed={true} />
                </div>

            </div>


        )
    }
}


export function SideProduct(props) {
    return (
        <div class="col-lg-12" >
            {props.Products && props.Products.map((ival, i) => (

                <div class="col-sm-12  mar10 borderincr" style={{ marginRight: 0, marginLeft: 0, padding: 10, background: 'white' }}>
                    <div class='col-sm-12 row'>
                        <div class={`col-sm-1`} />
                        <div class={`col-sm-3`}>
                            <img class='borderincr shadow1' src={`${ACCESS_POINT}/${JSON.parse(ival.image)[0]}`} alt='' style={{ width: 75, height: 75, objectFit: 'contain' }} />

                        </div>
                        <div class={`col-sm-6`} style={{ maxHeight: 100, overflow: 'hidden', fontSize: 14 }}>
                            <div class="col-lg-12">
                                <label style={{ color: "#f75145", fontWeight: 'bold' }}>Name</label>
                                <br />
                                {ival.name}
                            </div>
                            <div class="col-lg-12">
                                <label style={{ color: "#f75145", fontWeight: 'bold' }}>Description</label>
                                <br />
                                {ival.info}
                            </div>

                        </div>
                    </div>
                    {props.isNeed ?
                        <div class='col-sm-12 pad20'>
                            <div class="col-lg-12">
                                <div class="circlesbox">
                                    <div class="circle" style={{ background: '#1b2433' }}></div>
                                    <div class="circle" style={{ background: ival.status == 1 ? '#1b2433' : '' }}></div>
                                    <div class="circle"></div>
                                    <div class="circle"></div>

                                </div>
                                <div class="circlesbox1">
                                    <span className=' circle1'>Submitted</span>
                                    <span className=' circle1'>Forwared to Workplace</span>
                                    <span className=' circle1'>Payment in process</span>
                                    <span className=' circle1'>Done</span>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    <hr />
                </div>
            ))}
        </div>
    )
}