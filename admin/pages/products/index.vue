<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a Product</h2>
            <form>
              <!-- Category dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryId">
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                    >{{ category.type }}</option
                  >
                </select>
              </div>
              <!-- Owner dropdown -->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerId">
                  <option
                    v-for="owner in owners"
                    :key="owner._id"
                    :value="owner._id"
                    >{{ owner.name }}</option
                  >
                </select>
              </div>
              <!-- Title input -->
              <div class="a-spacing-top-medium">
                <label>Title</label>
                <input
                  style="width: 100%"
                  type="text"
                  class="a-input-text"
                  v-model="title"
                />
              </div>
              <!-- Price input -->
              <div class="a-spacing-top-medium">
                <label>Price</label>
                <input
                  style="width: 100%"
                  type="number"
                  class="a-input-text"
                  v-model="price"
                />
              </div>
              <!-- Stock Quantity input -->
              <div class="a-spacing-top-medium">
                <label>Stock Quantity</label>
                <input
                  style="width: 100%"
                  type="number"
                  class="a-input-text"
                  v-model="stockQuantity"
                />
              </div>
              <!-- Description text area -->
              <div class="a-spacing-top-medium">
                <label>Description</label>
                <textarea
                  placeholder="Provide details about the product"
                  style="width: 100%"
                  v-model="description"
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
                    <span class="a-button-text" @click="onAddProduct"
                      >Add Product</span
                    >
                  </span>
                </span>
              </div>
            </form>
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
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");

      const [catResponse, ownerResponse] = await Promise.all([
        categories,
        owners
      ]);

      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners
      };
    } catch (err) {}
  },
  data() {
    return {
      categoryId: null,
      ownerId: null,
      title: "",
      price: 0,
      description: "",
      selectedFile: null,
      filename: "",
      stockQuantity: 1
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.filename = event.target.files[0].name;
    },
    async onAddProduct() {
      try {
        let data = new FormData();
        data.append("title", this.title);
        data.append("price", this.price);
        data.append("description", this.description);
        data.append("stockQuantity", this.stockQuantity);
        data.append("ownerId", this.ownerId);
        data.append("categoryId", this.categoryId);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let response = await this.$axios.$post(
          "http://localhost:3000/api/products",
          data
        );

        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
