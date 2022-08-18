import { useState } from 'react';

import './App.css';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [planets, setPlanets] = useState([]);

  const getMovieTitles = async () => {
    try {
      const res = await axios.get('https://www.swapi.tech/api/films');

      setMovies(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getMoviePlanets = async (planets) => {
    setPlanets([]);
    try {
      axios.all(planets.map((planet) => axios.get(planet))).then((data) => {
        console.log(data);

        const planetNames = data.map(
          (planet) => planet.data.result.properties.name,
        );

        // const planet1 = data[0].data.result.properties.name;

        // const planetArr = [];
        // planetArr.push(planet1);

        setPlanets(planetNames);
      });

      // Have an array of api calls to make
      // Make each call and once I have them set planet state
      // data.result.properties.name
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <h1>Hello Star Wars</h1>
      <button onClick={getMovieTitles}>Get Movie Titles</button>

      {movies.length > 0 &&
        movies.map((movie, index) => (
          <button
            key={index}
            onClick={() => getMoviePlanets(movie.properties.planets)}
          >
            {movie.properties.title}
          </button>
        ))}

      {planets.length > 0 &&
        planets.map((planet, index) => <div key={index}>{planet}</div>)}
    </div>
  );
};

export default App;
