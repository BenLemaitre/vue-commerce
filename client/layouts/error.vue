<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <h1>Sorry !</h1>
        <h2 v-if="error.statusCode === 404">We couldn't find that page</h2>
        <h2 v-else>An error occurred</h2>
        <h3>
          Try searching or go to our
          <nuxt-link to="/">home page</nuxt-link>
        </h3>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "no-footer" // set a custom layout for the error page
};
</script>