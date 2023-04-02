<script>
import CircleData from "@/assets/CircleData.json";
import TimeCounter from "@/components/TimeCounter.vue";
import WordCounter from "@/components/WordCounter.vue";
import LetterCircle from "@/components/LetterCircle.vue";
export default {
  name: "App",
  components: {
    LetterCircle,
    WordCounter,
    TimeCounter
  },
  mounted() {
    this.organizeCircle();
  },
  data() {
    return {
      words: CircleData.words,
      currentQuestionIndex: 0,
      totalSolvedWords: 0,
      totalTimeLeft: CircleData.time
    }
  },
  computed: {
    currentQuestion() {
      const prefix = this.words[this.currentQuestionIndex].start ? "Con la " : "Contiene la ";
      const letter = this.words[this.currentQuestionIndex].letter
      return prefix + letter + ": " + this.words[this.currentQuestionIndex].question
    }
  },
  methods: {
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
            :status="`unsolved`"
            :letter="word.letter" />
      </div>
      <div class="text-dialog">
        <p>{{ currentQuestion }}</p>
        <input type="text">
      </div>
    </div>
    <div class="right">
      <button>Empezar juego</button>
      <button>Pasa Vocablo</button>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&family=Tilt+Warp&display=swap');

  body {
    margin: 0;
  }

  h1 {
    font-family: "Tilt Warp", fantasy;

    font-size: 3rem;
    margin: 0.75rem;
    text-align: center;
    color: #fff;
  }

  .app {
    max-width: 1280px;
    margin: auto;
    display: grid;
    grid-template-columns: 320px 640px 320px;
    grid-template-rows: 100vh;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin-bottom: 8rem;
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .word-circle {
    --size: 640px;

    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-dialog {
    font-family: "Quicksand", sans-serif;
    font-size: 1.75rem;
    color: #fff;
  }

  .text-dialog input {
    font-family: "Quicksand", sans-serif;
    font-size: 1.25rem;
    border: 2px solid #fff7;
    padding: 8px;
    background: #fff2;
    border-radius: 5px;
    width: 100%;
    color: gold;
  }

  .right {
    align-self: start;
    justify-self: center;
    margin-bottom: 8em;
  }

  .right button:last-child {
    position: absolute;
    bottom: 60px;
    filter: hue-rotate(140deg);
  }

  button {
    --gradient-color: linear-gradient(#0863a5, #1283d1);

    display: flex;
    justify-content: center;
    width: 150px;
    padding: 1rem;
    margin: 1rem;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    border: 0;
    border-radius: 10px;
    color: #eee;
    background: var(--gradient-color);
    box-shadow:
      0 7px 0 #0b5a92,
      0 8px 3px #0000004d;
    transition: all 0.15s;
    text-decoration: none;
  }

  button:active {
    color: #888;
    background: linear-gradient(to bottom, #0006, #0008), var(--gradient-color);
    transform: translateY(5px);
    box-shadow: 0 2px 0 #0b5a92,0 3px 3px #0000004d;
  }
</style>
