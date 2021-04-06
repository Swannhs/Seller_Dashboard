import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {Button} from "semantic-ui-react";

class MyModal extends Component {
    state = {
        show: false
    }

    onClickShow = () => {
        this.setState({
            show: true
        })
    }

    onClickHide = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <>
                <Button onClick={this.onClickShow}>
                    Launch
                </Button>

                {
                    this.state.show ?
                        <Modal show={this.state}>
                            <Modal.Header>
                                <Modal.Title>Heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                You are going to create
                            </Modal.Body>
                            <Modal.Footer>
                                <Button>Save</Button>
                                <Button onClick={this.onClickHide}>Close</Button>
                            </Modal.Footer>
                        </Modal> : null
                }

            </>
        );
    }
}

export default MyModal;
