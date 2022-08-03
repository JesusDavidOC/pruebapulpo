<template>
  <b-form-group :label="label ? label : ''">
    <b-form-select
      v-if="type == 'select'"
      :id="label ? labelID : ''"
      @change="textCmp = $event"
      :options="options"
      :value="textCmp"
      required
    ></b-form-select>
    <div class="input-group" v-else-if="type == 'text' || type == 'password'">
      <b-form-input
        :id="label ? labelID : ''"
        :state="text == '' || !stateInp ? null : validateString()"
        :placeholder="placeholder"
        :type="type"
        @value="textCmp"
        @input="textCmp = $event"
      ></b-form-input>
      <slot></slot>
    </div>
    <b-card :id="label ? labelID : ''" v-else-if="type == 'color'">
      <b-container fluid>
        <b-row>
          <b-col
            class="pl-1"
            cols="auto"
            v-for="(option, index) in options"
            :key="labelID + index + 'color'"
            @click="textCmp = option"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 120 100"
            >
              <rect
                x="10"
                y="10"
                width="100"
                height="80"
                :stroke-width="option == '#FFFFFF' ? 3 : 0"
                :stroke="option == '#FFFFFF' ? 'black' : ''"
                rx="20"
                ry="20"
                :fill="option"
              />
            </svg>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            Selected:
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 120 100"
            >
              <rect
                x="10"
                y="10"
                width="100"
                height="80"
                :stroke-width="textCmp == '#FFFFFF' ? 3 : 0"
                :stroke="textCmp == '#FFFFFF' ? 'black' : ''"
                rx="20"
                ry="20"
                :fill="textCmp"
              />
            </svg>
          </b-col>
        </b-row> </b-container
    ></b-card>
    <b-form-datepicker
      v-else-if="type == 'date'"
      :id="labelID + 'datePick'"
      v-model="textCmp"
      :value="textCmp"
      :max="maxDate ? maxDate : undefined"
      :min="minDate ? minDate : undefined"
    ></b-form-datepicker>
  </b-form-group>
</template>

<script>
export default {
  props: [
    "text",
    "placeholder",
    "rules",
    "regex",
    "type",
    "stateInp",
    "label",
    "labelID",
    "options",
    "maxDate",
    "minDate",
  ],
  data() {
    return {};
  },
  methods: {
    validateString() {
      //you can set here regex condition with the regex value from the props
      return true;
    },
  },
  computed: {
    textCmp: {
      get() {
        return this.text;
      },
      set(value) {
        this.$emit("update:text", value);
      },
    },
  },
};
</script>

<style lang="scss"></style>
