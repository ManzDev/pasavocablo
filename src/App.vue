<script>
import CircleData from "@/assets/CircleData.json";
import TimeCounter from "@/components/TimeCounter.vue";
import WordCounter from "@/components/WordCounter.vue";
import LetterCircle from "@/components/LetterCircle.vue";
import { Howl } from "howler";

const MAX_QUESTION_LENGTH = 154;

// phase = 0 (no ha empezado el juego)
// phase = 1 (ha empezado el juego)
// phase = 2 (ha terminado el juego)

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
      phase: 0,
      words: CircleData.words,
      currentQuestionIndex: 0,
      totalSolvedWords: 0,
      totalFailedWords: 0,
      totalTimeLeft: CircleData.time,
      percentTimeElapsed: 0,
      sound: new Howl({ src: ["sounds/ticktock.ogg"], loop: true })
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
    startGame() {
      this.phase = 1;
      setInterval(() => this.nextTick(), 1000);
      this.playSound();
    },
    checkSolution() {
      alert()
    },
    nextTick() {
      if (this.phase === 1) {
        this.totalTimeLeft--;
        this.percentTimeElapsed = 100 - ((this.totalTimeLeft * 100) / CircleData.time);
        this.$el.style.setProperty("--current-time", this.percentTimeElapsed + "%")
      }

      if (this.totalTimeLeft === 0) {
        this.phase = 2;
        this.stopSound();
      }
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
      if (this.phase !== 1)
        return;
      this.words[this.currentQuestionIndex].status = "skipped";
      this.nextQuestion();
      this.words[this.currentQuestionIndex].status = "active";
    },
    nextQuestion() {
      // totalFailedWords + totalSolvedWords === words.length --> juego terminado
      do {
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.words.length;
      } while (this.isAnswered(this.currentQuestionIndex));
    },
    playSound() {
      this.sound.play();
    },
    stopSound() {
      this.sound.stop();
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
        <input type="text" @keydown.enter="checkSolution">
        <p>{{ currentQuestion }}</p>
      </div>
    </div>
    <div class="right">
      <button @click="startGame">Empezar juego</button>
      <button class="skip" @click="skipQuestion" :disabled="phase != 1">Pasa Vocablo</button>
    </div>
  </div>
</template>

<style src="./App.css"></style>
