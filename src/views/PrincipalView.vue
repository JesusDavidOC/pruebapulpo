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
        <b-container class="h-100" fluid>
          <b-row class="h-100">
            <b-col
              class="card_container"
              :lg="userViewActive ? '5' : '2'"
              order-lg="1"
              order="2"
              cols="12"
            >
              <b-card class="h-100">
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
              :lg="userViewActive ? '7' : '10'"
              order-lg="2"
              order="1"
              cols="12"
            >
              <b-card class="pb-0"
                ><template #header>
                  <PVIcon
                    bg_color="White"
                    icon="truck"
                    :icon_color="ascent_color"
                  />
                </template>
                <b-container id="carsList">
                  <b-row class="h-100">
                    <b-col class="h-100">
                      <Vehicles />
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
      ascent_color: styles.ascent_color
    };
  },
  methods: {
    openUserTab() {
      this.userViewActive = !this.userViewActive;
    },
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
  height: 78.8vh;
  max-height: 78.8vh;
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
  min-height: 71vh;
  height: 71vh;
}
</style>
