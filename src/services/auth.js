import { client } from './client'

function login({ email, password }) {
  return client.post('/auth', { email, password })
}

export { login }