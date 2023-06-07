import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:8083/api/" });
// Api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (!error.response) {
//       console.error("Problem connecting to the server...");
//     }
//     return Promise.reject(error);
//   }
// );

export { Api };
