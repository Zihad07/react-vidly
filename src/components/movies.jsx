import React, { Component } from 'react';
import { getMovies }  from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
    state = { 
        movies : getMovies()
     }
    render() {
        const { length:movieCount } = this.state.movies;
        if(movieCount === 0) 
        return (
            <div className="Movie">
                <p>There are no movie</p>
            </div>
        ) 
        return ( 
            <React.Fragment>
                <p className="font-weight-bold my-4 text-center">{ movieCount } movies in the database.</p>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>

                    </tr>
                    </thead>
                    <tbody>
                        { this.state.movies.map( movie => (
                            <tr key={ movie._id }>
                                <td>{ movie.title }</td>
                                <td>{ movie.genre.name }</td>
                                <td>{ movie.numberInStock }</td>
                                <td>{ movie.dailyRentalRate }</td>
                                <td><button className="btn btn-danger btn-sm" onClick={ ()=> this.handleDelete(movie)}>Delete</button></td>
                            </tr>
                        ))}
                   </tbody>
                </table>
            </React.Fragment>
          
         );
    }

    handleDelete = ( movie )=> {
        // console.log(movieId);
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({ movies })
    }


    renderMovieTable = ()=> {

        return (
            this.state.movies.map((movie, index) => {
                let {_id:id,title, genre:{name}, numberInStock:stock, dailyRentalRate:rate} = movie;

                return (
                    <tr key={id}>
                        <td>{title}</td>
                        <td>{name}</td>
                        <td>{stock}</td>
                        <td>{rate}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={()=>this.handleDelete(id)}>Delete</button></td>
                    </tr>
                )
            })
        );
    }
}
 
export default Movies;