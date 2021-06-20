import React, { Component } from 'react';
import { getMovies }  from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import Like from './common/like';
import Pagination from './common/pagination';

class Movies extends Component {
    state = { 
        movies : getMovies(),
        currentPage: 1,
        pageSize: 4
     }

     handleDelete = ( movie )=> {
        // console.log(movieId);
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({ movies })
    }

    handleLikeUnlike = (movie) => {

        const movies = [...this.state.movies];
        const index = movies.indexOf(movies);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked
        this.setState({ movies });
        // console.log(movie);
    }

    handleLike = ( movie ) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked
        this.setState({ movies });
        // console.log('handle like');
        // console.log(movie);
    }

    handlePageChange = ( page ) => {
        // console.log( page )
        this.setState({currentPage: page});
    }

    render() {
        const { length:movieCount } = this.state.movies;
        const count = this.state.movies.length;
        const { currentPage, pageSize} = this.state;
        if(movieCount === 0) 
        return (
            <div className="Movie">
                <p>There are no movie</p>
                <p><i class="fa fa-heart"></i>({this.state.movies.filter(movie => movie.liked).length})
                <i class="fa fa-heart-o"></i>({this.state.movies.filter(movie => !movie.liked).length}
                </p>
            </div>
        ) 
        return ( 
            <React.Fragment>
                <p className="font-weight-bold my-4 text-center">{ movieCount } movies in the database.</p>
                <div className="text-center">
                    <p><i class="fa fa-heart"></i>({this.state.movies.filter(movie => movie.liked).length})
                    <i class="fa fa-heart-o"></i>({this.state.movies.filter(movie => !movie.liked).length})
                    </p>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
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
                                {/* <td><i className={ this.likeStyle(movie.liked) } onClick={()=> this.handleLikeUnlike(movie)}></i></td> */}
                                <td><Like like={ movie.liked } onClick={()=> this.handleLike(movie)}/></td>
                                <td><button className="btn btn-danger btn-sm" onClick={ ()=> this.handleDelete(movie)}>Delete</button></td>
                            </tr>
                        ))}
                   </tbody>
                </table>
                <Pagination 
                    itemsCount={ count }
                    pageSize = { pageSize }
                    currentPage = { currentPage }
                    onPageChange = { this.handlePageChange }  
                >  
                </Pagination>
            </React.Fragment>
          
         );
    }

 
    likeStyle = (like) => {
        // <i class="fas fa-thumbs-up"></i>
        return  like === true ? "3x fa fa-thumbs-up" : "3x fa fa-thumbs-down";
    }


    
}
 
export default Movies;