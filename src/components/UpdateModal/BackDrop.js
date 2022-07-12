import React from "react";
import "./BackDrop.css";

const BackDrop = (props) => {
    return <div className='backdrop'>{props.children}</div>;
};

export default BackDrop;
