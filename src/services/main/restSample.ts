import { HttpService, RestServiceResponse } from '@/utils/http'
// import { AxiosResponse } from "axios"

interface Status {
    code: number
    codeMsg: string
    message: string
}
export interface LoginPVO {
    emailId: string
    pwd: string
}

export interface RegistNicknamePVO {
    emailId: string
    nickname: string
}

export interface LoginResult {
    result?: string
    emailId?: string
    nickname?: string
}

export interface LoginRVO {
    Status?: Status
    rvo?: LoginResult
}

export interface RegistNicknameRVO {
    Status?: Status
    nickname?: string
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

    // 닉네임 설정(추가)
    async registNickname(pvo: RegistNicknamePVO): Promise<RegistNicknameRVO> {
        return await this.getInstance().post('api/common/registNickname', pvo)
    }

    async getCount(): Promise<RestServiceResponse<CountRVO>> {
        return await this.getInstance().get('api/getCount')
    }
}
