import { HttpService, RestServiceResponse, CommonHTTPStatus, Status } from '@/utils/http'
// import { AxiosResponse } from "axios"

export interface LoginPVO {
    emailId: string
    pwd: string
}

export interface RegistNicknamePVO {
    emailId: string
    nickname: string
}

export interface GetQuestionListPVO {
    type: number
    state: number
}

export interface AddQuestionPVO {
    type: number
    problemName: string
    state?: number
    answer?: string
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

export interface CountRVO {
    Status: Status
    count?: string
}

export interface GetQuestionListRVO {
    Status: Status
    questionList: QuestionVO[]
}

export interface QuestionVO {
    type: number
    problemName: string
    state: number
    answer?: string
}

// 서비스 로직 단 구현
export default class LoginService extends HttpService {
    // 로그인
    async login(pvo: LoginPVO): Promise<LoginRVO> {
        return await this.getInstance().post('api/common/login', pvo)
    }

    async getCount(): Promise<RestServiceResponse<CountRVO>> {
        return await this.getInstance().get('api/getCount')
    }

    async getQuestionList(pvo: GetQuestionListPVO): Promise<RestServiceResponse<GetQuestionListRVO>> {
        return await this.getInstance().post('api/common/getQuestionList', pvo)
    }

    async addQuestion(pvo: AddQuestionPVO): Promise<CommonHTTPStatus> {
        return await this.getInstance().post('api/common/addQuestion', pvo)
    }
}
