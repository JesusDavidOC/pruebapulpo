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
              :md="userViewActive ? '6' : '2'"
              order-md="1"
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
              :md="userViewActive ? '6' : '10'"
              order-md="2"
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
                    <b-col v-else>
                      jsjsjs
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
export default {
  components: {
    PVIcon,
  },
  data() {
    return {
      userViewActive: false,
      ascent_color: styles.ascent_color,
      loading_vehicles: true,
    };
  },
  methods: {
    openUserTab() {
      this.userViewActive = !this.userViewActive;
    },
    getVehicles(){
      this.$http.post("vehicles/")
    }
  },
};
</script>

<style scoped lang="scss">
:export {
  ascent_color: $ascent_color;
}
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

/*******CUSTOM ANIMATIONS********/
@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
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
