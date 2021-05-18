import { HttpService, RestServiceResponse } from '@/utils/http'
// import { AxiosResponse } from "axios"

interface Status {
    code: string
    codeMsg: string
    message: string
}
export interface LoginPVO {
    emailId: string
    pwd: string
}

export interface LoginRVO {
    Status?: Status
    result?: string
}

export interface CountRVO {
    Status: Status
    count?: string
}

// 서비스 로직 단 구현
export default class RestSample extends HttpService {
    // 로그인
    async login(pvo: LoginPVO): Promise<LoginRVO> {
        return await this.getInstance().post('api/common/login', pvo)
    }

    async getCount(): Promise<RestServiceResponse<CountRVO>> {
        return await this.getInstance().get('api/getCount')
    }
}
