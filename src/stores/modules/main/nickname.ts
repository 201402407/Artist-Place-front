import store from '@/stores/index'
import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import NicknameService, { RegistNicknamePVO, RegistNicknameRVO } from '@/services/main/nickname'
import { Status } from '@/utils/http'

@Module({ dynamic: true, name: 'nicknameStore', namespaced: true, store })
export default class NicknameStore extends VuexModule {
    private nicknameService = new NicknameService()
    status: Status = {
        code: 0,
        codeMsg: '',
        message: '',
    }
    nickname? = ''

    @Action({ commit: 'setNicknameInfos', rawError: true })
    async registNickname(pvo: RegistNicknamePVO) {
        return await this.nicknameService.registNickname(pvo) // 여긴 서버 API 통신 함수 호출
    }

    @Mutation
    setNicknameInfos(registNicknameRVO: RegistNicknameRVO) {
        this.status = registNicknameRVO.Status
        if (registNicknameRVO.Status?.code === 200) {
            this.nickname = registNicknameRVO.nickname === 'undefined' ? '' : registNicknameRVO.nickname
        } else {
            this.nickname = ''
        }
    }
}

export const NicknameModule = getModule(NicknameStore)
