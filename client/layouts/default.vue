<template>
  <div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

export default {
  components: {
    Navbar,
    Footer
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
