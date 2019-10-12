import Axios from "axios";

export const getHome = options => {
  return {
    type: "GET_HOME",
    payload: new Promise((resolve, reject) => {
      const { search = "", sort = "", page = "1", order = "" } = options;

      Axios.get(
        `http://100.24.15.0:3000/api/v1/products?sort=${sort}&order=${order}&search=${search}&page=${page}`
      )
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };
};
