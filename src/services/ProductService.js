import http from './BaseService';

export const getProducts = (token) => http.get('/restaurant/products',  
  { 
    headers: {
    'Authorization': token
  }
})
