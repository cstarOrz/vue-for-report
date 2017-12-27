<template>
    <g>
        <rect :height="this.rectHeight+8" :width="this.rectWidth+8" :y="y-4" :x="x-4" ry="10" stroke-width="1" stroke-dasharray="4" :stroke="thisCheck" fill="#fff"/>
        <rect :height="this.rectHeight" :width="this.rectWidth" :y="y" :x="x" stroke-width="0" ry="10" :fill="thisCheck" />
        <text text-anchor="middle" font-family="serif" :font-size="fontSize" :y="y + fontSize + rectHeight/4" :x="x + rectWidth/2" stroke-width="0" fill="#fff" xml:space="preserve">{{text}}</text>
        <template v-if="!isRoot">
            <line fill="none" stroke="#55b5f4" stroke-width="2" :x1="rootX+rectWidth+4" :y1="rootY+rectHeight/2" :x2="x-4" :y2="y+rectHeight/2" />
            <circle :cx="x-4" :cy="y+this.rectHeight/2" r="3" stroke-width="0" fill="#55b5f4"/>
        </template>
    </g>
</template>
<script>
export default {
  template: "#rects-text",
  props: {
    x: Number,
    y: Number,
    text: String,
    isRoot: Boolean,
    rootX: {
      type: Number,
      default: 0
    },
    rootY: {
      type: Number,
      default: 0
    },
    check: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fontSize: 20,
      rectHeight: 60,
      rectWidth: 240
    };
  },
  computed: {
    thisCheck: function() {
      if (this.check) return "#258ccf";
      else return "#55b5f4";
    }
  }
};
</script>
<style scoped lang="less">

</style>
