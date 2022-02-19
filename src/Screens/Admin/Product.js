import React, { Component } from 'react'
import Bridge from '../../Components/Bridge';
import Loader from '../../Components/Loader';
import Table from '../../Components/Table'
import Essentials from '../../Components/Validation';
import { ACCESS_POINT } from '../../Config';
export default class Product extends Essentials {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            Show: true
        }
    }
    header = [
        { key: 'role', label: 'Product', Cell: d => this.Image(d) },
        { key: 'name', label: 'Name' },
        { key: 'info', label: 'Description' },
        { key: 'price', label: 'Price' },
        { key: 'email', label: 'Response', Cell: d => this.Action(d) },

    ]

    componentDidMount = async () => {
        this.Mainfun()
    }
    Mainfun = async () => {
        try {
            let result = await Bridge.GetData('allproduct')
            if (result) {
                this.setState({
                    data: result.data,
                    Show: false
                });

            }
        } catch (error) {
            this.setState({ Show: false })
            console.log(error)
        }
    }

    Image = (d) => {
        return (<div class="">
            <img class='borderincr shadow1' src={`${ACCESS_POINT}/${JSON.parse(d.image)[0]}`} alt='' style={{ width: 50, height: 50 }} />
        </div>)
    }

    Action = (d) => {
        if (d.status == 0) {
            return (
                <div class="row">
                    <div class="col-lg-6 " >
                        <div className="d-flex justify-content-end">
                            <div className="form-control  pointerdiv" style={{ backgroundColor: 'green', borderRadius: 25, textAlign: 'center', }} onClick={() => this.Accept(d, 1)}>
                                <span style={{ color: 'white', textAlign: 'center', }}>Accept</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 " >
                        <div className="d-flex justify-content-end">
                            <div className="form-control  pointerdiv" style={{ backgroundColor: 'red', borderRadius: 25, textAlign: 'center', }} onClick={() => this.Accept(d, 2)}>
                                <span style={{ color: 'white', textAlign: 'center', }}>Reject</span>
                            </div>
                        </div>
                    </div> </div>
            )
        } else {
            let name = ''
            let color = ''
            if (d.status == 1) {
                name = 'Accepted'
                color = 'green'
            } else {
                name = 'Rejected'
                color = 'red'
            }
            return (
                <div class="row">
                    <div class="col-lg-3 " ></div>
                    <div class="col-lg-6 " >
                        <div className="d-flex justify-content-end">
                            <div className="form-control  " style={{ backgroundColor: color, borderRadius: 25, textAlign: 'center', }} >
                                <span style={{ color: 'white', textAlign: 'center', }}>{name}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 " ></div>
                </div>
            )


        }
    }
    Accept = async (d, id) => {
        let body = {}
        body.status = id
        this.setState({ Show: true })

        let result = await Bridge.DataUpdate1("product", body, d.id)
        this.Mainfun()
        this.setState({ Show: false })
    }
    render() {

        return (

            <section id="content-wrapper">
                <Loader load={false} isOpen={this.state.Show} />
                <div class="row">
                    <div class="col-lg-12">
                        <Table header={this.header} data={this.state.data} />
                    </div>
                </div>
            </section>

        )
    }
}
