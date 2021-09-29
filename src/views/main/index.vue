<!-- 메인화면 -->
<template>
    <div>
        <input v-model="pvo.emailId" type="text" placeholder="ID 입력" /><br />
        <input v-model="pwdInput" type="password" placeholder="PWD 입력" @keyup.enter="clickLogin" /><br />
        <button @click="clickLogin">로그인</button><br /><br />
        <h1>{{ loginResultMsg }}</h1>
        <br /><br />
        <button @click="clickNicknameBtn" v-show="this.checkMyNicknameResult">
            닉네임 생성하기</button
        ><br />
        <button @click="clickBtn2">getCount 서버 연결 테스트</button><br />
        <h2>{{ count }}</h2>
    </div>
</template>

<script lang="ts">
import { LoginModule } from '@/stores/modules/main/login'
import { LoginPVO } from '@/services/main/login'
import { Vue, Component } from 'vue-property-decorator'
import { EnvUtils } from '@/utils/envUtils'
import axios from 'axios'

@Component
export default class Main extends Vue {
    private count = ''
    private pwdInput = ''
    private loginResultMsg = ''
    private pvo: LoginPVO = {
        emailId: '',
        pwd: '',
    }

    async mounted() {
        // const result = await new LoginService().temp()
        // console.log(result)
        axios
            .get('https://d3sfvyfh4b9elq.cloudfront.net/pmt/web/device.json')
            .then((res) => {
                const a = res.data
                console.log(a)
            })
            .catch((e) => {})
    }

    get countResult() {
        return LoginModule.count
    }

    get loginResult() {
        return LoginModule.loginResult
    }

    get nickname() {
        return LoginModule.nickname
    }

    async clickLogin() {
        this.pvo.pwd = EnvUtils.hashing(this.pwdInput)
        await LoginModule.chkLogin(this.pvo)
        this.loginResultMsg = this.loginResult ? '로그인 성공' : '로그인 실패'
        if (this.loginResult) {
            LoginModule.setLoginId(this.pvo.emailId)
        }

        this.pwdInput = ''
    }

    get checkMyNicknameResult() {
        return (this.nickname === '' || !this.nickname) && this.loginResultMsg != ''
    }

    // 닉네임 생성 화면으로 이동
    clickNicknameBtn() {
        this.$router.push({ name: 'regist-nickname' })
        this.$router.push('/main/regist-nickname')
    }

    async clickBtn2() {
        await LoginModule.getCount()
        console.log(this.countResult)
        this.count = this.countResult === undefined ? '' : this.countResult
    }
}
</script>
