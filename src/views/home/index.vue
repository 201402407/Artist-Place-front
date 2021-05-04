<template>
    <div>
        <h1>HOME</h1>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class Home extends Vue {
    private testNum = 0
    private testName = ""
    private result = {}

    private pvo: Object = {
        id: "test",
        hashPwd: "test",
    }
}
</script>
