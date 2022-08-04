<template>
  <b-card class="h-100 shadow">
    <b-form>
      <b-container fluid>
        <b-row>
          <b-col cols="3" class="colFilter">
            <b-container>
              <b-row class="p-0">
                <b-col class="p-0">
                  <InputRules
                    type="text"
                    placeholder="E.g ABC-123A"
                    :text="serialCode"
                    @update:text="serialCode = $event"
                    label="Vehicle ID"
                    labelID="labelSerialCodeFilters"
                    size="sm"
                  />
                </b-col>
              </b-row>
              <b-row class="pb-0">
                <b-col class="p-0">
                  <InputRules
                    :text="brand"
                    type="select"
                    @update:text="brand = $event"
                    :options="
                      [{ text: 'Select one', value: null }].concat(
                        basics.brands
                      )
                    "
                    label="Brand"
                    labelID="brandSelectFilter"
                    size="sm"
                  >
                  </InputRules>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
          <b-col cols="3" class="colFilter">
            <b-container fluid>
              <b-row class="p-0">
                <InputRules
                  type="color"
                  :text="color"
                  @update:text="color = $event"
                  :options="basics.colors"
                  label="Color"
                  labelID="colorSelectFilters"
                  :hideSelected="true"
                />
              </b-row>
            </b-container>
          </b-col>
          <b-col cols="3" class="colFilter">
            <b-container>
              <b-row class="pt-0">
                <b-col class="p-0">
                  <InputRules
                    :text="model"
                    type="select"
                    @update:text="model = $event"
                    :options="years"
                    label="Model"
                    labelID="modelSelectFilter"
                    size="sm"
                  >
                  </InputRules>
                </b-col>
              </b-row>
              <b-row class="p-0">
                <InputRules
                  type="radios"
                  :text="status"
                  @update:text="status = $event"
                  :options="[
                    { text: 'Active', value: true },
                    { text: 'Disabled', value: false },
                  ]"
                  label="Status"
                  labelID="statusSelectFilters"
                />
              </b-row>
            </b-container>
          </b-col>
          <b-col class="colFilter">
            <b-container class="h-100">
              <b-row class="h-50" align-v="center">
                <b-col class="h-fitc pl-0 pr-0"
                  ><b-button
                    class="w-100"
                    variant="primary"
                    @click="setFilters()"
                  >
                    Filter
                  </b-button></b-col
                >
              </b-row>

              <b-row class="h-50" align-v="center">
                <b-col cols="auto pl-0" v-if="filters.serialCode">
                  <b-badge variant="primary"
                    >ID: {{ filters.serialCode }}
                    <b-icon
                      icon="x-circle-fill"
                      @click="removeTo('serialCode')"
                    ></b-icon
                  ></b-badge>
                </b-col>
                <b-col cols="auto pl-0" v-if="filters.brand">
                  <b-badge variant="primary">
                    {{ filters.brand }}
                    <b-icon
                      icon="x-circle-fill"
                      @click="removeTo('brand')"
                    ></b-icon
                  ></b-badge>
                </b-col>
                <b-col cols="auto pl-0" v-if="filters.model">
                  <b-badge variant="primary"
                    >{{ filters.model }}
                    <b-icon
                      icon="x-circle-fill"
                      @click="removeTo('model')"
                    ></b-icon
                  ></b-badge>
                </b-col>
                <b-col cols="auto pl-0" v-if="filters.color">
                  <b-badge
                    :style="
                      'background-color:' +
                      filters.color +
                      ';' +
                      (filters.color == '#FFFFFF'
                        ? 'border-style:solid;border-width:2px;border-color:bloack;color:black;'
                        : '')
                    "
                    >Color
                    <b-icon
                      icon="x-circle-fill"
                      @click="removeTo('color')"
                    ></b-icon
                  ></b-badge>
                </b-col>
                <b-col
                  cols="auto pl-0"
                  v-if="
                    filters.status &&
                    (filters.status == false || filters.status == true)
                  "
                >
                  <b-badge variant="primary" @click="removeTo('status')"
                    >{{ filters.status ? "Active" : "Disabled" }}
                    <b-icon icon="x-circle-fill"></b-icon
                  ></b-badge>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </b-card>
</template>

<script>
import InputRules from "../Inputs/InputRules.vue";
export default {
  props: ["years"],
  data() {
    return {
      serialCode: "",
      color: "",
      brand: null,
      model: null,
      status: null,
      filters: {},
    };
  },
  components: {
    InputRules,
  },
  methods: {
    removeTo(field) {
      let obj = {};
      for (let key in this.filters) {
        if (field != key) {
          obj[key] = this.filters[key];
        }
      }
      this.filters = {};
      this.filters = obj;
      //console.log(this.filters);
    },
    setFilters() {
      this.filters = {};
      if (this.serialCode != "") {
        this.filters["serialCode"] = this.serialCode;
      }
      if (this.brand != null) {
        this.filters["brand"] = this.brand;
      }
      if (this.model != null) {
        this.filters["model"] = this.model;
      }
      if (this.status != null) {
        this.filters["status"] = this.status;
      }
      if (this.color != "") {
        this.filters["color"] = this.color;
      }

      this.serialCode = "";
      this.color = "";
      this.brand = null;
      this.model = null;
      this.status = null;
    },
  },
  computed: {
    basics() {
      return this.$store.getters["pvStore/getBasics"];
    },
  },
  watch: {
    filters: {
      handler(newValue, oldValue) {
        this.$emit("changedFilters", newValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.card-body {
  padding-bottom: 3px;
  padding-top: 1em;
}

.badge {
  border-radius: 1em;
  .b-icon {
    color: $palid_ascent_color;
    cursor: pointer;
  }
}
.custom-control.custom-radio {
  padding: 0 !important;
}

.colFilter {
  padding: 0;
  padding-left: 1em;
}
</style>
