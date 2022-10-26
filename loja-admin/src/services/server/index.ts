import { IBrand } from '@typesCustom';
import { ICredential } from './../../../../@types/index';
import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3300',
});

// Endpoint dos serviços
const _ACCOUNT = '/account/admin';
const _BACKOFFICE = '/backoffice';

export const listBrands = () => (api.get(`${_BACKOFFICE}/brands`))
export const createBrand = (brand: IBrand) => (api.post(`${_BACKOFFICE}/brands`, brand))
export const updateBrand = (brand: IBrand) => (api.put(`${_BACKOFFICE}/brands/${brand.id}`, brand))
export const deleteBrand = (id: number) => (api.delete(`${_BACKOFFICE}/brands/${id}`))
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