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

  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 3.25rem;
  text-shadow: 2px 2px 5px #0008;
  color: #fff;
  background: linear-gradient(#f76c00, #f54500);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: 15px solid #fff;
  display: grid;
  place-items: center;
  user-select: none;
  position: static;
}
</style>
