import React from 'react';
import {useParams} from "react-router";
import EditServerUi from "./EditServerUi";

const EditServer = () => {
    let {id} = useParams();
    return <EditServerUi id={id}/>
}

export default EditServer;
