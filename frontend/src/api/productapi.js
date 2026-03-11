import { instance } from "./axiosInstance"

export const getAllProductApi = (page, limit) => {
    return instance.get(`/product?page=${page}&limit=${limit}`)
}

export const ProductsApi = () => {
    return instance.get('/getProduct', { headers: { token: localStorage.getItem('token') } })
}

export const getProductApi = (id) => {
    return instance.get(`/getProduct/${id}`, { headers: { token: localStorage.getItem('token') } })

}

export const updateProduct = (id, data) => {
    return instance.put(`/update-product/${id}`, data, { headers: { token: localStorage.getItem('token') } })
}

export const addProductsApi = (formData) => {
    return instance.post('/addProduct', formData, { headers: { 'Content-Type': 'multipart/form-data', token: localStorage.getItem('token') } })
}
