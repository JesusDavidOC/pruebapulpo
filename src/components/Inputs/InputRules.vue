<template>
  <b-form-group :label="label ? label : ''">
    <b-form-select
      v-if="type == 'select'"
      :id="label ? labelID : ''"
      @change="textCmp = $event"
      :options="options"
      :value="textCmp"
      :size="size"
      required
    ></b-form-select>
    <b-input-group
      :size="size ? size : 'md'"
      v-else-if="type == 'text' || type == 'password'"
      :id="label ? labelID : ''"
    >
      <b-form-input
        :state="text == '' || !stateInp ? null : validateString()"
        :placeholder="placeholder"
        :type="type"
        v-model="textCmp"
        @input="textCmp = $event"
      ></b-form-input>
      <slot></slot>
    </b-input-group>
    <b-card
      class="colorPiker"
      :id="label ? labelID : ''"
      v-else-if="type == 'color'"
    >
      <b-container fluid>
        <b-row>
          <b-col
            class="p-0"
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
                :class="option == textCmp ? 'selectedShadow' : ''"
                x="10"
                y="10"
                width="90"
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
      </b-container>
    </b-card>
    <b-form-datepicker
      v-else-if="type == 'date'"
      :id="labelID + 'datePick'"
      v-model="textCmp"
      :value="textCmp"
      :max="maxDate ? maxDate : undefined"
      :min="minDate ? minDate : undefined"
    ></b-form-datepicker>
    <b-container v-else-if="type == 'radios'">
      <b-row>
        <b-col v-for="(option, index) in options" :key="'optionsRadio' + index">
          <b-form-radio v-model="textCmp" :value="option.value">
            {{ option.text }}
          </b-form-radio>
        </b-col>
      </b-row>
    </b-container>
    <b-form-checkbox v-else-if="type == 'switch'" v-model="textCmp" switch />
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
    "size",
    "hideSelected",
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

<style lang="scss">
legend {
  text-align: left;
  padding-bottom: 0 !important;
}
.colorPiker {
  .card-body {
    padding: 0.6em 0.4em 0.6em 0.4em;
  }
}

fieldset {
  &.form-group {
    margin-bottom: 3px !important;
  }
}
</style>
