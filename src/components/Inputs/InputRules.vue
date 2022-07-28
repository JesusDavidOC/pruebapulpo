<template>
  <div>
    <b-form-input
      :state="text == '' ? null : validateString()"
      :placeholder="placeholder"
      :type="type"
      @value="textCmp"
      @input="textCmp = $event"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  props: ["text", "placeholder", "rules", "regex", "type"],
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
