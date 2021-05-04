import { HttpService } from "@/utils/http"
import { AxiosResponse } from "axios"

interface Status {
    code: string
    codeMsg: string
    message: string
}
export interface LoginPVO {
    id: string
    hashPwd: string
}

export interface LoginRVO {
    status?: Status
    result?: string
}

export interface CountRVO {
    status?: Status
    count: number
}

// 서비스 로직 단 구현
export default class RestSample extends HttpService {
    // 로그인
    async login(pvo: LoginPVO): Promise<AxiosResponse<LoginRVO>> {
        return await this.getInstance().post("api/common/login", pvo)
    }

    async getCount(): Promise<AxiosResponse<CountRVO>> {
        return await this.getInstance().get("api/getCount")
    }
}
