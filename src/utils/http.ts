import axios, {
    AxiosInstance,
    // AxiosRequestConfig,
    // AxiosTransformer,
    AxiosAdapter,
} from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

// eslint-disable-next-line no-unused-vars
export type ResponseAdapterType = (data: any, headers?: any) => {}

export interface Status {
    code: number
    codeMsg: string
    message: string
}

export type RestServiceResponse<T> = Promise<T | null>
export class HttpService {
    // 싱글톤 패턴으로 axios Instance에 환경 설정
    private readonly instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers: {
                // "Cache-Control": "no-cache",
                'Content-Type': 'application/json',
                // "Content-Type": "application/json;charset=utf-8",
                'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With',
                'Access-Control-Allow-Origin': process.env.VUE_APP_API_URL,
                // "Access-Control-Allow-Origin": "*",
            },
            adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)),
            withCredentials: true,
            // transformResponse: this.getTransformResponse(),
        })
        // axios.defaults.headers["Content-Type"] =
        //     "application/json;charset=utf-8"
        // axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
        // axios.defaults.headers["Access-Control-Allow-Headers"] = "*"

        this.getInstance().interceptors.response.use(
            function(response) {
                // 응답 데이터를 가공
                return response.data
            },
            function(error) {
                // 오류 응답을 처리
                // ...
                return Promise.reject(error)
            }
        )
    }

    public getInstance() {
        return this.instance
    }

    // private getTransformResponse(): AxiosTransformer {
    //     return (data: any) => {
    //         try {
    //             const _data = JSON.parse(data)
    //             return {
    //                 ..._data,
    //             }
    //         } catch (error) {
    //             return {}
    //         }
    //     }
    // }

    // public async request<T>(
    //     config: AxiosRequestConfig,
    //     responseAdapter?: ResponseAdapterType
    // ): Promise<T> {
    //     const {
    //         transformResponse: defaultTransformResponse,
    //     } = this.instance.defaults
    //     const transformResponse: AxiosTransformer[] = [
    //         defaultTransformResponse as AxiosTransformer,
    //     ]

    //     if (responseAdapter) {
    //         transformResponse.push(responseAdapter)
    //     }

    //     let response: any = null
    //     try {
    //         response = await this.instance.request<T>({
    //             ...config,
    //             transformResponse,
    //         })

    //         // 공통 응답처리
    //         return response && response.data
    //     } catch (error) {
    //         console.log('request error : ', error)
    //         throw response
    //     }
    // }
}
