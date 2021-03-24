import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }
  getmovies = async () => {
    const {
      data: {
        data: {movies}
      }
    } = await axios.get('https://yts-proxy.nomadcoders1.now.sh/list_movies.json');
    this.setState({movies, isLoading: false}) // movies: movies 생략
  };
  componentDidMount(){
    this.getmovies();
  }
  render(){
    const { isLoading, movies } = this.state;
    return <section class="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader_text">Loading..</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map(movie => (
            <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.year}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}/>
          ))}
        </div>
      )}
    </section>;
  }
}

export default App;
