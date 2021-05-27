<!-- 닉네임 생성 화면-->
<template>
    <div>
        <input v-model="pvo.nickname" type="text" placeholder="닉네임 입력" /><br />
        <button @click="clickRegistNickname">닉네임 생성</button><br /><br />
        <!-- <h1>{{ loginResultMsg }}</h1> -->
        <br /><br />
    </div>
</template>

<script lang="ts">
import { NicknameModule } from '@/stores/modules/main/nickname'
import { LoginModule } from '@/stores/modules/main/login'
import { Vue, Component } from 'vue-property-decorator'
import { RegistNicknamePVO } from '@/services/main/nickname'

@Component
export default class RegistNickname extends Vue {
    private pvo: RegistNicknamePVO = {
        emailId: LoginModule.loginId,
        nickname: '',
    }

    get nickname() {
        return NicknameModule.nickname
    }

    async clickRegistNickname() {
        await NicknameModule.registNickname(this.pvo)
        if (NicknameModule.status.code === 200) {
            LoginModule.setNickname(NicknameModule.nickname)
        }
    }
}
</script>
