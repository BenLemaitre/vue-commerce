<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Profile Page</h2>
            <a href="#" @click="onLogout">Logout</a>
            <form>
              <!-- Name -->
              <div class="a-spacing-top-medium">
                <label>Name</label>
                <input style="width: 100%" type="text" class="a-input-text" v-model="name" />
              </div>
              <!-- Email -->
              <div class="a-spacing-top-medium">
                <label>Email</label>
                <input style="width: 100%" type="text" class="a-input-text" v-model="email" />
              </div>
              <!-- Password -->
              <div class="a-spacing-top-medium">
                <label>Password</label>
                <input style="width: 100%" type="text" class="a-input-text" v-model="password" />
              </div>

              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onUpdateProfile">Update Profile</span>
                  </span>
                </span>
              </div>
            </form>
            <br />
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      oldEmail: ""
    };
  },
  mounted() {
    this.name = this.$auth.$state.user.name;
    this.email = this.$auth.$state.user.email;
    this.oldEmail = this.$auth.$state.user.email;
  },
  methods: {
    async onUpdateProfile() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          oldEmail: this.oldEmail
        };

        let response = await this.$axios.$put("/api/auth/update", data);

        if (response.success) {
          await this.$auth.fetchUser();

          this.name = this.$auth.$state.user.name;
          this.email = this.$auth.$state.user.email;
          this.oldEmail = this.$auth.$state.user.email;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onLogout() {
      await this.$auth.logout();
    }
  }
};
</script>
