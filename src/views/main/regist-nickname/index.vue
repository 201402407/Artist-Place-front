<!-- 닉네임 생성 화면-->
<template>
    <div>
        <input v-model="pvo.nickname" type="text" placeholder="닉네임 입력" /><br />
        <button @click="clickRegistNickname">닉네임 생성</button><br /><br />
        <h1>{{ loginResultMsg }}</h1>
        <br /><br />
    </div>
</template>

<script lang="ts">
import { MainModule } from '@/stores/modules/main/index'
import { Vue, Component } from 'vue-property-decorator'
import { RegistNicknamePVO } from '@/services/main/restSample'

@Component
export default class RegistNickname extends Vue {
    private pvo: RegistNicknamePVO = {
        emailId: '',
        nickname: '',
    }

    get nickname() {
        return MainModule.nickname
    }

    async clickRegistNickname() {
        await MainModule.registNickname(this.pvo)
        // this.loginResultMsg = this.loginResult ? '로그인 성공' : '로그인 실패'
    }
}
</script>
