import store from '@/stores/index'

import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import RestSample, { LoginPVO, RegistNicknamePVO, LoginRVO, RegistNicknameRVO, CountRVO, GetQuestionListPVO, GetQuestionListRVO, QuestionVO } from '@/services/main/restSample'

@Module({ dynamic: true, name: 'mainStore', namespaced: true, store })
export default class MainStore extends VuexModule {
    private restSample = new RestSample()
    loginResult = false
    nickname? = ''
    loginId = ''
    count = ''

    questionList: QuestionVO[] = []

    @Action({ commit: 'setLoginInfos', rawError: true })
    async chkLogin(pvo: LoginPVO) {
        return await this.restSample.login(pvo) // 여긴 서버 API 통신 함수 호출
    }

    @Action({ commit: 'setCounts', rawError: true })
    async getCount() {
        return await this.restSample.getCount() // 여긴 서버 API 통신 함수 호출
    }

    @Action({ commit: 'setNicknameInfos', rawError: true })
    async registNickname(pvo: RegistNicknamePVO) {
        return await this.restSample.registNickname(pvo) // 여긴 서버 API 통신 함수 호출
    }

    @Action({ commit: 'getQuestionListInfos', rawError: true })
    async getQuestionList(pvo: GetQuestionListPVO) {
        return await this.restSample.getQuestionList(pvo)
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
        }
    }

    @Mutation
    setNicknameInfos(registNicknameRVO: RegistNicknameRVO) {
        if (registNicknameRVO.Status?.code === 200) {
            this.nickname = registNicknameRVO.nickname === 'undefined' ? '' : registNicknameRVO.nickname
        } else {
            this.nickname = ''
        }
    }

    @Mutation
    getQuestionListInfos(rvo: GetQuestionListRVO) {
        if (rvo.Status?.code === 200) {
            this.questionList = rvo.questionList
        }
        else {
            console.log(`getQuestionList API RESULT :: ${rvo.Status.code}`)
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
}

export const MainModule = getModule(MainStore)
