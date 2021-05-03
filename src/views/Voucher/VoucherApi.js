import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Cookies from "universal-cookie/lib";
import {BiReset} from "react-icons/all";
import {Button} from "reactstrap";
import {confirmAlert} from "react-confirm-alert";


class VoucherApi extends Component {

    onVoucherConfirm = props => {
        confirmAlert({
            title: 'Confirm to reset',
            message: 'Are you sure to reset this voucher',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onVoucherReset(props)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    onVoucherReset = (props) => {
        let reset = {
            reset: props
        }

        let cookie = new Cookies
        RadiusApi.post('/vouchers/voucher-reset.json', reset, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        alert('Voucher reset successful')
                    } else {
                        alert(response.data.message)
                    }
                }
            )
        this.forceUpdate();
    }


    render() {
        return (
            <>
                <thead>
                <tr className='ct-grid-background border-primary'>

                    <th scope="col">Name</th>
                    <th scope="col">Password</th>
                    <th scope="col">Group</th>
                    <th scope="col">Profile</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {(this.props.data) ? this.props.data.map((item) => {
                    return (
                        <tr key={item.id}>

                            {/*{this.props.mobile?<td>*/}
                            {/*    <AiOutlinePlusCircle/>*/}
                            {/*</td>:null}*/}

                            <td>{item.name}</td>
                            <td>{item.password}</td>

                            <td>{item.realm}</td>
                            <td>{item.profile}</td>
                            {/*<td>{item.active ? <span>Active</span> : <span>Inactive</span>}</td>*/}
                            <td data-label="Action">
                                <Button className='btn-sm btn-danger' onClick={() => this.onVoucherConfirm(item.id)}>
                                    <BiReset aria-placeholder='reset'/>
                                </Button>
                            </td>
                        </tr>
                    )
                }) : null
                }
                </tbody>
            </>
        );
    }
}

export default VoucherApi;
