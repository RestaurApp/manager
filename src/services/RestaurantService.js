import http from './BaseService';

export const createRestaurant = (body) => http.post('/restaurant/create', body)

export const updateRestaurant = (id, body) => http.patch(`/restaurant/${id}`, body)
