<script>
export default {
  name: "WordCounter",
  props: {
    total: { type: Number }
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
  <div class="circle">{{ total }}</div>
</template>

<style scoped>
.circle {
  --size: 65px;

  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  text-shadow: 2px 2px 5px #0008;
  color: #fff;
  background: #00c13b;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: 4px solid #fff;
  display: grid;
  place-items: center;
  user-select: none;
  transform: translate(120px);
}
</style>
