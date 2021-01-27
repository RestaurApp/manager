import http from './BaseService';

export const createCategory = (body) => http.post('/restaurant/category', body)

export const getCategories = () => http.get('/restaurant/categories')
