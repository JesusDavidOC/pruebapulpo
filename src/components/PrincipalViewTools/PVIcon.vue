<template>
  <div class="divCircle" @click="emitClick()">
    <b-iconstack font-scale="5" animation="cylon">
      <b-icon
        stacked
        icon="circle-fill"
        animation="throb"
        scale="1.5"
        :color="bg_color"
      ></b-icon>
      <b-icon
        stacked
        :icon="icon"
        animation="spin-reverse"
        :color="icon_color"
      ></b-icon>
    </b-iconstack>
  </div>
</template>

<script>
export default {
  props: ["bg_color", "icon", "icon_color", "action"],
  methods: {
    emitClick() {
      if(this.action){
        this.$emit(this.action)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.divCircle {
  position: absolute;
  height: 9em;
  width: 9em;
  top: -2em;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

@media (max-width: $breakpoint-sm) {
  .divCircle {
    height: 7em;
    width: 7em;
  }
}
@media (max-width: $breakpoint-sm) {
  .divCircle {
    height: 7em;
    width: 7em;
  }
}
</style>
