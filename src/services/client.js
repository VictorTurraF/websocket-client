import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
  handers: {
    "Content-Type": "application/json",
  },
});

export function login({ email, password }) {
  return instance.post('/auth', { email, password })
}