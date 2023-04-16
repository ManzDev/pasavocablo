<script>
import CircleData from "@/assets/CircleData.json";
import TimeCounter from "@/components/TimeCounter.vue";
import WordCounter from "@/components/WordCounter.vue";
import LetterCircle from "@/components/LetterCircle.vue";

const MAX_QUESTION_LENGTH = 154;

export default {
  name: "App",
  components: {
    LetterCircle,
    WordCounter,
    TimeCounter
  },
  mounted() {
    this.initQuestions();
    this.organizeCircle();
  },
  data() {
    return {
      words: CircleData.words,
      currentQuestionIndex: 0,
      totalSolvedWords: 0,
      totalFailedWords: 0,
      totalTimeLeft: CircleData.time
    }
  },
  computed: {
    currentQuestion() {
      const prefix = this.words[this.currentQuestionIndex].start ? "Con la " : "Contiene la ";
      const letter = this.words[this.currentQuestionIndex].letter
      return prefix + letter + ": " + this.words[this.currentQuestionIndex].question
    },
  },
  methods: {
    initQuestions() {
      this.words.forEach(word => (word.status = "unsolved"));
      const longQuestions = this.words.filter(word => (word.question.length > MAX_QUESTION_LENGTH));
      console.log(longQuestions);
      this.words[0].status = "active";
    },
    isAnswered(index) {
      const isSolved = this.words[index].status === "solved";
      const isFailed = this.words[index].status === "failed";
      return isSolved || isFailed;
    },
    organizeCircle() {
      const circle = this.$el.querySelector(".word-circle");
      const letters = this.$el.querySelectorAll(".center .circle");
      const radius = (circle.offsetWidth / 2) - 45;
      const angle = (2 * Math.PI) / letters.length;
      for (let i = 0; i < letters.length; i++) {
        const x = radius * Math.cos(angle * i - Math.PI / 2);
        const y = radius * Math.sin(angle * i - Math.PI / 2);
        letters[i].style.transform = `translate(${x}px, ${y}px)`;
      }
    },
    skipQuestion() {
      this.words[this.currentQuestionIndex].status = "skipped";
      this.nextQuestion();
      this.words[this.currentQuestionIndex].status = "active";
    },
    nextQuestion() {
      // totalFailedWords + totalSolvedWords === words.length --> juego terminado
      do {
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.words.length;
      } while (this.isAnswered(this.currentQuestionIndex));
    }
  }
}
</script>

<template>
  <div class="app">
    <div class="left">
      <TimeCounter :current="totalTimeLeft" />
      <WordCounter :total="totalSolvedWords" />
    </div>
    <div class="center">
      <h1>PasaVocablo</h1>
      <div class="word-circle">
        <LetterCircle v-for="(word, index) in words"
            :class="currentQuestionIndex === index && `current`"
            :key="word.letter"
            :status="word.status"
            :letter="word.letter" />
      </div>
      <div class="text-dialog">
        <input type="text">
        <p>{{ currentQuestion }}</p>
      </div>
    </div>
    <div class="right">
      <button>Empezar juego</button>
      <button @click="skipQuestion">Pasa Vocablo</button>
    </div>
  </div>
</template>

<style src="./App.css"></style>
