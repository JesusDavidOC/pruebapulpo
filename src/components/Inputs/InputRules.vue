<template>
  <div class="input-group">
    <b-form-input
      :state="text == '' || !stateInp ? null : validateString()"
      :placeholder="placeholder"
      :type="type"
      @value="textCmp"
      @input="textCmp = $event"
    ></b-form-input>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["text", "placeholder", "rules", "regex", "type", "stateInp"],
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
