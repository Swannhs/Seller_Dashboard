import React, {Component} from 'react';
import 'reactjs-popup/dist/index.css';
import VoucherApi from "./VoucherApi";
import {Link} from "react-router-dom";
import VoucherApiMobile from "./VoucherApiMobile";

class VoucherList extends Component {
    state = {
        mobile: false
    }

    componentDidMount() {
        this.setState({mobile: window.innerWidth <= 660})
    }

    /*

        //todo Live Screen Change detect
        componentDidMount() {
            window.addEventListener("resize", this.resize.bind(this));
            this.resize();
        }

        resize() {
            this.setState({hideNav: window.innerWidth <= 760});
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.resize.bind(this));
        }

     */

    render() {
        return (
            <>
                <div className="ui grid">

                    <div className="ui text-right floated column">
                        <Link to='/admin/voucher/create'>
                            <button className='ui button primary'>
                                New
                            </button>
                        </Link>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr className='ct-grid-background border-primary'>
                        {
                            this.state.mobile ?
                                <th>
                                    #
                                </th> : null
                        }
                        <th scope="col">name</th>
                        <th scope="col">Password</th>

                        {
                            this.state.mobile ? <></> :
                                <>
                                    <th scope="col">Group</th>
                                    <th scope="col">Plan</th>
                                    <th scope="col">Action</th>
                                </>
                        }


                    </tr>
                    </thead>

                    {
                        this.state.mobile ?  <VoucherApiMobile/>
                            : <VoucherApi/>
                    }
                    {/*<VoucherApi mobile={this.state.mobile}/>*/}
                    {/*<tr>*/}
                    {/*    <td>Test</td>*/}
                    {/*    <td>Test</td>*/}
                    {/*    <td>Test</td>*/}
                    {/*</tr>*/}
                </table>
            </>
        );
    }
}

export default VoucherList;
