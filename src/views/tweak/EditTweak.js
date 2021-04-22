import React from 'react';
import {useParams} from "react-router";
import EditTweakUi from "./EditTweakUi";

const EditTweak = () => {
    let {id} = useParams();

    return <EditTweakUi id={id}/>
};

export default EditTweak;
