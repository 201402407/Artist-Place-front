import axios, { AxiosInstance, AxiosTransformer, AxiosAdapter } from "axios"
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from "axios-extensions"

export class HttpService {
    // 싱글톤 패턴으로 axios Instance에 환경 설정
    private readonly instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: "http://13.124.3.122:8000/",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://13.124.3.122:8000",
                "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
            },
            adapter: throttleAdapterEnhancer(
                cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)
            ),
            withCredentials: true,
            transformResponse: this.getTransformResponse(),
        })

        // axios.defaults.headers["Content-Type"] =
        //     "application/json;charset=utf-8"
        // axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
        // axios.defaults.headers["Access-Control-Allow-Headers"] = "*"
    }

    public getInstance() {
        return this.instance
    }
    private getTransformResponse(): AxiosTransformer {
        return (data: any) => {
            try {
                const _data = JSON.parse(data)
                return {
                    ..._data,
                }
            } catch (error) {
                return {}
            }
        }
    }
}
