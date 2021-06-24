import React, { Component } from 'react';
import { getMovies }  from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { deleteMovie } from "../services/fakeMovieService";
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate} from "../utils/paginate";

class Movies extends Component {
    state = { 
        movies : [],
        genres : [],
        currentPage: 1,
        pageSize: 2
     }

     componentDidMount() {
         const genres = [{_id: "",name: "All Genre"},...getGenres()]
         this.setState({ movies: getMovies(), genres})
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

    handleGenreSelect = (genre) => {
        // console.log(genre);
        // const movies = this.state.movies.filter( mb => mb.genre._id === genre._id);
        // this.setState({movies})
        this.setState({selectedGenre: genre, currentPage:1})
    }

    // For Sorting section
    handleSort = ( path ) => {
        console.log( path )
    }
    // For Sorting section end

    render() {
        const { length:movieCount } = this.state.movies;
        const { currentPage, pageSize, movies:allMoive, selectedGenre} = this.state;
        if(movieCount === 0) 
        return (
            <div className="Movie">
                <p>There are no movie</p>
                <p><i class="fa fa-heart"></i>({this.state.movies.filter(movie => movie.liked).length})
                <i class="fa fa-heart-o"></i>({this.state.movies.filter(movie => !movie.liked).length}
                </p>
            </div>
        )
        //Filter movies
        const filtered = selectedGenre && selectedGenre._id ? allMoive.filter( m => m.genre._id === selectedGenre._id) : allMoive;
        const count = filtered.length;
        // Calling paginate for movie list each page.
        const movies =  paginate(filtered, currentPage, pageSize);
        return ( 
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items={ this.state.genres }
                        selectedItem = { this.state.selectedGenre }
                        onItemSelect = { this.handleGenreSelect } 
                    />

                    
                </div>

                <div className="col">
                    <p className="font-weight-bold my-4 text-center">{ filtered.length } movies in the database.</p>
                    <div className="text-center">
                        <p><i class="fa fa-heart"></i>({filtered.filter(movie => movie.liked).length})
                        <i class="fa fa-heart-o"></i>({filtered.filter(movie => !movie.liked).length})
                        </p>
                    </div>

                    <MoviesTable movies = { movies } onLike={this.handleLike} onDelete={this.handleDelete} onSort={ this.handleSort }></MoviesTable> 
                    <Pagination 
                        itemsCount={ count }
                        pageSize = { pageSize }
                        currentPage = { currentPage }
                        onPageChange = { this.handlePageChange }  
                    >  
                    </Pagination>
                </div>
            </div>
          
         );
    }

 
    likeStyle = (like) => {
        // <i class="fas fa-thumbs-up"></i>
        return  like === true ? "3x fa fa-thumbs-up" : "3x fa fa-thumbs-down";
    }


    
}
 
export default Movies;