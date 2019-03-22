import {BASE_URI, CATEGORIES} from './config';


const fetchMovies = (filter) => {
  return fetch(`${BASE_URI}/movies?filter=${filter}`)
};

const getErrorResult = (result, err) => {
  console.error('API.getMovies error', err);

  result.error = err;

  return result;
}

export default new class API {
  getMovies = async (filter) => {
    let response;
    let result = [];

    if (CATEGORIES.indexOf(filter) > -1) {
      try {
        response = await fetch(`${BASE_URI}/movies?filter=${filter}`);

        if (response.ok) {
          result = await response.json();
        } else {
          throw new Error(response.status);
        }
      } catch (err) {
        result = getErrorResult(result, err);
      }
    }

    if (filter === void(0)) {
      response = await Promise.all(CATEGORIES.map((category) => fetchMovies(category)));

      const responseData = await response.map((responseItem) => responseItem.json());

      await Promise.all(responseData)
        .then((data) => {
          result = [].concat(...data);
        })
        .catch((err) => {
          result = getErrorResult(result, err);
        });
    }

    return result;
  };
};
