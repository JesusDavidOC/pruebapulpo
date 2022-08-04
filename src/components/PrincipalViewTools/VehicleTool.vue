<template>
  <b-modal
    ref="modalCreation"
    :title="
      actionView == 'create'
        ? 'Create a new vehicle'
        : actionView == 'edit'
        ? 'Edit the vehicle with ID: ' + originalVehicle.serialCode
        : false
    "
  >
    <b-container>
      <b-row>
        <b-col>
          <b-form>
            <b-container fluid>
              <b-row>
                <b-col class="p-0" cols="8"
                  ><InputRules
                    :text="vehicle.serialCode"
                    type="text"
                    @update:text="vehicle.serialCode = $event"
                    placeholder="ABC-123A"
                    label="Vehicle ID"
                    labelID="serialCodeText"
                  >
                  </InputRules
                ></b-col>
                <b-col>
                  <InputRules
                    v-if="actionView == 'edit'"
                    :text="vehicle.status"
                    type="switch"
                    @update:text="vehicle.status = $event"
                    label="Status"
                    labelID="switchStatus"
                  >
                  </InputRules>
                </b-col>
              </b-row>
            </b-container>

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
      ><b-button @click="actionButton()" variant="outline-primary">{{
        actionView == "create"
          ? "Create"
          : actionView == "edit"
          ? "Edit"
          : false
      }}</b-button>
      <b-button variant="outline-danger" @click="$refs['modalCreation'].hide()"
        >Cancel</b-button
      >
    </template>
  </b-modal>
</template>

<script>
import InputRules from "../Inputs/InputRules.vue";
export default {
  props: ["uid", "actionView", "years", "vehicle"],
  components: {
    InputRules,
  },
  data() {
    return {
      originalVehicle: null,
    };
  },
  methods: {
    actionButton() {
      this.actionView == "create" ? this.createVehicle() : this.updateVehicle();
    },
    createVehicle() {
      this.$emit("createVehicle");
    },
    async updateVehicle() {
      let that = this;
      this.vehicle["log"] = [];
      that.$http
        .put("vehicles/" + that.originalVehicle.serialCode, this.vehicle)
        .then((responseJson) => {
          return responseJson.json();
        })
        .then((res) => {
          that.originalVehicle = that.vehicle;
          that.$refs["modalCreation"].hide();
          that.$Success("Success", "Vehicle edited successfully", that);
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
  watch: {
    vehicle(newVal) {
      if (this.actionView == "edit") {
        this.originalVehicle = Object.assign({}, newVal);
      } else {
        this.originalVehicle = null;
      }
    },
  },
  mounted() {
    let that = this;
    this.$refs["modalCreation"].$on("hide", () => {
      if (that.actionView == "edit") {
        that.$emit("updateVehicle");
      }
    });
  },
};
</script>

<style scoped lang="scss"></style>
