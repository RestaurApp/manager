import http from './BaseService';

export const getProducts = () => http.get('/restaurant/products')

export const getProductsFromCategory = (id) => http.get(`/restaurant/category/${id}/products`)

export const postProduct = (body) => http.post(`/restaurant/product`, body)

export const deleteProduct = (id) => http.delete(`/restaurant/product/${id}/remove`)

export const updateProduct = (body, id) => http.patch(`/restaurant/product/${id}`, body)
