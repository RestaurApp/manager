import http from './BaseService';

export const loginUser = user => http.post('users/login', user)
 
export const registerUser = user => http.post('users/signup', user)

export const refresh = refresh => http.post('users/refresh', refresh)

export const updateUser = (id, data) => http.patch(`users/${id}/update`, data)