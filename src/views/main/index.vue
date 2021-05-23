<!-- 메인화면 -->
<template>
    <div>
        <input v-model="pvo.emailId" type="text" placeholder="ID 입력" /><br />
        <input v-model="pwdInput" type="password" placeholder="PWD 입력" /><br />
        <button @click="clickLogin" @keyup.enter="clickLogin">로그인</button><br /><br />
        <h1>{{ loginResultMsg }}</h1>
        <br /><br />
        <button @click="clickNicknameBtn" v-show="this.checkMyNicknameResult">닉네임 생성하기</button><br />
        <button @click="clickBtn2">getCount 서버 연결 테스트</button><br />
        <h2>{{ count }}</h2>
    </div>
</template>

<script lang="ts">
import { MainModule } from '@/stores/modules/main/index'
import { LoginPVO } from '@/services/main/restSample'
import { Vue, Component } from 'vue-property-decorator'
import { EnvUtils } from '@/utils/envUtils'

@Component
export default class Main extends Vue {
    private count = ''
    private pwdInput = ''
    private loginResultMsg = ''
    private pvo: LoginPVO = {
        emailId: '',
        pwd: '',
    }

    get countResult() {
        return MainModule.count
    }

    get loginResult() {
        return MainModule.loginResult
    }

    get checkMyNicknameResult() {
        return (this.nickname === 'undefined' || this.nickname === '') && this.loginResultMsg != ''
    }

    get nickname() {
        return MainModule.nickname
    }

    async clickLogin() {
        this.pvo.pwd = EnvUtils.hashing(this.pwdInput)
        await MainModule.chkLogin(this.pvo)
        this.loginResultMsg = this.loginResult ? '로그인 성공' : '로그인 실패'
        if (this.loginResult) {
            MainModule.setLoginId(this.pvo.emailId)
        }
    }

    // 닉네임 생성 화면으로 이동
    clickNicknameBtn() {
        this.$router.push('/main/regist-nickname')
    }

    async clickBtn2() {
        await MainModule.getCount()
        console.log(this.countResult)
        this.count = this.countResult === undefined ? '' : this.countResult
    }
}
</script>
