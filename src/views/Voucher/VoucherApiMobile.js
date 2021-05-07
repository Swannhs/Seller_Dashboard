import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {BiReset} from "react-icons/all";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const onVoucherConfirm = props => {
    confirmAlert({
        title: 'Confirm to reset',
        message: 'Are you sure to reset this voucher',
        buttons: [
            {
                label: 'Yes',
                onClick: () => onVoucherReset(props)
            },
            {
                label: 'No',
            }
        ]
    });
}

const onVoucherReset = (props) => {
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
}


function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <>
            <TableRow className={classes.root} key={row.id}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.password}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                                <div className="list-group-item">
                                    <div className="ui grid text-center">
                                        <div className="eight wide column">
                                            <b>Profile</b>
                                        </div>
                                        <div className="eight wide column">
                                            {row.profile}
                                        </div>
                                    </div>
                                </div>

                                <div className="list-group-item">
                                    <div className="ui grid text-center">
                                        <div className="eight wide column">
                                            <b>Realm</b>
                                        </div>
                                        <div className="eight wide column">
                                            {row.realm}
                                        </div>
                                    </div>
                                </div>

                                <div className="list-group-item">
                                    <div className="ui grid text-center">
                                        <div className="eight wide column">
                                            <b>Action</b>
                                        </div>
                                        <div className="eight wide column">
                                            <div className='border border-danger text-danger d-inline p-1'
                                                    onClick={() => onVoucherConfirm(row.id)}>
                                                <BiReset aria-placeholder='reset'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            {/*-----------------Previous---------------------*/}
                            {/*<Table size="small" aria-label="purchases">*/}
                            {/*    <TableHead>*/}
                            {/*        <TableRow>*/}
                            {/*            <TableCell>Profile</TableCell>*/}
                            {/*            <TableCell>Realm</TableCell>*/}
                            {/*            <TableCell>Reset</TableCell>*/}
                            {/*        </TableRow>*/}
                            {/*    </TableHead>*/}
                            {/*    <TableBody>*/}
                            {/*        <TableRow key={row.id}>*/}
                            {/*            <TableCell component="th" scope="row">*/}
                            {/*                {row.profile}*/}
                            {/*            </TableCell>*/}
                            {/*            <TableCell>{row.realm}</TableCell>*/}
                            {/*            <TableCell>*/}
                            {/*                <Button className='btn-sm btn-danger'  onClick={() => onVoucherConfirm(row.id)}>*/}
                            {/*                    <BiReset aria-placeholder='reset'/>*/}
                            {/*                </Button>*/}
                            {/*            </TableCell>*/}
                            {/*        </TableRow>*/}
                            {/*    </TableBody>*/}
                            {/*</Table>*/}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }).isRequired,
};


const VoucherApiMobile = ({data}) => {
    return (
        <TableContainer className='mt-2' component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Name</TableCell>
                        <TableCell>Password</TableCell>
                        {/*<TableCell align="right">Passwor</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row key={row.id} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default VoucherApiMobile;
