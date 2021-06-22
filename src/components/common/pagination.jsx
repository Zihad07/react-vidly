import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
    const  { itemsCount, pageSize, currentPage ,onPageChange } = props;
    const pageCount = Math.ceil(itemsCount / pageSize );
    console.log('currentPage : ', currentPage);
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    return <nav className="naviagation">
        <ul className="pagination">
            { pages.map((page) => 
            
                <li 
                key={page} 
                className={ currentPage === page ? "page-item active" : "page-item"}
                >
                    <a 
                    className="page-link" 
                    onClick={()=> onPageChange(page)}
                    >
                        { page }
                    </a>
                </li>

            
            )}
        </ul>
    </nav>;
}

// props type checking.
Pagination.propTypes = {
    itemsCount:PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}
export default Pagination;