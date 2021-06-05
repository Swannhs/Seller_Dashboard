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
                <TableCell className='text-capitalize' component="th" scope="row">
                    {row.user.username}
                </TableCell>
                <TableCell>{row.balance}$</TableCell>
                <TableCell>{row.debit}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>

                            <div className="list-group-item">
                                <div className="ui grid text-center">
                                    <div className="eight wide column">
                                        <b>Transaction ID</b>
                                    </div>
                                    <div className="eight wide column">
                                        {row.transaction}
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="ui grid text-center">
                                    <div className="eight wide column">
                                        <b>Plan</b>
                                    </div>
                                    <div className="eight wide column">
                                        {row.profile.name}
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="ui grid text-center">
                                    <div className="eight wide column">
                                        <b>Vendor</b>
                                    </div>
                                    <div className="eight wide column">
                                        {row.realm.name}
                                    </div>
                                </div>
                            </div>
                            {/*----------------------------Previous----------------------*/}
                            {/*<Table size="small" aria-label="purchases">*/}
                            {/*    <TableHead>*/}
                            {/*        <TableRow>*/}
                            {/*            <TableCell>Transaction ID</TableCell>*/}
                            {/*            <TableCell>Profile</TableCell>*/}
                            {/*            <TableCell>Group</TableCell>*/}
                            {/*        </TableRow>*/}
                            {/*    </TableHead>*/}
                            {/*    <TableBody>*/}
                            {/*        <TableRow key={row.id}>*/}
                            {/*            <TableCell component="th" scope="row">*/}
                            {/*                {row.transaction}*/}
                            {/*            </TableCell>*/}
                            {/*            <TableCell>{row.profile.name}</TableCell>*/}
                            {/*            <TableCell>{row.realm.name}</TableCell>*/}
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


const TransactionSentMobile = ({data}) => {
    return (
        <TableContainer className='mt-2' component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Receiver</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Voucher</TableCell>
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
export default TransactionSentMobile;
