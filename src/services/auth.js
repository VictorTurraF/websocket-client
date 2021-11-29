import { client } from './client'

function login({ email, password }) {
  return client.post('/auth', { username: email, password })
}

export { login }