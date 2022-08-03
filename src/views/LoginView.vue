<template>
  <b-container fluid class="h-100">
    <b-row class="h-100 bg-primary justify-content-center" align-v="center">
      <b-col class="h-fitc" col sm="10" md="8" lg="6" xl="4">
        <b-card id="cardLogin">
          <b-card-body>
            <b-container fluid>
              <b-row class="justify-content-start mb-4 pr-3">
                <b-col cols="auto">
                  <!--ENV-->
                  <img
                    src="https://uploads-ssl.webflow.com/60ad08a30391b132d2353be0/60b7723caeacc9575ca744a2_pulpo-logo-blue.svg"
                    alt="ciaIcon"
                    width="120"
                    height="auto"
                  />
                </b-col>
                <b-col cols="auto" v-if="errorText != '' && errorText">
                  <!--ENV-->
                  <span></span>
                </b-col>
              </b-row>
              <b-row class="justify-content-arround mb-3" align-v="center">
                <b-col cols="3">
                  <label class="m-0 bold">Username</label>
                </b-col>
                <b-col cols="8">
                  <InputRules
                    :text="username"
                    type="text"
                    @update:text="username = $event"
                    placeholder="E.g.: kittymurder01"
                  />
                </b-col>
              </b-row>
              <b-row class="justify-content-arround mb-3" align-v="center">
                <b-col cols="3">
                  <label class="m-0 bold">Password</label>
                </b-col>
                <b-col cols="8">
                  <InputRules
                    :text="password"
                    :type="passwordType"
                    @update:text="password = $event"
                    placeholder="E.g.: 1234pass"
                  >
                    <div class="input-group-append" @click="showPwd">
                      <b-button class="input-group-text" variant="primary"
                        ><b-icon-eye-fill
                          v-if="passwordType == 'password'"
                        ></b-icon-eye-fill>
                        <b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill
                      ></b-button>
                    </div>
                  </InputRules>
                </b-col>
              </b-row>
              <b-row class="justify-content-end pr-5 mt-5" align-v="center">
                <b-col cols="auto" class="h-fitc">
                  <a href="#">forgot password?</a>
                </b-col>
                <b-col cols="auto">
                  <b-button variant="primary" class="bold" @click="login()"
                    >Login</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import InputRules from "../components/Inputs/InputRules.vue";
export default {
  components: {
    InputRules,
  },
  data() {
    return {
      password: "",
      username: "a",
      errorText: "",
      passwordType: "password",
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType == "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    async login() {
      let that = this;
      if (
        this.username == "" ||
        !this.username ||
        this.password == "" ||
        !this.password
      ) {
        if (this.password == "" || !this.password) {
          that.$Error("Error", "Write your password please", that);
        }
        if (this.username == "" || !this.username) {
          that.$Error("Error", "Write your username please", that);
        }
      } else {
        this.$http
          .post("users/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            console.log(res.sesion.token)
            localStorage.setItem("userToken", res.sesion.token)
            that.$store.commit("user/setSession", res.sesion);
            that.$router.push({ name: "home" });
          })
          .catch((error) => {
            console.log(error)
            that.$Error("Error", error.body.message, that);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.textAlert {
  color: $secondary_color;
}
#cardLogin {
  border-style: solid;
  border-width: 2px;
  border-color: $ascent_color;
  box-shadow: 6px 7px 19px 4px $shadows;
  border-radius: 1em;
}
</style>
