import React, { Component } from 'react'
import Swal from 'sweetalert2';
import Bridge from '../../Components/Bridge';
import Loader from '../../Components/Loader';
import Modal from '../../Components/Modal';
import Table from '../../Components/Table'
import Essentials from '../../Components/Validation';

export default class Main extends Essentials {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            Show: true
        }
    }

    componentDidMount = async () => {
        this.Mainfun()
    }
    Mainfun = async () => {
        try {
            let result = await Bridge.GetData('user')
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
    header = [
        { key: 'username', label: 'Name' },
        { key: 'password', label: 'Password' },
        { key: 'email', label: 'E-Mail' },
        { key: 'district', label: 'District' },
        { key: 'role', label: 'Role' },
        { key: 'role', label: 'Action', Cell: d => this.Action(d) },
        { key: 'role', label: 'Delete', Cell: d => this.Delete(d) },
    ]

    Action = (d) => {
        return <div className='pointerdiv' onClick={() => this.handleAction(d)}> <i class="fa fa-pencil-square-o"></i></div>
    }
    handleAction = (d) => {
        let id = this.Encrypt(JSON.stringify(d))
        this.handleNavigation(`/admin/user?id=${id}`)
    }
    Delete = (d) => {
        return <div className='pointerdiv' onClick={() => this.handleDelete(d)}> <i class="fa fa-trash"></i></div>
    }
    handleDelete = async (d) => {
        Swal.fire({
            title: 'Do you want to delete the user?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            // denyButtonText: `Don't save`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let body = {}
                body.table = 'user'
                body.id = d.id
                let result = await Bridge.Delete(body)
                if (result) {
                    this.Mainfun()
                    Swal.fire('Deleted!', '', 'success')
                }
            } else if (result.isDenied) {
                Swal.fire('Not Deleted', '', 'info')
            }
        })
    }
    render() {

        return (
            <React.Fragment>
                <Loader load={false} isOpen={this.state.Show} />
                <Modal id='action' title='Action'>

                </Modal>
                <section id="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12">
                            <Table header={this.header} data={this.state.data} />
                        </div>
                    </div>
                </section>
            </React.Fragment>

        )
    }
}
