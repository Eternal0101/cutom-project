<template>
    <el-dialog class="export-set" title="导出设置" :visible.sync="show" width="640px" :close-on-click-modal="false" :before-close="handleClose">
        <div slot="title" class="header-title">
            <span class="export-title">{{ title }}</span>
            <div style="margin-top: 24px">{{ remarks }}</div>
        </div>
        <el-table :data="setData" :header-cell-style="{background:'#EDF5F9'}"  ref="dragTable" height="450px" @selection-change="handleSelectChange">
            <el-table-column type="selection" width="55px"></el-table-column>
            <el-table-column prop="name" :label="labelList[0]" align="left" width="222px" />
            <el-table-column prop="exportName" :label="labelList[1]" align="left" width="342px">
                <template slot-scope="scope">
                    <span v-if="!scope.row.isEdit">{{ scope.row.exportName }}</span>
                    <el-input
                            ref="saveValue"
                            v-if="scope.row.isEdit"
                            v-model.trim="scope.row.exportName"
                            @keyup.enter.native="handleInputConfirm(scope.$index)"
                            @blur="handleInputConfirm(scope.$index)">
                    </el-input>
                    <span class="float-r icon-items" v-if="!scope.row.isEdit">
                            <i class="iconfont iconbianji" @click="editName(scope.$index)"></i>
                            <i class="iconfont iconpaixu"></i>
                        </span>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer"  style="text-align: center;margin-bottom: 0px;margin-top: 10px">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleSave">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import Sortable from 'sortablejs/modular/sortable.core.esm';
    //import {  utils as u  } from "@/business_module/logic.js";
    export default {
        name: "customSet",
        props: {
            title:{
                type:String,
                default:'导出设置',
            },
            remarks:{
                type:String,
                default:'注:编辑导出字段名称后,只在导出的Excel表格显示该名称,自定义设置后,记得保存才有效。'
            },
            show: {
                type: Boolean,
                default: () => false,
            },
            setData:{
                type:Array,
                default:() =>[]
            },
            labelList:{
                type:Array,
                default:() =>['数据字段名称','导出字段名称']
            },
        },
        data(){
            return {
                sortable:null,
                selectList:[],
                changeData:[],
            }
        },
        watch:{
            async show(visible){
                if(visible){
                    this.$nextTick(() => {//数据渲染完毕执行方法
                        this.setChecked();
                        this.setSort()
                    });
                }
            }
        },
        mounted(){
            // this.changeData = this.deepClone(this.setData);
            console.log('changeData',this.changeData)
            this.$nextTick(() => {});
        },
        methods:{
            //deepClone:u.deepClone,
            //编辑导出字段名称
            editName(index){
                this.setData[index]['isEdit'] = true;
                this.$nextTick(_ => {
                    this.$refs.saveValue.$refs.input.focus();
                });
            },
            //保存编辑
            handleInputConfirm(index){
                this.setData[index]['isEdit'] = false;
            },
            //选择数据
            handleSelectChange(list){
                this.selectList = list;
            },
            //关闭弹窗
            handleClose(){
                this.$emit('update:show', false);
                //this.show = false;
                /*if(JSON.stringify(this.changeData) === JSON.stringify(this.setData)){
                    this.$emit('update:show', false);
                }else{
                    this.$alert('检测到您有编辑内容,确定要关闭弹窗吗?', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            if(action==='confirm'){
                                this.$emit('update:show', false);
                            }
                            if(action==='cancel'){
                                console.log('cancel')
                                console.log('cancel_data',this.changeData);
                                console.log('cancel_data34',this.setData);
                                //this.$set(this,'list',data.list||[])
                               //this.$set(this,'setData',this.changeData||[])
                            }
                        }
                    });
                }*/
            },
            //将数据设置为默认勾选状态
            async setChecked(){
                this.setData.forEach(row => {
                    if(row.isChecked){
                        this.$refs.dragTable.toggleRowSelection(row, true);
                        this.selectList.push(row);
                    }
                });
            },
            //排序
            setSort(){
                const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
                this.sortable = Sortable.create(el, {
                    disabled: false, // 是否开启拖拽
                    animation: 150, // 拖拽延时，效果更好看
                    //拖拽结束执行,evt执向拖拽的参数
                    onEnd: async evt => {
                        const { newIndex, oldIndex } = evt;
                        //判断是否排序
                        if(oldIndex !== newIndex){
                            const targetRow = this.setData.splice(oldIndex, 1)[0];
                            this.setData.splice(newIndex, 0, targetRow);
                            //数据提交
                            const movedNodeId = this.setData[newIndex].id;
                            console.log('移动的节点的Id',movedNodeId);
                            const upNodeId = this.setData[newIndex-1]&&this.setData[newIndex-1].id||'';
                            console.log('移动前 移动节点上面的Id',upNodeId);
                            const beforeNodeId = this.setData[newIndex+1]&&this.setData[newIndex+1].id||'';
                            console.log('移动后 移动节点上面的Id',beforeNodeId);
                            this.$emit('sortTable',{beforeNodeId, upNodeId, movedNodeId});
                        }
                    }
                });
            },
            //点击保存列表
            handleSave(){
                this.$emit('submit',this.selectList);
            },
        }
    }
</script>

<style scoped lang="scss">
    .header-title{
        color:#ff0000;
        font-size: 13px;
        .export-title{
            margin-right: 10px;
            font-weight: bold;
            color:#000;
            font-size: 16px;
        }
    }

    .export-set /deep/ .el-dialog__footer{
        padding: 10px 20px 20px;
        text-align: center;
    }
    .icon-items{
        font-size: 20px;
        cursor: pointer;
        i:nth-child(2){
            margin-left: 8px;
        }
        i:hover{
            color: #0177d2;
        }
    }
    /deep/ .el-dialog__body{
        padding: 0px 10px 10px;
    }

</style>

