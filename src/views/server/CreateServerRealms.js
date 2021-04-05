import React, {Component} from 'react';
import {Link} from "react-router-dom";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import GetServer from "../Transaction/GetServer";
import RadiusApi from "../../radius-api/RadiusApi";
import {Modal} from "react-bootstrap";
import {Button} from "semantic-ui-react";

class CreateServerRealms extends Component {
    state = {
        open: false,
        server: '',
        realm: ''
    }

    handleClose = () => this.setState({open: false})
    handleShow = () => this.setState({open: true})


    onGenerateServer = () => {
        let data = this.state
        RadiusApi.post('/server-realms/add.json', data)
            .then(response => {
                console.log(response)
            })
    }

    onSelectServer = async data => {
        this.setState({
            server: data
        })
    }

    onSelectGroup = async data => {
        this.setState({
            realm: data
        })
    }


    render() {
        return (
            <>
                <div className='ml-3'>
                    <Link to='/admin/root/server-realms'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <VoucherGroup onChange={this.onSelectGroup}/>
                    <GetServer onChange={this.onSelectServer}/>

                    {/*<button className='ui button positive mt-4' onClick={this.onGenerateServer}>*/}
                    {/*    Generate*/}
                    {/*</button>*/}


                    {/*<Modal size='lg' show={this.state.open} onHide={this.handleClose}>*/}
                    {/*    <Modal.Header closeButton>*/}
                    {/*        <Modal.Title>Modal heading</Modal.Title>*/}
                    {/*    </Modal.Header>*/}
                    {/*    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>*/}
                    {/*    <Modal.Footer>*/}
                    {/*        <Button variant="secondary" onClick={this.handleClose}>*/}
                    {/*            Close*/}
                    {/*        </Button>*/}
                    {/*        <Button variant="primary" onClick={this.handleClose}>*/}
                    {/*            Save Changes*/}
                    {/*        </Button>*/}
                    {/*    </Modal.Footer>*/}
                    {/*</Modal>*/}


                    <div>
                        {/* Button trigger modal */}
                        <button type="button" className="ui button positive" data-toggle="modal" data-target="#exampleModal">
                            Generate
                        </button>
                        {/* Modal */}
                        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        {/*<button type="ui button positive" className="close" data-dismiss="modal" aria-label="Close">*/}
                                        {/*    <span aria-hidden="true">×</span>*/}
                                        {/*</button>*/}
                                    </div>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="ui button" data-dismiss="modal">Close</button>
                                        <button type="button" className="ui button positive">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </article>

            </>
        );
    }
}

export default CreateServerRealms;
