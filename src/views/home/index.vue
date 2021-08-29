<template>
    <div>
        <h1>QUESTION</h1>
        <br /><br />
        <h3>문제 수 : {{ questionSize }}</h3>
        <br />
        <button @click="getQuestion">문제 하나 뽑기</button><br /><br />
        <h3>문제 유형 : {{ getType }}</h3>
        <h3>문제 풀이 상태 : {{ getState }}</h3>
        <br /><br /><br /><br />
        <h2>~ 문제 ~</h2>
        <br />
        <h3>{{ this.getNowQuestion.problemName }}</h3>
        <br />
        <button @click="showAnswer">정답 펼치기/숨기기</button><br />
        <h3 v-show="this.isShowAnswer">{{ this.answer }}</h3>
        <br />
        <input v-model="newQuestion.type" type="text" placeholder="문제 유형 입력(1: 기술, 2: 인성)" /><br />
        <input v-model="newQuestion.problemName" type="text" placeholder="문제 내용" /><br />
        <input v-model="newQuestion.answer" type="text" placeholder="문제 정답(입력안해도됨)" /><br />
        <button @click="addQuestion" :disabled="!isChanged">문제 추가하기</button><br /><br />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LoginModule } from '@/stores/modules/main/login'
import { QuestionVO, AddQuestionPVO, GetQuestionListPVO } from '@/services/main/login'

@Component
export default class Home extends Vue {
    type = -1
    state = -1
    nowQuestion: QuestionVO = {
        type: this.type,
        problemName: '',
        state: this.state,
    }
    questionList: QuestionVO[] = []
    newQuestion: AddQuestionPVO = {
        type: 1,
        problemName: '',
        state: 0,
    }

    isAdded = false
    isShowAnswer = false

    created() {
        console.log('11')
        this.getProblemList()
    }

    get isChanged() {
        return this.newQuestion.problemName !== '' && !this.isAdded
    }

    get getNowQuestion() {
        return this.nowQuestion
    }

    get answer() {
        return this.nowQuestion.answer ? this.nowQuestion.answer : '정답 미입력!'
    }

    get getType() {
        return this.getNowQuestion.type == 1 ? '기술' : this.getNowQuestion.type == 2 ? '인성' : '?'
    }

    get getState() {
        switch (this.getNowQuestion.state) {
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
            state: this.state,
        }
        await LoginModule.getQuestionList(pvo)
        this.questionList = LoginModule.questionList
        // this.loginResultMsg = this.loginResult ? '로그인 성공' : '로그인 실패'
    }

    showAnswer() {
        this.isShowAnswer = !this.isShowAnswer
    }

    getQuestion() {
        const index = this.getRandomInt(0, this.questionSize)
        this.nowQuestion = this.questionList[index]
        this.isShowAnswer = false
    }

    async addQuestion() {
        const status = await LoginModule.addQuestion(this.newQuestion)
        if (status.Status?.code == 200) {
            this.isAdded = true
            alert('문제등록 성공! 새로고침 후 새로운 문제를 등록할 수 있습니다.')
            this.getProblemList()
        } else {
            alert('문제등록 실패!')
        }
    }

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min //최댓값은 제외, 최솟값은 포함
    }
}
</script>
