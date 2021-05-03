import React, {Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Link} from "react-router-dom";
import {AiFillEdit, AiOutlineEye} from "react-icons/all";
import DeleteUser from "./Action/DeleteUser";
import {Button} from "reactstrap";


class VoucherApi extends Component {

    render() {
        return (

            <>
                <thead>
                <tr className='ct-grid-background border-primary'>
                    <th scope="col">Name</th>

                    <th scope="col">Role</th>

                    <th scope="col">Status</th>
                    {/*<Dropdown text='Status' multiple icon='filter'>*/}
                    {/*    <Dropdown.Menu>*/}
                    {/*        <Dropdown.Menu scrolling>*/}
                    {/*            <Dropdown.Item>Active</Dropdown.Item>*/}
                    {/*            <Dropdown.Item>Inactive</Dropdown.Item>*/}
                    {/*        </Dropdown.Menu>*/}
                    {/*    </Dropdown.Menu>*/}
                    {/*</Dropdown>*/}
                    <th scope="col">Actions</th>

                </tr>
                </thead>
                <tbody>
                {this.props.data.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td className='text-capitalize' data-label="Name">{item.username}</td>
                            <td data-label="Role">
                                {
                                    item.role === 'agent' ? <span className='text-primary'>Agent</span> :
                                        <span className='text-warning'>Seller</span>
                                }
                            </td>
                            {/*<td className='d-none d-sm-block' data-label="Area">{item.username}</td>*/}


                            {/*<td data-label="Status">*/}
                            {/*    {item.active ? <span className='text-success'>Active</span>*/}
                            {/*        : <span className='text-danger'>Inactive</span>}</td>*/}

                            <td>
                                {item.active ? <span className='text-success'>Active</span> :
                                    <span className='text-danger'>Inactive</span>}
                                {/*<div className="ui toggle checkbox center aligned">*/}
                                {/*    <input type="checkbox" name="public"*/}
                                {/*        // value={item.active}*/}
                                {/*           onChange={event => this.onHandleChange(event)}*/}
                                {/*           checked={item.active}*/}
                                {/*    />*/}
                                {/*    <label/>*/}
                                {/*</div>*/}
                            </td>


                            <td data-label="Action">
                                <Link to={'/admin/users/view/' + item.id}>
                                    <Button className='btn-sm btn-success'>
                                        <AiOutlineEye/>
                                    </Button>
                                </Link>

                                <Link to={'/admin/users/edit/' + item.id}>
                                    <Button className='btn-sm btn-primary'>
                                        <AiFillEdit/>
                                    </Button>
                                </Link>

                                <DeleteUser delId={item.id}/>
                            </td>

                        </tr>

                    )
                })}
                </tbody>
            </>
        );
    }

}

export default VoucherApi;
