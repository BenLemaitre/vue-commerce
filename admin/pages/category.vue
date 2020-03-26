<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a Category</h2>
            <form>
              <!-- Type input -->
              <div class="a-spacing-top-medium">
                <label>Type</label>
                <input
                  style="width: 100%"
                  type="text"
                  class="a-input-text"
                  v-model="type"
                />
              </div>
              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddCategory"
                      >Add Category</span
                    >
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="category in categories"
                :key="category._id"
              >
                {{ category.type }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/categories");

      return {
        categories: response.categories
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    async onAddCategory() {
      try {
        let data = { type: this.type };

        let response = await this.$axios.$post("/api/categories", data);

        if (response) {
          this.categories.push(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
