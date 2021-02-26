import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const auth = await JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      config.headers["access-token"] = auth.headers["access-token"];
      config.headers.client = auth.headers.client;
      config.headers.uid = auth.headers.uid;
      config.headers.expiry = auth.headers.expiry;
      config.headers["token-type"] = auth.headers["token-type"];
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 401) {
//       await localStorage.removeItem("auth");

//       // navigate("SignIn");
//     }
//     return error;
//   }
// );

export default instance;
