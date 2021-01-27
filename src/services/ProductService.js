import http from './BaseService';

export const getProducts = () => http.get('/restaurant/products')

export const getProductsFromCategory = (id) => http.get(`/restaurant/category/${id}`)
