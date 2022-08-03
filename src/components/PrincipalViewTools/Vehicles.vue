<template>
  <b-container class="h-100 pt-4" fluid>
    <b-row class="h-30">
      <b-col>
        {{ basics }}
      </b-col>
    </b-row>
    <b-row class="mxh-70 mt-2 h-auto" id="vehiclesContianer">
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
        <VehicleCard :vehicle="vehicle" />
      </b-col>
    </b-row>
    <b-modal
      id="modalCreationTool"
      ref="modalCreationTool"
      :title="actionView == 'create' ? 'Create a new vehicle' : false"
    >
      <b-container>
        <b-row>
          <b-col>
            <b-form>
              <InputRules
                :text="vehicle.serialCode"
                type="text"
                @update:text="vehicle.serialCode = $event"
                placeholder="ABC-123A"
                label="Vehicle ID"
                labelID="serialCodeText"
              >
              </InputRules>
              <InputRules
                :text="vehicle.brand"
                type="select"
                @update:text="vehicle.brand = $event"
                :options="
                  [{ text: 'Select one', value: null }].concat(basics.brands)
                "
                label="Brand"
                labelID="brandSelect"
              >
              </InputRules>
              <InputRules
                :text="vehicle.model"
                type="select"
                @update:text="vehicle.model = $event"
                :options="years"
                label="Model"
                labelID="modelSelect"
              >
              </InputRules>
              <InputRules
                :text="vehicle.color"
                type="color"
                @update:text="vehicle.color = $event"
                :options="basics.colors"
                label="Color"
                labelID="colorSelect"
              >
              </InputRules>
              <InputRules
                :text="vehicle.accessDate"
                type="date"
                @update:text="vehicle.accessDate = $event"
                :maxDate="new Date()"
                label="Access date"
                labelID="accessDatePiker"
              >
              </InputRules>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer
        ><b-button @click="createVehicle()" variant="outline-primary"
          >Create</b-button
        >
        <b-button variant="outline-danger">Cancel</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import VehicleCard from "./VehicleCard.vue";
import InputRules from "../Inputs/InputRules.vue";
export default {
  components: {
    VehicleCard,
    InputRules,
  },
  props: ["vehicles", "filters"],
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
      vehicle: {
        serialCode: "",
        brand: null,
        model: null,
        color: "#FFFFFF",
        accessDate: new Date().toISOString().split("T")[0],
      },
      years: range(1918, 2023),
    };
  },
  methods: {
    openCreateVehicle(ev) {
      this.$store.dispatch("pvStore/showModal", {
        ref: "modalCreationTool",
        that: this,
      });
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
          this.$emit("newVehicle", {
            serialCode: res.vehicle.serialCode,
            color: res.vehicle.color,
            accessDate: res.vehicle.accessDate,
            brand: res.vehicle.brand,
            model: res.vehicle.model,
            active:true
          });
          this.$store.dispatch("pvStore/hideModal", {
            ref: "modalCreationTool",
            that,
          });

          that.$Success("Success", "Vehicle created successfully", that);
        })
        .catch((err) => {
          that.$Error("Error", error.body.message, that);
        });
    },
  },
  computed: {
    basics() {
      return this.$store.getters["pvStore/getBasics"];
    },
  },
};
</script>

<style lang="scss">
#vehiclesContianer {
  overflow-y: auto !important;
  overflow-x: hidden !important;
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
