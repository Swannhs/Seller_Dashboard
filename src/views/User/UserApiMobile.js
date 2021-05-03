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
import {AiFillEdit, AiOutlineEye, BiReset} from "react-icons/all";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import DeleteUser from "./Action/DeleteUser";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

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
                <TableCell className='text-capitalize' component="th" scope="row">
                    {row.username}
                </TableCell>
                <TableCell className='text-capitalize'>{row.role}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {
                                                row.active ? <span className='text-success'>Active</span>
                                                    : <span className='text-danger'>Inactive</span>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Link to={'/admin/users/view/' + row.id}>
                                                <Button className='btn-sm btn-success'>
                                                    <AiOutlineEye/>
                                                </Button>
                                            </Link>

                                            {/*<AiFillEdit onClick={this.onEditUser}/>*/}
                                            <Link to={'/admin/users/edit/' + row.id}>
                                                <Button className='btn-sm primary'>
                                                    <AiFillEdit/>
                                                </Button>
                                            </Link>

                                            <DeleteUser delId={row.id}/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }).isRequired,
};


const CollapsibleTable = ({data}) => {
    return (
        <TableContainer className='mt-2' component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
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
export default CollapsibleTable;
