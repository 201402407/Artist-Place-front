<template>
  <div>
    <h1>{{ result }}</h1>
    <input v-model="pvo.emailId" type="text" placeholder="ID 입력" /><br />
    <input v-model="pwdInput" type="password" placeholder="PWD 입력" /><br />
    <button @click="clickLogin" @keyup.enter="clickLogin">로그인</button
    ><br /><br />
    <button @click="clickBtn2">getCount 서버 연결 테스트</button><br />
    <h2>{{ count }}</h2>
  </div>
</template>

<script lang="ts">
import { MainModule } from "@/stores/modules/main/index"
import RestSample, { LoginPVO } from "@/services/main/restSample"
import { Vue, Component } from "vue-property-decorator"
import CryptoJS from "crypto-js"

@Component
export default class Main extends Vue {
  private count = ""
  private pwdInput = ""
  private pvo: LoginPVO = {
    emailId: "",
    pwd: "",
  }

  async clickLogin() {
    this.pvo.pwd = this.hashing(this.pwdInput)
    await MainModule.chkLogin(this.pvo)
    if (MainModule.loginResult) {
      alert("로그인 성공!")
    } else {
      alert("로그인 실패!")
    }
  }

  private hashing(str: string) {
    return CryptoJS.SHA256(str).toString()
  }

  async clickBtn2() {
    const rvo = await MainModule.getCount()
    console.log(rvo)
    this.count = rvo.data.count === undefined ? "" : rvo.data.count
  }
}
</script>
