import {AxiosResponse} from "axios";
import Storage from "@/core/Storage";
import {Criterion} from "@/model/Criterion";
import {Cities} from "@/model/Cities";

require('axios-debug-log/enable')

const apiUrl = "http://localhost:8080"

export default class API {
    private axios = require('axios').default;

    private cancelToken = this.axios.CancelToken;
    private cancelSource = this.cancelToken.source()

    private storage: Storage

    constructor(storage: Storage) {
        this.storage = storage
    }

    explore = async (criterion: Criterion): Promise<Cities> => {
        return this.post('/explore', criterion)
            .then(r => r.data as Cities)
    }

    /*
     *  General purpose below
     */

    delete = async (url: string): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers: { [name: string]: string } = {
                    // 'Accept-Encoding': 'gzip,deflate'
                }

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'delete',
                    headers: headers,
                    cancelToken: this.cancelSource.token
                })
            })
    }

    get = async (url: string): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers: { [name: string]: string } = {
                    'Accept': 'application/json',
                }

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'get',
                    headers: headers,
                    cancelToken: this.cancelSource.token
                })
            })
    }

    post = async (url: string, payload: any): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers: { [name: string]: string } = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'post',
                    headers: headers,
                    data: JSON.stringify(payload),
                    cancelToken: this.cancelSource.token,
                })
            })
    }

    put = async (url: string, payload: any = ""): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers: { [name: string]: string } = {
                    'Accept-Encoding': 'gzip,deflate',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'put',
                    headers: headers,
                    data: JSON.stringify(payload),
                    cancelToken: this.cancelSource.token
                });
            })
    }
}