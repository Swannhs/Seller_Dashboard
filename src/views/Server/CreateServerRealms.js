import React, {Component} from 'react';
import {Link} from "react-router-dom";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import GetServer from "../../components/Dropdown/GetServer";
import RadiusApi from "../../radius-api/RadiusApi";

class CreateServerRealms extends Component {
    state = {
        open: false,
        server: '',
        realm: '',
    }

    handleClose = () => this.setState({open: false})
    handleShow = () => this.setState({open: true})


    onGenerateServer = event => {
        event.preventDefault();
        let data = this.state;
        delete data.open;

        RadiusApi.post('/Server-realms/add.json', data,{
            params:{
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message)
                    this.props.history.push('/admin/root/server-realms')
                } else {
                    alert(response.data.message)
                    this.setState({
                        error: {
                            balance: response.data.message
                        }
                    })
                }
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
                    <form onSubmit={this.onGenerateServer}>
                        <VoucherGroup onChange={this.onSelectGroup}/>
                        <GetServer onChange={this.onSelectServer}/>
                        <button type='submit' className='ui button positive mt-4'>
                            Generate
                        </button>
                    </form>


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

                    {/*<MyModal/>*/}

                </article>

            </>
        );
    }
}

export default CreateServerRealms;
