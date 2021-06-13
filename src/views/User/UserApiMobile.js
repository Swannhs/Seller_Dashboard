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
import {AiFillEdit, AiOutlineEye} from "react-icons/all";
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


function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const onRefresh = () => {
        props.refresh.refresh();
    }

    return (
        <>
            <TableRow className={classes.root} key={row.id}>
                <TableCell>
                    <div className='mt-1'>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </div>
                </TableCell>
                <TableCell className='text' component="th" scope="row">
                    <Box margin={1}>
                        {row.username}
                    </Box>
                </TableCell>
                <TableCell className='text'>
                    <Box margin={1}>
                        {
                            row.active ? <span className='ui green label small'>Active</span>
                                : <span className='ui red label small'>Inactive</span>
                        }
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <div className="list-group-item">
                                <div className="ui grid text-center">
                                    <div className="eight wide column">
                                        <b>Action</b>
                                    </div>
                                    <div className="eight wide column">
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

                                        <DeleteUser delId={row.id} refresh={onRefresh}/>
                                    </div>
                                </div>
                            </div>
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


const UserApiMobile = props => {

    return (
        <TableContainer className='mt-2' component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>
                            <span className='ml-2'>Name</span>
                        </TableCell>
                        <TableCell>
                            <span className='ml-2'>Status</span>
                        </TableCell>
                        {/*<TableCell align="right">Passwor</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data.map((row) => (
                            <Row key={row.id} row={row} refresh={props}/>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default UserApiMobile;
