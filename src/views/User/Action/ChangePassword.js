import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {AiFillUnlock} from "react-icons/all";
import {Button} from "react-bootstrap";
import RadiusApi from "../../../radius-api/RadiusApi";
import {toast} from "react-toastify";


function getModalStyle() {

    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 350,
        // marginLeft: '35px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ChangePassword(props) {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState(false)

    const handlePassword = () => {
        setPassword(event.target.value)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangePassword = () => {
        let data = {
            user_id: props.id,
            password: password
        }
        RadiusApi.post('/access-providers/change-password.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success){
                    handleClose();
                    toast.success('Password is changed successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else {
                    toast.error('We did not manage to change password', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title" className='text-center'>Change Password</h3>
            <input name className="form-control" placeholder="New Password" type="text"
                   onChange={handlePassword}
                   required={true}
            />
            <div className='text-center mt-2'>
                <button className='ui button green' onClick={onChangePassword}>
                    Change
                </button>
                <button className='ui button' onClick={handleClose}>
                    Close
                </button>
            </div>

        </div>
    );

    return (
        <>
            <Button className='btn-sm btn-warning' type="button" onClick={handleOpen}>
                <AiFillUnlock/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
}
