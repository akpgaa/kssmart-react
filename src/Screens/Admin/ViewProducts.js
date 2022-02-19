import React, { Component } from 'react'
import Bridge from '../../Components/Bridge';
import { ProductList } from '../../Components/ProductListing';
import Essentials from '../../Components/Validation';
import { SideProduct } from '../Vendor/Home';

export default class ViewProducts extends Essentials {

    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            Products1: [],
            DistictOption: [{ value: 1, label: 'Cuddalore' }, { value: 2, label: 'Chennai' }],
        }
    }

    componentDidMount = () => {
        this.Mainfun()
    }
    Mainfun = async () => {
        try {
            let result = await Bridge.GetData('userproduct')
            if (result) {
                this.setState({
                    Products: result.data,
                    Products1: result.data,
                    loading: false
                });

            }
        } catch (error) {
            this.setState({ loading: false })
            console.log(error)
        }
    }
    onChange = async (e) => {
        let { Products1 } = this.state;
        if (e.target.value) {
            let Products = Products1.filter(a => a.district == e.target.value)
            this.setState({ Products })
        }

    }
    reset = () => {
        this.setState({ Products: this.state.Products1 })
    }
    render() {
        let { Products, DistictOption } = this.state;
        return (
            <section id="content-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12 row  mar10">
                            <div class="col-sm-4 ">
                                <label for="exampleInputEmail1" style={{ fontWeight: 'bold', fontSize: 18, color: '#1b2433' }}>Products</label>
                            </div>
                            <div class="col-sm-6 row form-group">
                                <div class="col-sm-2 labeled" ><label for="exampleInputEmail1" className='labeled'>Filter:</label></div>
                                <div class="col-sm-4">
                                    <select className="form-control" style={{ height: 'calc(2.25rem + 10px)', marginBottom: 10 }} value={this.state.storetype} name='storetype' onChange={this.onChange}>
                                        <option>Select...</option>
                                        {
                                            this.state.DistictOption.map((item, i) => {
                                                return i == this.state.storetype ? <option value="" disabled selected>{item.label}</option> :
                                                    <option value={item.label}>{item.label}</option>;
                                            })
                                        }
                                    </select>
                                    {this.ValidationView(this.state.DistrictError)}
                                </div>
                                <div class="col-sm-4 justify-content-end pointerdiv" onClick={this.reset}>
                                    <div className="d-flex justify-content-end">
                                        <div className="form-control  pointerdiv" style={{ backgroundColor: 'red', borderRadius: 25, textAlign: 'center', }} >
                                            <span style={{ color: 'white', textAlign: 'center', }}>Reset</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {this.props.Login &&
                                <div class="col-sm-2 justify-content-end pointerdiv" onClick={() => this.handleNavigation('/Login')}>
                                    <div className="d-flex justify-content-end">
                                        <div className="form-control  pointerdiv" style={{ backgroundColor: '#1b2433', borderRadius: 25, textAlign: 'center', }} >
                                            <span style={{ color: 'white', textAlign: 'center', }}>Login</span>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                        <ProductList Products={Products} Login={this.props.Login} />
                        {/* <div class="col-lg-12  mar10">
                            {Products && Products.map((ival, i) => (
                                <div class="col-lg-12 row mar10 " style={{ padding: 10 }}>

                                    <div class="col-lg-2">
                                        <img class='borderincr shadow1' src='https://www.w3schools.com/css/pineapple.jpg' alt='' style={{ width: 100, height: 100, objectFit: 'contain' }} />
                                    </div>
                                    <div class="col-lg-10 ">
                                        <div class="col-lg-6">
                                            <label style={{ color: "#f75145" }}>Name</label>
                                            <br />
                                            {ival.name}
                                        </div>
                                        <div class="col-lg-6">
                                            <label style={{ color: "#f75145" }}>Description</label>
                                            <br />
                                            {ival.info}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </section>
        )
    }
}
