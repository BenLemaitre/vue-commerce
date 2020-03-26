<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a new Owner</h2>
            <form>
              <!-- Name input -->
              <div class="a-spacing-top-medium">
                <label>Name</label>
                <input
                  style="width: 100%"
                  type="text"
                  class="a-input-text"
                  v-model="name"
                />
              </div>
              <!-- about input -->
              <div class="a-spacing-top-medium">
                <label>About</label>
                <input
                  style="width: 100%"
                  type="text"
                  class="a-input-text"
                  v-model="about"
                />
              </div>
              <!-- Photo uploader -->
              <div class="a-spacing-top-medium">
                <label>Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected" />
                    <p style="margin-top: -70px">{{ filename }}</p>
                  </label>
                </div>
              </div>
              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddOwner"
                      >Add Owner</span
                    >
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="owner in owners"
                :key="owner._id"
              >
                {{ owner.name }}
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
      let response = await $axios.$get("/api/owners");

      return {
        owners: response.owners
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      about: "",
      filename: "",
      selectedFile: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.filename = event.target.files[0].name;
    },
    async onAddOwner() {
      try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let response = await this.$axios.$post("/api/owners", data);

        this.owners.push({ name: this.name });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
