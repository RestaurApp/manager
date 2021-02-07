import http from './BaseService';

export const getTables = () => http.get('/table/list')

export const createTables = (body) => http.post('/table/create', body)

export const addTable = (body) => http.post('/table/add', body)