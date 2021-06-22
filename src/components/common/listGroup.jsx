import React from 'react';
const ListGroup = ( props ) => {
    const { items, textProperty, valueProperty,selectedItem,onItemSelect } = props;
    console.log(props);

    return( 
        <div id="list-example" class="list-group mt-5">
            { items.map( genre =>
                <a key={genre[valueProperty]} className={ genre === selectedItem ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} onClick={()=>onItemSelect(genre)}>{ genre[textProperty]}</a>
                
             )}
            
       
        </div>)
    
}

// Default props
ListGroup.defaultProps = {
    textProperty: "name", 
    valueProperty: "_id"
}
export default ListGroup;  