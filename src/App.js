import { useState } from 'react';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [planets, setPlanets] = useState([]);

  const formatPlanets = (planets) =>
    planets.map((planet) => ({
      id: planet.result._id,
      name: planet.result.properties.name,
    }));

  const getMovieList = async () => {
    const res = await fetch('https://www.swapi.tech/api/films');
    const data = await res.json();

    console.log(data);
    setMovies(data?.result);
  };

  const getPlanets = async (planets) => {
    const promises = planets.map((planet) => fetch(planet));

    const response = await Promise.all(promises);
    const data = await Promise.all(response.map((res) => res.json()));

    const formattedPlanets = formatPlanets(data);
    setPlanets(formattedPlanets);
  };

  return (
    <div className='App'>
      <h1>Star Wars API Practice</h1>
      <button onClick={getMovieList}>Get Movie List</button>

      <div>
        {movies.length > 0 &&
          movies.map((movie) => (
            <button
              key={movie._id}
              onClick={() => getPlanets(movie.properties.planets)}
            >
              {movie.properties.title}
            </button>
          ))}
      </div>

      <div>
        {planets.length > 0 &&
          planets.map((planet) => <div key={planet.id}>{planet.name}</div>)}
      </div>
    </div>
  );
};

export default App;
