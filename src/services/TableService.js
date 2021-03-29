import http from './BaseService';

export const getTables = () => http.get('/table/list')

export const createTables = (body) => http.post('/table/create', body)

export const addTable = (body) => http.post('/table/add', body)

export const updateTable = (body, id) => http.patch(`/table/${id}/update`, body)

export const deleteTable = (id) => http.delete(`/table/${id}/remove`)

export const getQr = id => http.get(`/table/${id}/qr`)