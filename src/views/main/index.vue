<template>
    <div>
        <h1>{{ result }}</h1>
        <button @click="clickBtn">버튼클릭하래</button><br />
        <button @click="clickBtn2">getCount</button><br />
        <h2>{{ count }}</h2>
    </div>
</template>

<script lang="ts">
import { MainModule } from "@/stores/modules/main/index"
import RestSample, { LoginPVO } from "@/services/main/restSample"
import { Vue, Component } from "vue-property-decorator"

@Component
export default class Main extends Vue {
    private testNum = 0
    private testName = ""
    private count = 0
    private result = {}
    private restSample = new RestSample()

    private pvo: LoginPVO = {
        id: "test",
        hashPwd: "test",
    }

    async clickBtn() {
        const rvo = await MainModule.chkLogin(this.pvo)
        console.log(rvo)
    }

    async clickBtn2() {
        const rvo = await MainModule.getCount()
        console.log(rvo)
        this.count = rvo.data.count
    }
}
</script>
