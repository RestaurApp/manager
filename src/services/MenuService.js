import http from './BaseService';

export const getMenus = () => http.get('/restaurant/menus')

export const createMenu = (body) => http.post('/restaurant/menu', body)

export const updateMenu = (id, body) => http.patch(`/restaurant/menu/${id}`, body)

export const deleteMenu = (id) => http.delete(`/restaurant/menu/${id}/remove`)

