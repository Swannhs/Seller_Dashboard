import React from 'react';
import {useParams} from "react-router";
import EditVersionUi from "./EditVersionUI";

const EditVersion = () => {
    let {id} = useParams();
    return (
        <EditVersionUi id={id}/>
    );
};

export default EditVersion;
