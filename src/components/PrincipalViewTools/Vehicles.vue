<template>
  <div class="h-100">
    <b-container class="h-100" cols="auto" v-if="loading_vehicles">
      <b-row align-h="center" align-v="center" class="h-100">
        <b-col cols="auto" class="h-fitc">
          <b-spinner variant="light" type="grow"></b-spinner>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="h-100 pt-4" fluid v-else>
      <b-row class="h-30 pt-2">
        <b-col>
          <VehiclesFilter
            @changedFilters="findVehicles($event)"
            :years="years"
          />
        </b-col>
      </b-row>
      <b-row class="mt-2" id="vehiclesContianer">
        <b-col md="4" cols="12" class="pr-1 mb-1" id="createCar">
          <b-card>
            <b-container class="h-100">
              <b-row class="h-100" align-v="center" align-h="center">
                <b-col>
                  <a class="addNewCarButton" @click="openCreateVehicle($event)">
                    <b-icon icon="plus-circle"></b-icon> ADD</a
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
        <b-col
          md="4"
          cols="12"
          v-for="(vehicle, index) in vehicles"
          :key="'vehicle' + index"
          class="pr-1 mb-1 h-fitc"
        >
          <VehicleCard
            :vehicle="vehicle"
            @editVehicle="openEditVehicle(vehicle)"
            @deleteVehicle="deleteVehicle($event)"
          />
        </b-col>
      </b-row>
      <VehicleTool
        ref="modalCreationTool"
        :actionView="actionView"
        :vehicle="vehicle"
        :years="years"
        @createVehicle="createVehicle()"
        @updateVehicle="getVehicles()"
      >
      </VehicleTool>
    </b-container>
  </div>
</template>

<script>
import VehicleCard from "./VehicleCard.vue";
import InputRules from "../Inputs/InputRules.vue";
import VehicleTool from "./VehicleTool.vue";
import VehiclesFilter from "./VehiclesFilter.vue";
export default {
  components: {
    VehicleCard,
    InputRules,
    VehicleTool,
    VehiclesFilter,
  },
  data() {
    function range(start, end) {
      let arr = [{ text: "Select one", value: null }];
      for (let index = end; index > start; index--) {
        arr.push({ text: index, value: index });
      }
      return arr;
    }
    return {
      actionView: "create",
      filtersDef: {
        serialCode: "",
        color: "",
        brand: "",
        model: "",
        status: "",
      },
      filters: {},
      vehicles: [],
      vehicle: {
        status: true,
        serialCode: "",
        brand: null,
        model: null,
        color: "#FFFFFF",
        accessDate: new Date().toISOString().split("T")[0],
      },
      years: range(1918, 2023),
      loading_vehicles: true,
    };
  },
  methods: {
    deleteVehicle(ev) {
      console.log(ev);
      this.vehicles = this.vehicles.filter((el) => {
        return el.serialCode != ev;
      });
    },
    findVehicles(ev) {
      console.log(ev);
      this.filters = ev;
    },
    openEditVehicle(vehicle) {
      this.vehicle = vehicle;
      this.actionView = "edit";
      this.$refs["modalCreationTool"].$children[0].show();
    },
    openCreateVehicle(ev) {
      this.actionView = "create";
      this.vehicle = {
        serialCode: "",
        brand: null,
        model: null,
        color: "#FFFFFF",
        accessDate: new Date().toISOString().split("T")[0],
        status: true,
      };
      this.$refs["modalCreationTool"].$children[0].show();
      ev.stopPropagation();
      ev.preventDefault();
    },
    createVehicle() {
      let that = this;
      this.vehicle["log"] = [];
      that.$http
        .post("vehicles", this.vehicle)
        .then((responseJson) => {
          return responseJson.json();
        })
        .then((res) => {
          this.newVehicle({
            serialCode: res.vehicle.serialCode,
            color: res.vehicle.color,
            accessDate: res.vehicle.accessDate,
            brand: res.vehicle.brand,
            model: res.vehicle.model,
            status: true,
          });
          this.$refs["modalCreationTool"].$children[0].hide();
          that.$Success("Success", "Vehicle created successfully", that);
        })
        .catch((err) => {
          that.$Error("Error", err.message, that);
        });
    },
    newVehicle(ev) {
      this.vehicles.unshift(ev);
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
    async getVehicles() {
      let that = this;
      //that.loading_vehicles = true;
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
  },
  computed: {
    basics() {
      return this.$store.getters["pvStore/getBasics"];
    },
  },
  watch: {
    filters() {
      this.getVehicles();
    },
  },
  mounted() {
    this.getBasics();
  },
};
</script>

<style lang="scss">
#vehiclesContianer {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: 65% !important;
  max-height: 65% !important;
  padding-bottom: 2em;
}
#createCar {
  .card {
    background-color: rgba(255, 255, 255, 0.262);
    height: 100%;
    border-style: dashed;
    border-color: rgba(209, 209, 209, 0.493);
    border-width: 5px;
    .addNewCarButton {
      font-size: 2em;
      &:hover {
        text-decoration: none;
        color: white !important;
        transition: breathing 2s ease;
        cursor: pointer;
      }
    }
    & .card-body {
      padding: 0.8em 0.8em;
    }
  }
}
</style>

<style lang="scss" scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: rgb(255, 255, 255) rgb(255, 255, 255);
}
$border_scroll_bar: 10px;

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: #43434363;
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  background-color: #ffff;
  border-radius: 10px;
  border: 3px solid #ffffff;
}

:deep #modalCreationTool {
  border-color: #fff;
  & .modal-header {
    border: none;
  }
}
</style>
