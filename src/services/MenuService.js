import http from './BaseService';

export const getMenus = () => http.get('/restaurant/menus')

export const createMenu = (body) => http.post('/restaurant/menu', body)

