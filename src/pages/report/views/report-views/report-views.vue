<template>
  <div class="manage-report">
    <ul class="nav nav-tabs">
        <li class="active"><a href="###">查看报告</a></li>
    </ul>
    <div class="report-search">
      <ul class="ul-form">
          <li class="form-group">
              <label class="control-label">报告类型：</label>
              <select class=" input-medium" style="width:163px;" ref="typeChoice">
                <option v-for="(item,index) in typeList" :key="index" :value="item.id">{{item.name}}</option>
              </select>
          </li>
          <li class="form-group">
              <button class="get-report" @click="getReport">查询</button>
          </li>
      </ul>
    </div>
        <div class="report-main" v-show="showContent">
            <div class="report-title" ref="title">
                <h3 class="rep-title">{{reportTitle}}</h3>
                <h5 class="rep-user">{{reportUser}}</h5>
            </div>
            <div class="report-content clearfix" :style="{height: conHeight + 'px' }" style="padding:20px;">
                <div class="report-con-left">
                    <ul>
                        <menu-tree v-for="item in meunList" :key='item.id' :list='item' :getTmplContent='getGroupReportSectionData'></menu-tree>
                    </ul>
                </div>
                <div class="report-con-right">
                    <!-- <Row v-if="tmplLoad">
                        <Col class="spin-col" span="24">
                            <Spin fix>
                            <Icon type="load-c" size=36 class="spin-icon-load"></Icon>
                            <div>Loading</div>
                            </Spin>
                        </Col>
                    </Row> -->
                    <div v-if="tmplLoad" class="loading">
                      加载中
                    </div>
                    <div v-else>
                        <report-list v-for="elements in reportData" :key="elements.elementCode" :listData = "elements"></report-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./js/report-views.js"></script>
<style lang="less" scoped src="./style/report-views.less"></style>
