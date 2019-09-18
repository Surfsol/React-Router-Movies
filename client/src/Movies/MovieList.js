import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Link} from "react-router-dom";
import MovieCard from "./MovieCard";


const MovieList = props => {
  const [movies, setMovies] = useState([])
  console.log(props)
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovies(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getMovies();
  }, []);
  
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}



      function MovieDetails({ movie }) {
        const { title, director, metascore, stars } = movie;
        return (
          <div className="movie-card">
            <Link to={`/movies/${movie.id}`}>Movie Details</Link>
            <Route path="/movies/:id" render={props => <MovieCard {...props} items={movie} />}/>
            <h2>{title}</h2>
            <div className="movie-director">
              Director: <em>{director}</em>
            </div>
            <div className="movie-metascore">
              Metascore: <strong>{metascore}</strong>
            </div>
            <h3>Actors</h3>
      
            {stars.map(star => (
              <div key={star} className="movie-star">
                {star}
              </div>
            ))}
          </div>
        );
      }

export default MovieList;
