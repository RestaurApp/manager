import http from './BaseService';

export const cashClosing = (restaurantId) => http.post(`/order/${restaurantId}/cash-closing`)

export const cashList = () => http.get('/order/cash/list')

