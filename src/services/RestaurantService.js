import http from './BaseService';

export const createRestaurant = (body) => http.post('/restaurant/create', body)
