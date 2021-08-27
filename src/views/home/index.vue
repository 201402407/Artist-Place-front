<template>
    <div>
        <h1>QUESTION</h1><br><br>
        <h3>문제 수 : {{ questionSize }}</h3><br><br>
        <button @click="getQuestion">문제 하나 뽑기</button><br /><br />
        <h3>문제 유형 : {{ getType }} </h3><h3>문제 풀이 상태 : {{ getState }} </h3><br /><br /><br /><br />
        <h2>~ 문제 ~</h2><br />
        <h3>{{ this.getNowQuestion.problemName }}</h3>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { MainModule } from '@/stores/modules/main/index'
import { GetQuestionListPVO, QuestionVO } from '@/services/main/restSample'
 
@Component
export default class Home extends Vue {
    type = -1
    state = -1
    nowQuestion: QuestionVO = {
        type: this.type,
        problemName: '',
        state: this.state
    }
    questionList: QuestionVO[] = []

    created() {
        this.getProblemList()
    }

    get getNowQuestion() {
        return this.nowQuestion   
    }

    get getType() {
        return this.getNowQuestion.type == 1 ? '기술' : (this.getNowQuestion.type == 2 ? '인성' : '?')
    }

    get getState() {
        switch(this.getNowQuestion.state) {
            case 0:
                return '풀지 못함'
            case 1:
                return '풀었음'
            case 2:
                return '푸는 중'
            default:
                return '?'
            }
    }

    get questionSize() {
        return this.questionList.length    
    }

    async getProblemList() {
        const pvo: GetQuestionListPVO = {
            type: this.type,
            state: this.state
        }
        await MainModule.getQuestionList(pvo)
        this.questionList = MainModule.questionList
        // this.loginResultMsg = this.loginResult ? '로그인 성공' : '로그인 실패'
    }

    getQuestion() {
        const index = this.getRandomInt(0, this.questionSize)
        this.nowQuestion = this.questionList[index]
    }

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }   
}
</script>
