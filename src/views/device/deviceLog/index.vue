<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :rules="rules" :inline="true" label-width="6em" v-show="showSearch">
            <el-form-item label="设备SN" prop="cabinetSn">
                <el-input v-model.trim="queryParams.cabinetSn" placeholder="请输入设备SN" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="关键字">
                <el-input v-model.trim="queryParams.keyWorder" placeholder="请输入关键字" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="搜索日期" prop="dayStr">
                <el-date-picker v-model="queryParams.dayStr" size="small" style="width: 240px" value-format="yyyy-MM-dd"
                    type="date" placeholder="请选择搜索日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-time-picker v-model="queryParams.startTime" :picker-options="{
                    selectableRange: '00:00:00 - ' + (queryParams.endTime || '23:59:59')
                }" style="width: 240px" placeholder="请选择开始时间">
                </el-time-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-time-picker v-model="queryParams.endTime" :picker-options="{
                    selectableRange: (queryParams.startTime || '00:00:00') + ' - 23:59:59'
                }" style="width: 240px" placeholder="请选择结束时间">
                </el-time-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <!-- <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading"
                    @click="handleExport" v-hasPermi="['device:batteryRouting:export']">导出</el-button>
            </el-col> -->
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="tableData">
            <el-table-column label="日志流水号" width="150" align="center" prop="id" />
            <el-table-column label="记录时间" width="180" align="center" prop="recordTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.recordTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="日志报文" minWidth="160" align="center" prop="messageBody" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.size"
            @pagination="getList" />

    </div>
</template>

<script>
import { ajaxDeviceLogList } from "@/api/device/deviceLog";
import { dateFormat } from '@/utils/my-utils'
export default {
    name: "deviceLog",
    data() {
        return {
            // 遮罩层
            loading: false,
            // 导出遮罩层
            exportLoading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 表格数据
            tableData: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 事件描述时间范围
            daterangeCreateTime: [],
            // 查询参数
            queryParams: {
                page: 1,
                size: 10,
                // 设备SN
                cabinetSn: null,
                // 关键字
                keyWorder: null,
                // 搜索日期
                dayStr: dateFormat(new Date()),
                startTime: new Date(new Date().setHours(0, 0, 0)),
                endTime: new Date(new Date().setHours(23, 59, 59)),
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                cabinetSn: [
                    { required: true, message: "请输入设备SN", trigger: "blur" }
                ],
                dayStr: [
                    { required: true, message: "请选择搜索日期", trigger: "blur" }
                ],
                startTime: [
                    { required: true, message: "请选择开始时间", trigger: "blur" }
                ],
                endTime: [
                    { required: true, message: "请选择结束时间", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        // this.getList();
    },
    methods: {
        /** 查询电池路由记录列表 */
        getList() {
            this.loading = true;
            let { startTime, endTime, dayStr } = this.queryParams;
            let params = {
                ...this.queryParams,
                dayStr: dayStr ? dayStr.replace(/\-/g, '_') : null,
                startTime: startTime ? startTime.getTime() : null,
                endTime: endTime ? endTime.getTime() : null
            };
            ajaxDeviceLogList(params).then(({ data }) => {
                this.tableData = data?.list || [];
                this.total = data?.total || 0;
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                id: null,
                tenantId: null,
                routingSn: null,
                createTime: null,
                batterySn: null,
                uid: null,
                batteryTypeId: null,
                transferType: null,
                comment: null
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.$refs["queryForm"].validate(valid => {
                if (valid) {
                    this.queryParams.page = 1;
                    this.getList();
                }
            });
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id)
            this.single = selection.length !== 1
            this.multiple = !selection.length
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "添加电池路由记录";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const id = row.id || this.ids
            getBatteryRouting(id).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改电池路由记录";
            });
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != null) {
                        updateBatteryRouting(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addBatteryRouting(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const ids = row.id || this.ids;
            this.$modal.confirm('是否确认删除电池路由记录编号为"' + ids + '"的数据项？').then(function () {
                return delBatteryRouting(ids);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            const queryParams = this.queryParams;
            this.$modal.confirm('是否确认导出所有电池路由记录数据项？').then(() => {
                this.exportLoading = true;
                return exportBatteryRouting(queryParams);
            }).then(response => {
                this.$download.name(response.msg);
                this.exportLoading = false;
            }).catch(() => { });
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table__body td.el-table__cell {
    vertical-align: top;
}
</style>
