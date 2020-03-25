<template>
  <div>
    <h1>{{ name }}</h1>
    <input type="text" v-model="name" />
    <button @click="onClick">Click</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "About me"
    };
  },
  methods: {
    onClick() {
      alert(this.name);
    }
  }
};
</script>

<style>
</style>