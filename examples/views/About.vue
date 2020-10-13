<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="dialogVisible=true">导出</el-button>
    <customSet :show.sync="dialogVisible" :setData="setData" />
  </div>
</template>
<script>
  export default {
    name:"About",
    data(){
      return {
        dialogVisible:false,
        setData:[
          {id:1,name:'日期',exportName:'日期',isEdit:false,isChecked:true},
          {id:2,name:'销售订单编号',exportName:'销售订单编号',isEdit:false,isChecked:false},
          {id:3,name:'客户名称',exportName:'客户名称',isEdit:false,isChecked:true},
          {id:4,name:'订单标签',exportName:'订单标签',isEdit:false,isChecked:true},
          {id:5,name:'商品分类',exportName:'商品分类',isEdit:false,isChecked:true},
          {id:6,name:'商品编号',exportName:'商品编号',isEdit:false,isChecked:true},
          {id:7,name:'商品名称',exportName:'商品名称',isEdit:false,isChecked:true},
          {id:8,name:'商品规格',exportName:'商品规格',isEdit:false,isChecked:true},
          {id:9,name:'销售数量',exportName:'销售数量',isEdit:false,isChecked:false},
          {id:10,name:'单位',exportName:'单位',isEdit:false,isChecked:true},
          {id:11,name:'实际售价',exportName:'实际售价',isEdit:false,isChecked:true},
          {id:12,name:'金额',exportName:'金额',isEdit:false,isChecked:true},
          {id:13,name:'商品属性',exportName:'商品属性',isEdit:false,isChecked:true},
          {id:14,name:'备注',exportName:'备注',isEdit:false,isChecked:true},
          {id:15,name:'摘要',exportName:'摘要',isEdit:false,isChecked:true},
          {id:16,name:'仓库',exportName:'仓库',isEdit:false,isChecked:true},
        ],
      }
    }
  }
</script>
