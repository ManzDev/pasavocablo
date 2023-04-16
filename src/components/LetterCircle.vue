<script>
const COLORS = {
  "active": "#4ca9ff",      // active + unsolved
  "unsolved": "#0061f0",
  "solved": "#00c13b",
  "failed": "#e52228",
  "skipped": "orangered"    // unsolved + skipped
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
    },
    glow() {
      return this.status === "active" ? "0 0 8px 1px #4ca9ff" : "none";
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
  box-shadow: v-bind(glow);
}
</style>
