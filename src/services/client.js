import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  handers: {
    "Content-Type": "application/json",
  },
});

const authenticatedClient = axios.create({ ...client.config });
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
