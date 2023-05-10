import jwt_decode from "jwt-decode";
import {Criterion} from "@/model/Criterion";

const tokenKey = 'token'
const criteriaToken = "criteria"

export default class Storage {

    getCriteria = async (criteria: string): Promise<Criterion | undefined> => {
        let criterion: Criterion | undefined = this.get(criteriaToken)

        if (!criterion)
            return

        return criterion
    }

    addCriteria = async (criteria: string): Promise<Criterion | undefined> => {
        let criterion: Criterion | undefined = this.get(criteriaToken)

        if (!criterion)
            return

        criterion.criterion.push(criteria)

        this.set(criteriaToken, criterion)
    }

    removeCriteria = async (criteria: string) => {
        let criterion: Criterion | undefined = this.get(criteriaToken)

        if (!criterion)
            return criterion

        this.set(criteriaToken, criterion.criterion
            .filter((criteria) => criteria == criteria))
    }

    isLoggedIn = async (): Promise<boolean> => {
        let token = this.get(tokenKey)
        return token != null
    }

    clearToken = async (): Promise<void> => {
        return this.remove(tokenKey)
    }

    setToken = async (token: string): Promise<void> => {
        return this.set(tokenKey, token);
    }

    getToken = async (): Promise<string | undefined> => {
        let token: string | undefined = this.get(tokenKey)

        if (!token) {
            return
        }
        return token
    }

    getUserFromToken = (token: string): string => {
        const decoded = jwt_decode(token);
        // @ts-ignore
        return decoded.id
    }

    getUserId = async (): Promise<string | undefined> => {
        let token = await this.getToken()

        if (!token) {
            return
        }

        return this.getUserFromToken(token)
    }

    remove = (key: string) => {
        return localStorage.removeItem(key)
    }

    private set = (key: string, value: any) => {
        const jsonValue = JSON.stringify(value)

        return localStorage.setItem(key, jsonValue)
    }

    private get = <T>(key: string): T | undefined => {
        const jsonValue = localStorage.getItem(key)

        if (!jsonValue)
            return

        return JSON.parse(jsonValue)
    }
}
