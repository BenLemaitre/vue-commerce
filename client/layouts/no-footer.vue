<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/navbar";

export default {
  components: {
    Navbar
  }
};
</script>

<style>
body {
  font-size: 13px;
  line-height: 19px;
  color: #111;
}
</style>
