<template>
  <b-card
    body-class="d-none"
    class="cardVechicle shadow"
    :class="!vehicle.status ? 'cardDisabled' : ''"
    :style="'border-color:' + vehicle.color + ';'"
  >
    <template #header>
      <b-container fluid :style="'background-color:' + vehicle.color + ';'">
        <b-row align-v="center">
          <b-col class="pr-0 h-fitc" cols="8" md="">
            <b-button
              class="serialCodeCard p-2 w-100"
              :style="
                vehicle.color == '#000000'
                  ? 'color:white;'
                  : 'color:' + vehicle.color + ';'
              "
              ><span>
                {{ vehicle.serialCode }}
              </span></b-button
            ></b-col
          >
          <b-col class="p-0">
            <b-container fluid class="p-0" style="width: 1.5em">
              <b-row class="p-0 pb-2">
                <b-col class="p-0">
                  <b-icon icon="gear-fill" @click="editVehicle()"></b-icon>
                </b-col>
              </b-row>
              <b-row class="p-0">
                <b-col class="p-0"
                  ><b-icon
                    icon="trash"
                    @click="deleteVehicle()"
                    :variant="
                      vehicle.color == '#D033FF' || vehicle.color == '#FF3F33'
                        ? 'light'
                        : 'danger'
                    "
                  ></b-icon
                ></b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-card>
</template>

<script>
export default {
  props: ["vehicle"],
  methods: {
    editVehicle() {
      this.$emit("editVehicle");
    },

    deleteVehicle() {
      let that = this;
      that.$http
        .delete("vehicles/" + this.vehicle.serialCode)
        .then((responseJson) => {
          return responseJson.json();
        })
        .then((res) => {
          that.$Success("Success", "Vehicle deleted successfully", that);
          this.$emit("deleteVehicle", this.vehicle.serialCode);
        })
        .catch((err) => {
          that.$Error("Error", err.message, that);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.serialCodeCard {
  background-color: $shadows !important;
  border-color: $shadows !important;
  width: auto;
}

.b-icon {
  cursor: pointer;
}
.cardVechicle {
  background: rgba(255, 255, 255, 0);
  & .card-header {
    border: none;
    padding: 0;
    background: rgba(255, 255, 255, 0);
    & > div {
      padding: 1.2em 0.8em 1.2em 0.8em;
    }
  }
}
.cardDisabled {
  filter: brightness(50%) !important;
}
</style>
<style lang="scss"></style>
