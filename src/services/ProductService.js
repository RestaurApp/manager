import http from './BaseService';

export const getProducts = () => http.get('/restaurant/products')

export const getProductsFromCategory = (id) => http.get(`/restaurant/category/${id}/products`)

export const postProduct = (body) => http.post(`/restaurant/product`, body)
