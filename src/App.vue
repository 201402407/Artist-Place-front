<template>
    <div id="app">
        <router-view> </router-view>
        <router-link to="/">home</router-link><br />
        <router-link to="/main">mainpage</router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class App extends Vue {
    private temp = "temp"

    clickMainBtn() {
        this.$router.push("/main")
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
