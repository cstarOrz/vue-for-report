<template>
  <div>
    <div class="report-views"  v-if="!reportError">
      <h3 class="report-title">{{reportTitle}}</h3>
      <h5 class="report-user">{{reportUser}}</h5>
      <div class="report-list" v-for="list in reportData" :key='list.id'>
        <h4 class="report-list-title">
          <div class="report-list-title-line">
            <label>
              <span>{{list.name}}</span>
            </label>
          </div>
        </h4>
        <report-list v-for="elements in list.reportElements" :key="elements.elementCode" :listData = "elements"></report-list>
        <div v-for="sections in list.sections" :key='sections.id' class="report-list-second">
          <h5 class="report-list-title-second">
            <span>{{sections.name}}</span>
          </h5>
          <report-list v-for="elements in sections.reportElements" :key="elements.elementCode" :listData = "elements"></report-list>
          <div v-for="subSections in sections.subSections" :key="subSections.id" class="report-list-third">
            <h6 class="report-list-title-third">
              <span>{{subSections.name}}</span>
            </h6>
            <report-list v-for="elements in subSections.reportElements" :key="elements.elementCode" :listData = "elements"></report-list>
          </div>
        </div>
      </div>
    </div>
    <div v-if="reportError" class="report-error">
      {{reportErrorMes}}
    </div>
  </div>
</template>

<script src="./js/report-views.js"></script>
<style lang="less" scoped src="./style/report-views.less"></style>
