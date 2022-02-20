import React from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../../actions/index';

import './Movie.css';

class Movie extends React.Component {
    componentDidMount() {
        const movieId = this.props.match.params.id;
        this.props.getMovieDetail(movieId)
    }
    render() {
        return (
            <div className='container'>
                <h2 className='title'>{`Titulo: ${this.props.movies.Title}`}</h2>
                <div className='column'>
                <img src= {this.props.movies.Poster} alt='Not found'/>
                </div>
                <div className='details'>
                <h4>{`Año: ${this.props.movies.Year}`}</h4>
                <h4>{`Duración: ${this.props.movies.Runtime}`}</h4>
                <h4>{`Elenco: ${this.props.movies.Actors}`}</h4>
                <h4>{`Director: ${this.props.movies.Director}`}</h4> 
                </div>
                </div>
        );
    }
}

function mapStateToProps(state){
    return {
        movies: state.movieDetail
    }
};

function mapDispatchToProps(dispatch){
    return {
        getMovieDetail: id => dispatch(getMovieDetail(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);