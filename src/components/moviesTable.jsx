import React from 'react';
import Like from './common/like';

const MoviesTable = ( props ) => {
    const { movies, onLike, onDelete, onSort } = props;
    return (  <table className="table table-striped">
                        <thead>
                        <tr>
                            <th onClick={()=> onSort("title")}>Title</th>
                            <th onClick={()=> onSort("genre.name")}>Genre</th>
                            <th onClick={()=> onSort("numberInStock")}>Stock</th>
                            <th onClick={()=> onSort("dailyRentalRate")}>Rate</th>
                            <th></th>
                            <th></th>

                        </tr>
                        </thead>
                        <tbody>
                            { movies.map( movie => (
                                <tr key={ movie._id }>
                                    <td>{ movie.title }</td>
                                    <td>{ movie.genre.name }</td>
                                    <td>{ movie.numberInStock }</td>
                                    <td>{ movie.dailyRentalRate }</td>
                                    {/* <td><i className={ this.likeStyle(movie.liked) } onClick={()=> this.handleLikeUnlike(movie)}></i></td> */}
                                    <td><Like like={ movie.liked } onClick={()=> onLike(movie)}/></td>
                                    <td><button className="btn btn-danger btn-sm" onClick={ ()=> onDelete(movie)}>Delete</button></td>
                                </tr>
                            ))}
                    </tbody>
                    </table> );
}
 
export default MoviesTable; 