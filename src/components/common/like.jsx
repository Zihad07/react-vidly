import React from 'react';

const Like = (props) => {
    let clasess = "fa fa-heart";
    if(!props.like) clasess += "-o"
    return (<i onClick={props.onClick} className={ clasess } style={{ cursor:'pointer' }}></i>  );
    
}


 
export default Like;