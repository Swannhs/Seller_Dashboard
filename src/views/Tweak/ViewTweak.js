import React from 'react';
import {useParams} from "react-router";
import ViewTweakUi from "./ViewTweakUI";

const ViewTweak = () => {
    let {id} = useParams();
    return <ViewTweakUi id={id}/>
};

export default ViewTweak;
