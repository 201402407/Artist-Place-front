import store from "@/stores/index"

import {
    getModule,
    Module,
    VuexModule,
    Mutation,
    Action,
} from "vuex-module-decorators"
import RestSample, { LoginPVO, LoginRVO } from "@/services/main/restSample"
import { AxiosResponse } from "axios"

@Module({ dynamic: true, name: "mainStore", namespaced: true, store })
export default class MainStore extends VuexModule {
    private restSample = new RestSample()
    public loginResult = false
    public loginId = ""

    // 서비스 또는 작업 수행(서버 연동)
    @Action
    async chkLogin(pvo: LoginPVO) {
        return await this.restSample.login(pvo) // 여긴 서버 API 통신 함수 호출
    }

    // 서비스 또는 작업 수행(서버 연동)
    @Action
    async getCount() {
        return await this.restSample.getCount() // 여긴 서버 API 통신 함수 호출
    }

    @Mutation
    setLoginInfos(loginPVO: LoginPVO) {
        this.loginId = loginPVO.id
    }

    get getLoginId() {
        return this.loginId
    }
}

export const MainModule = getModule(MainStore)
