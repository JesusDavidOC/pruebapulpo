<template>
  <b-container fluid>
    <b-row
      id="header_pulpo"
      align-v="center"
      align-h="center"
      class="pt-5 pb-5 h-100"
    >
      <b-col cols="auto" class="h-fitc">
        <img
          src="https://uploads-ssl.webflow.com/60ad08a30391b132d2353be0/60be6ba1f6ca94ca8735fbf1_pulpo-footer.svg"
          alt="pulpoLogo"
          width="200"
          height="auto"
        />
      </b-col>
    </b-row>
    <b-row id="content">
      <b-col>
        <b-container fluid>
          <b-row>
            <b-col
              class="card_container"
              :lg="userViewActive ? '6' : '2'"
              order-lg="1"
              order="2"
              cols="12"
            >
              <b-card>
                <template #header>
                  <PVIcon
                    bg_color="White"
                    icon="person-circle"
                    action="openUserTab"
                    @openUserTab="openUserTab()"
                    :icon_color="ascent_color"
                    id="iconPerson"
                  />
                </template>
              </b-card>
            </b-col>
            <b-col
              class="card_container"
              :lg="userViewActive ? '6' : '10'"
              order-lg="2"
              order="1"
              cols="12"
            >
              <b-card
                ><template #header>
                  <PVIcon
                    bg_color="White"
                    icon="truck"
                    :icon_color="ascent_color"
                  />
                </template>
                <b-container id="carsList">
                  <b-row class="h-100" align-h="center" align-v="center">
                    <b-col class="h-fitc" cols="auto" v-if="loading_vehicles">
                      <b-spinner variant="light" type="grow"></b-spinner>
                    </b-col>
                    <b-col class="h-100 pb-5" v-else>
                      <Vehicles
                        :filters="filters"
                        :vehicles="vehicles"
                        @newVehicle="newVehicle($event)"
                      />
                    </b-col>
                  </b-row>
                </b-container>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PVIcon from "../components/PrincipalViewTools/PVIcon.vue";
import styles from "./PrincipalView.vue?vue&type=style&index=0&lang=scss&module=1";
import Vehicles from "../components/PrincipalViewTools/Vehicles.vue";
export default {
  components: {
    PVIcon,
    Vehicles,
  },
  data() {
    return {
      userViewActive: false,
      ascent_color: styles.ascent_color,
      loading_vehicles: true,
      vehicles: [],
      filters: {},
    };
  },
  methods: {
    newVehicle(ev) {
      this.vehicles.unshift(ev);
    },
    openUserTab() {
      this.userViewActive = !this.userViewActive;
    },
    async getVehicles() {
      let that = this;
      await this.$http
        .post("vehicles/find", that.filters)
        .then((respJson) => {
          return respJson.json();
        })
        .then((response) => {
          that.vehicles = response.vehicles;
          that.loading_vehicles = false;
        })
        .catch((err) => {
          that.$Error(
            "Error",
            "An unknown error occurred while getting the vehicles information",
            that
          );
        });
    },
    async getBasics() {
      let that = this;
      await this.$http
        .get("vehicles/basics")
        .then((respJson) => {
          return respJson.json();
        })
        .then((response) => {
          that.$store.commit("pvStore/setBasics", response);
          that.getVehicles();
        })
        .catch((err) => {
          that.$Error(
            "Error",
            "An unknown error occurred while getting the basic information",
            that
          );
        });
    },
  },
  mounted() {
    this.getBasics();
  },
};
</script>
<style lang="scss">
:export {
  ascent_color: $ascent_color;
}
</style>

<style scoped lang="scss">
#header_pulpo {
  background-color: $ascent_color;
  height: 20vh;
}
#content {
  height: 80vh;
  background-color: $shadows;
}
.card {
  background-color: #ffffff00;
  border: none;
  .card-header {
    background-color: #ffffff00;
    border: none;
  }
}

#iconPerson {
  transform-origin: center;
  &:hover {
    -webkit-animation: breathing 3s ease-out infinite normal;
    animation: breathing 3s ease-out infinite normal;
  }
  &,
  g {
    cursor: pointer !important;
  }
}

#carsList {
  background-color: $ascent_color;
  border-radius: 1.5em;
  min-height: 65vh;
  height: 65vh;
}
</style>
