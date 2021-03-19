import React from 'react';
import {useParams} from "react-router";
import ViewUi from "./ViewUi";

const ViewUser = () => {
    let {id} = useParams();
    return <ViewUi id={id}/>
};

export default ViewUser;
