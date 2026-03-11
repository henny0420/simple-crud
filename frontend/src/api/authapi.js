import { instance } from "./axiosInstance"

export const signUpApi = (data) => {
    return instance.post("/signup",data)
}

export const signInApi = (data) => {
    return instance.post('/signin',data)
}