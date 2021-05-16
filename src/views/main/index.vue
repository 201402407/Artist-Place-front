<template>
  <div>
    <h1>{{ result }}</h1>
    <input v-model="pvo.emailId" type="text" placeholder="ID 입력" /><br />
    <input v-model="pwdInput" type="password" placeholder="PWD 입력" /><br />
    <button @click="clickBtn">버튼클릭하래</button><br />
    <button @click="clickBtn2">getCount</button><br />
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
  private testNum = 0
  private testName = ""
  private count = 0
  private pwdInput = ""
  private result = {}
  private restSample = new RestSample()
  private pvo: LoginPVO = {
    emailId: "",
    pwd: "",
  }

  async clickBtn() {
    this.pvo.pwd = this.hashing(this.pwdInput)
    const rvo = await MainModule.chkLogin(this.pvo)
    console.log(rvo)
  }

  private hashing(str: string) {
    return CryptoJS.SHA256(str).toString()
  }

  async clickBtn2() {
    const rvo = await MainModule.getCount()
    console.log(rvo)
    this.count = rvo.data.count
  }
}
</script>
