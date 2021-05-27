import store from '@/stores/index'

import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import LoginService, { LoginPVO, LoginRVO, CountRVO } from '@/services/main/login'

@Module({ dynamic: true, name: 'loginStore', namespaced: true, store })
export default class LoginStore extends VuexModule {
    private loginService = new LoginService()
    loginResult = false
    nickname? = ''
    loginId = ''
    count = ''

    @Action({ commit: 'setLoginInfos', rawError: true })
    async chkLogin(pvo: LoginPVO) {
        return await this.loginService.login(pvo) // 여긴 서버 API 통신 함수 호출
    }

    @Action({ commit: 'setCounts', rawError: true })
    async getCount() {
        return await this.loginService.getCount() // 여긴 서버 API 통신 함수 호출
    }

    @Mutation
    setLoginInfos(loginRVO: LoginRVO) {
        if (loginRVO.Status?.code === 200) {
            if (loginRVO.rvo?.result === '1') {
                // 로그인 성공
                this.loginResult = true
                this.nickname = loginRVO.rvo?.nickname === 'undefined' ? '' : loginRVO.rvo?.nickname
            } else {
                this.loginResult = false
            }
        } else {
            this.loginResult = false
        }
    }

    @Mutation
    setCounts(countRVO: CountRVO) {
        this.count = countRVO.count === undefined ? '' : countRVO.count
    }

    @Mutation
    setLoginId(id: string) {
        this.loginId = id
    }

    @Mutation
    setNickname(nickname?: string) {
        this.nickname = nickname
    }
}

export const LoginModule = getModule(LoginStore)
