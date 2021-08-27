import store from '@/stores/index'

import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import LoginService, { LoginPVO, LoginRVO, CountRVO, QuestionVO, GetQuestionListPVO, AddQuestionPVO, GetQuestionListRVO } from '@/services/main/login'

@Module({ dynamic: true, name: 'loginStore', namespaced: true, store })
export default class LoginStore extends VuexModule {
    loginResult = false
    nickname? = ''
    loginId = ''
    count = ''

    questionList: QuestionVO[] = []

    @Action({ commit: 'setLoginInfos', rawError: true })
    async chkLogin(pvo: LoginPVO) {
        return await new LoginService().login(pvo) // 여긴 서버 API 통신 함수 호출
    }

    @Action({ commit: 'setCounts', rawError: true })
    async getCount() {
        return await new LoginService().getCount() // 여긴 서버 API 통신 함수 호출
    }

    @Action({ commit: 'getQuestionListInfos', rawError: true })
    async getQuestionList(pvo: GetQuestionListPVO) {
        return await new LoginService().getQuestionList(pvo)
    }

    @Action
    async addQuestion(pvo: AddQuestionPVO) {
        return await new LoginService().addQuestion(pvo)
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
    getQuestionListInfos(rvo: GetQuestionListRVO) {
        if (rvo.Status?.code === 200) {
            this.questionList = rvo.questionList
        } else {
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

    @Mutation
    setNickname(nickname?: string) {
        this.nickname = nickname
    }
}

export const LoginModule = getModule(LoginStore)
