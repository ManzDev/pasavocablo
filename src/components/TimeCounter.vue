<script>
export default {
  name: "TimeCounter",
  props: {
    current: { type: Number }
  },
  mounted() {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<template>
  <div class="circle">{{ current }}</div>
</template>

<style scoped>
.circle {
  --size: 125px;
  --current-stop-time: var(--current-time);

  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 3.25rem;
  text-shadow: 2px 2px 5px #0008;
  color: #fff;
  background-image:
    conic-gradient(
      #b61c14 0 var(--current-time),
      transparent var(--current-stop-time));
  background-color: #505050;
  transition: --current-time 1s linear;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: 15px solid #fff;
  display: grid;
  place-items: center;
  user-select: none;
  position: static;
}

@property --current-time {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 0%;
}
</style>
