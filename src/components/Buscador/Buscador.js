import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { addMovieFavorite, getMovies } from "../../actions";
import './Buscador.css';



export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
  }
  render() {
    const { title } = this.state;
    return (
      <div className="home">
      <div className="searcher">
        <div>
        <h2>Buscador</h2>
        </div>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title"><strong>Película: </strong></label>
            <input
              type="text"
              id="title"
              autoComplete="on"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">Buscar</button>
        </form>
        </div>
        <ul className="allMovies"> {
          this.props.movies.map((movie) => {
            
            return (
              <li className='listas' key={movie.imdbID}>
                <Link to={`/movie/${movie.imdbID}`}>
                  { movie.Title } 
                </Link>
                <h4>{movie.Year}</h4>
                <Link to={`/movie/${movie.imdbID}`}>
                  <img src={movie.Poster} alt='reference' className="image"/>
                </Link>
                <h4>{movie.Type}</h4>
                <button className='fav' onClick={() => this.props.addMovieFavorite({
                  title: movie.Title,
                  id: movie.imdbID,
                  type: movie.Type,
                  year: movie.Year,
                  image: movie.Poster
                })}>Fav</button>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Buscador);

