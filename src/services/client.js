import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3333/api",
  handers: {
    "Content-Type": "application/json",
  },
});

const authenticatedClient = axios.create({ ...client.defaults });
authenticatedClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token") || "";
    Object.assign(config.headers, { Authorization: `Bearer ${token}` });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { client, authenticatedClient };
