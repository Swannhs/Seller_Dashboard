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
import {BsBoxArrowUpRight} from "react-icons/all";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {ListGroup} from "react-bootstrap";


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

    return (
        <>
            <TableRow className={classes.root} key={row.id}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.profile.name}
                </TableCell>
                <TableCell>{row.balance}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>

                            <ListGroup>
                                <ListGroup.Item>
                                    <span className='ml-5 mr-5'>
                                        <b>Group</b>
                                    </span>

                                    <span className='ml-5'>
                                        {row.realm.name}
                                    </span>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <span className='ml-5 mr-5'>
                                        <b>Credit</b>
                                    </span>

                                    <span className='ml-5'>
                                        {row.credit}
                                    </span>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <span className='ml-5 mr-5'>
                                        <b>Debit </b>
                                    </span>

                                    <span className='ml-5'>
                                        {row.debit}
                                    </span>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <span className='ml-5 mr-5'>
                                        <b>Action</b>
                                    </span>

                                    <span className='ml-5'>
                                        <Link to={'/admin/voucher/transactions/' + row.id}>
                                            {/*<Button className='btn-sm btn-primary'>*/}
                                            <div className='border border-success d-inline p-1'>
                                                <BsBoxArrowUpRight/>
                                            </div>

                                            {/*</Button>*/}
                                        </Link>
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>

                            {/*<Table size="small" aria-label="purchases">*/}
                            {/*    <TableHead>*/}
                            {/*        <TableRow>*/}
                            {/*            <TableCell>Group</TableCell>*/}
                            {/*            <TableCell>Credit</TableCell>*/}
                            {/*            <TableCell>Debit</TableCell>*/}
                            {/*            <TableCell/>*/}
                            {/*        </TableRow>*/}
                            {/*    </TableHead>*/}


                            {/*    <TableBody>*/}
                            {/*        <TableRow key={row.id}>*/}
                            {/*            <TableCell component="th" scope="row">*/}
                            {/*                {row.realm.name}*/}
                            {/*            </TableCell>*/}
                            {/*            <TableCell>{row.credit}</TableCell>*/}
                            {/*            <TableCell>{row.debit}</TableCell>*/}
                            {/*            <TableCell>*/}
                            {/*                <Link to={'/admin/voucher/transactions/' + row.id}>*/}
                            {/*                    <Button className='btn-sm btn-primary'>*/}
                            {/*                        <BsBoxArrowUpRight/>*/}
                            {/*                    </Button>*/}
                            {/*                </Link>*/}
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


const TransactionSummaryApiMobile = ({data}) => {
    return (
        <TableContainer className='mt-2' component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Profile</TableCell>
                        <TableCell>Balance</TableCell>
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
export default TransactionSummaryApiMobile;
