<template>
  <b-container fluid class="h-100">
    <b-row class="h-100 bg-primary justify-content-center" align-v="center">
      <b-col class="h-fitc" col sm="10" md="8" lg="6" xl="4">
        <b-card id="cardLogin">
          <b-card-body>
            <b-container fluid>
              <b-row class="justify-content-start mb-3 pr-3">
                <b-col cols="auto">
                  <!--ENV-->
                  <img
                    src="https://uploads-ssl.webflow.com/60ad08a30391b132d2353be0/60b7723caeacc9575ca744a2_pulpo-logo-blue.svg"
                    alt="ciaIcon"
                    width="150"
                    height="auto"
                  />
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
                    @update:text="username=$event"
                    placeholder="Write your username"
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
                    type="password"
                    placeholder="Write your password"
                  />
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
    };
  },
  methods: {
    login() {
      let that = this;

    },
  },
};
</script>

<style lang="scss" scoped>
#cardLogin {
  border-style: solid;
  border-width: 2px;
  border-color: $ascent_color;
  box-shadow: 6px 7px 19px 4px $shadows;
  border-radius: 1em;
}
</style>
