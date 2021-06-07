import React, {Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Link} from "react-router-dom";
import {AiFillEdit, AiOutlineEye} from "react-icons/all";
import DeleteUser from "./Action/DeleteUser";
import {Button} from "reactstrap";
import Cookies from "universal-cookie/lib";


class UserApi extends Component {
    state = {
        root: false
    }

    componentDidMount() {
        let cookie = new Cookies;
        let role = cookie.get('Role')
        if (role === 'admin') {
            this.setState({
                root: true
            })
        }
    }

    render() {
        return (

            <>
                <thead>
                <tr className='ct-grid-background border-primary'>
                    <th scope="col">Name</th>

                    {/*<th scope="col">Role</th>*/}

                    <th scope="col">Status</th>

                    {
                        this.state.root ?
                            <th scope="col">Token</th> : null
                    }

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
                            <td className='text' data-label="Name">{item.username}</td>
                            {/*<td data-label="Role">*/}
                            {/*    {*/}
                            {/*        item.role === 'agent' ? <span className='ui green label small'>{item.role}</span> :*/}
                            {/*            <span className='ui yellow label small'>{item.role}</span>*/}
                            {/*    }*/}
                            {/*</td>*/}
                            {/*<td className='d-none d-sm-block' data-label="Area">{item.username}</td>*/}


                            {/*<td data-label="Status">*/}
                            {/*    {item.active ? <span className='text-success'>Active</span>*/}
                            {/*        : <span className='text-danger'>Inactive</span>}</td>*/}

                            <td>
                                {item.active ? <span className='ui green label small'>Active</span> :
                                    <span className='ui red label small'>Inactive</span>}
                                {/*<div className="ui toggle checkbox center aligned">*/}
                                {/*    <input type="checkbox" name="public"*/}
                                {/*        // value={item.active}*/}
                                {/*           onChange={event => this.onHandleChange(event)}*/}
                                {/*           checked={item.active}*/}
                                {/*    />*/}
                                {/*    <label/>*/}
                                {/*</div>*/}
                            </td>

                            {
                                this.state.root ?
                                    <td data-label="Name">{item.token}</td> : null
                            }

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

export default UserApi;
