import React, { Component } from "react";
import { connect } from "react-redux";
import { removeMovieFavorite } from "../../actions";
import { Link } from 'react-router-dom';
import './Favorites.css';

export class ConnectedList extends Component {

  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <ul className="allMovies">
          {this.props.movies.map((movie) => {
            return (
              <div key={movie.id} className='movie'>
              <div>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              <button onClick={() => this.props.removeMovieFavorite(movie.id)}>X</button>
              </div>
              <h4>{movie.year}</h4>
              <img src={movie.image} alt='reference' className="image"/>
              <h4>{movie.type}</h4>
              </div> 
            )
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    movies: state.moviesFavourites,
  }
};

function mapDispatchToProps(dispatch){
  return {
    removeMovieFavorite: id => dispatch(removeMovieFavorite(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
