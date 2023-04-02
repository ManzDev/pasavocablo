<script>
const COLORS = {
  "unsolved": "#0061f0",
  "solved": "#00c13b",
  "failed": "#e52228",
  "skipped": "#0061f0"
};

export default {
  name: "LetterCircle",
  props: {
    letter: { type: String },
    status: { type: String }
  },
  mounted() {
  },
  data() {
    return {
    }
  },
  computed: {
    color() {
      return COLORS[this.status];
    }
  },
  methods: {
  }
}
</script>

<template>
  <div class="circle">{{ letter }}</div>
</template>

<style>
.circle {
  --size: 55px;

  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 2.3rem;
  text-shadow: 2px 2px 5px #0008;
  color: #fff;
  background: v-bind(color);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: 2px solid #fff;
  display: grid;
  place-items: center;
  user-select: none;
  position: absolute;
}
</style>
