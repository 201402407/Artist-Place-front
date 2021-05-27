import { HttpService, Status } from '@/utils/http'
// import { AxiosResponse } from "axios"

export interface RegistNicknamePVO {
    emailId: string
    nickname: string
}

export interface RegistNicknameRVO {
    Status: Status
    nickname?: string
}

// 서비스 로직 단 구현
export default class NicknameService extends HttpService {
    // 닉네임 설정(추가)
    async registNickname(pvo: RegistNicknamePVO): Promise<RegistNicknameRVO> {
        return await this.getInstance().post('api/common/registNickname', pvo)
    }
}
