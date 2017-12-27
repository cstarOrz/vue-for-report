<template>
  <li class="meun-tree-list">
    <div class="meun-tree-title" v-bind:class="{ active: list.active }">
      <!-- @click="toggle()" -->
      <!-- <i class="ivu-icon " v-if='hasChild' :class="{ 'ivu-icon-ios-arrow-up': open, 'ivu-icon-ios-arrow-down': !open }"></i>
      <i v-else class="hidden-fz"></i> -->
      <span @click="getTmplContents(list)" v-bind:class="{ hasmes: !list.templateBlock }">{{list.name}}</span>
    </div>
    <ul v-if="hasChild">
       <!-- v-show="open" -->
      <meun-tree v-for="item in list.subSections" :key='item.id' :list='item' :getTmplContent='getTmplContent' ></meun-tree>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'meunTree',
  props: {
    list: Object,
    getTmplContent:Function
  },
  data() {
    return {
      open: true
    }
  },
  // watch:{
  //   list:{
  //     deep:true
  //   }
  // },
  computed: {
    hasChild() {
      return this.list.subSections &&
        this.list.subSections.length
    }
  },
  methods: {
    // toggle: function() {
    //   if (this.hasChild) {
    //     this.open = !this.open
    //   }
    // },
    getTmplContents(item) {
      //if (!this.hasChild) {
      if(item.templateBlock){
        this.getTmplContent(item);
      }
      //}
    }
  }
}
</script>

<style scoped>
.meun-tree-list {
  padding-left: 14px;
}
.meun-tree-title {
  line-height: 1;
  font-size: 14px;
  padding: 7px;
}
.meun-tree-title span{
  cursor: pointer;
}
.meun-tree-title .hasmes{
  cursor: default;
  color: #999;
}
.meun-tree-title.active{
  color:#299be4;
}
.hidden-fz {
  padding-left: 10px;
}
</style>