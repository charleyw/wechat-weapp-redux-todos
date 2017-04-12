import {crudCreate} from './dataActions'

export function login(code) {
  return crudCreate('auth', {code})
}