import React from 'react';
import {useParams} from "react-router";
import EditUi from "./EditUi";

const EditUser = () => {
    let {id} = useParams();

    return <EditUi id={id}/>

};


export default EditUser;
