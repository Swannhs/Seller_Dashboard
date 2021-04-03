import React, {useState} from "react";
import 'reactjs-popup/dist/index.css';
import VoucherApi from "./VoucherApi";
import {Link} from "react-router-dom";
import {Dropdown, FormControl} from "react-bootstrap";


function VoucherList() {

    const onFilter = (event) => {
        console.log(event.target.value)
    }

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <>
            <h4>
                Group
            </h4>
            <i className="filter icon d-inline cursor-pointer"
               onClick={(e) => {
                   e.preventDefault();
                   onClick(e);
               }}
            > Filter</i>
        </>


    ));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {

            return (
                <div
                    ref={ref}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(event) => onFilter(event)}
                    />
                </div>
            );
        },
    );

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

            <table className="table table-bordered text-center mt-3" style={{fontSize: '20px'}}>
                <thead>
                <tr className='ct-grid-background border-primary'>
                    <th>
                        <h4 className='text-center'>
                            Name
                        </h4>
                    </th>
                    <th>
                        <h4 className='text-center'>
                            Password
                        </h4>
                    </th>

                    {/*<th className='d-none d-sm-block'>*/}
                    {/*    <h4 className='text-center'>*/}
                    {/*        More*/}
                    {/*    </h4>*/}
                    {/*</th>*/}

                    <th>

                        <Dropdown className='text-center'>
                            <Dropdown.Toggle as={CustomToggle}/>

                            <Dropdown.Menu as={CustomMenu}/>
                        </Dropdown>

                    </th>


                    <th>
                        <h4 className='text-center'>
                            Plan
                        </h4>
                    </th>
                    <th>
                        <h4 className='text-center'>
                            Action
                        </h4>
                    </th>


                </tr>
                </thead>
                <VoucherApi/>
                {/*<tr>*/}
                {/*    <td>Test</td>*/}
                {/*    <td>Test</td>*/}
                {/*    <td>Test</td>*/}
                {/*</tr>*/}
            </table>
        </>

    )
}

export default VoucherList;
