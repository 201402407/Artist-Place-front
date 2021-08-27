import { HttpService, Status } from '@/utils/http'
// import { AxiosResponse } from "axios"

export interface CreateCrewPVO {
    emailId: string
    pwd: string
}

export interface CreateCrewRVO {
    Status?: Status
}

// 서비스 로직 단 구현
export default class CreateCrewService extends HttpService {
    // 로그인
    async login(pvo: CreateCrewPVO): Promise<CreateCrewRVO> {
        return await this.getInstance().post('api/crew/createCrew', pvo)
    }
}
