import { ICredential } from './../../../../@types/index';
import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3302',
});

// Endpoint dos serviços
const _ACCOUNT = '/account/admin'

// Account
export const signInAdmin = async (credential: ICredential) => {
    try {
        const result = await api.post(`${_ACCOUNT}/signin`, credential);
        return new Promise(resolve => {
            resolve(result.data);
        })
    } catch (e) {
        const error = e as AxiosError;
        return new Promise((resolve, reject) => {
            resolve(error);
        })
    }
}