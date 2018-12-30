import { config } from './config';


const fetchMovies = (filter) => {
  return fetch(`${config.BASE_URI}/movies?filter=${filter}`)
};

export default new class Api {
  fetchAllMovies = (cb) => {
    Promise.all([
        fetchMovies('latest'),
        fetchMovies('popular'),
        fetchMovies('upcoming')
      ])
      .then((responses) => {
        const fetchResponses = responses.map((response) => response.json());

        Promise
          .all(fetchResponses)
          .then((data) => {
            cb([].concat(...data));
          });
      });
  };

  getMovies = async (filter = 'upcoming') => {
    const response = await fetch(`${config.BASE_URI}/movies?filter=${filter}`);
    const result = await response.json();

    return result;
  };
}();
