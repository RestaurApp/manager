import http from './BaseService';


export const postOptions = (id, body) => http.post(`/restaurant/product/${id}/option`, body)

export const deleteOption = (id) => http.delete(`/restaurant/product/option/${id}/remove`)

export const updateOption = (id, body) => http.patch(`/restaurant/product/option/${id}`, body)
