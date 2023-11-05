<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="服务名称" prop="serverName">
        <el-input
          v-model="queryParams.serverName"
          placeholder="请输入服务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务IP" prop="serverIp">
        <el-input
          v-model="queryParams.serverIp"
          placeholder="请输入服务IP"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内网Ip" prop="serverLan">
        <el-input
          v-model="queryParams.serverLan"
          placeholder="请输入内网Ip"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务端口" prop="serverPort">
        <el-input
          v-model="queryParams.serverPort"
          placeholder="请输入服务端口"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务类型" prop="serverType">
        <el-select v-model="queryParams.serverType" placeholder="请选择服务类型" clearable size="small">
          <el-option
            v-for="dict in dict.type.serverType"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="应用类型" prop="applicableType">
        <el-select v-model="queryParams.applicableType" placeholder="请选择应用类型" clearable size="small">
          <el-option
            v-for="dict in dict.type.appServerType"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="daterangeCreatTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-date-picker
          v-model="daterangeUpdateTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exp:tcpIpManager:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['exp:tcpIpManager:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['exp:tcpIpManager:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['exp:tcpIpManager:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tcpIpManagerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="服务名称" align="center" prop="serverName" />
      <el-table-column label="服务IP" align="center" prop="serverIp" />
      <el-table-column label="内网Ip" align="center" prop="serverLan" />
      <el-table-column label="服务端口" align="center" prop="serverPort" />
      <el-table-column label="服务类型" align="center" prop="serverType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.serverType" :value="scope.row.serverType"/>
        </template>
      </el-table-column>
      <el-table-column label="应用类型" align="center" prop="applicableType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.appServerType" :value="scope.row.applicableType"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="creatTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creatTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['exp:tcpIpManager:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exp:tcpIpManager:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改tcp服务器管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="服务名称" prop="serverName">
          <el-input v-model="form.serverName" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="服务IP" prop="serverIp">
          <el-input v-model="form.serverIp" placeholder="请输入服务IP" />
        </el-form-item>
        <el-form-item label="内网Ip" prop="serverLan">
          <el-input v-model="form.serverLan" placeholder="请输入内网Ip" />
        </el-form-item>
        <el-form-item label="服务端口" prop="serverPort">
          <el-input v-model="form.serverPort" placeholder="请输入服务端口" />
        </el-form-item>
        <el-form-item label="服务类型" prop="serverType">
          <el-select v-model="form.serverType" placeholder="请选择服务类型">
            <el-option
              v-for="dict in dict.type.serverType"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用类型" prop="applicableType">
          <el-select v-model="form.applicableType" placeholder="请选择应用类型">
            <el-option
              v-for="dict in dict.type.appServerType"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTcpIpManager, getTcpIpManager, delTcpIpManager, addTcpIpManager, updateTcpIpManager, exportTcpIpManager } from "@/api/exp/tcpIpManager";

export default {
  name: "TcpIpManager",
  dicts: ['serverType', 'appServerType'],
  data() {
    return {
      // 遮罩层
      loading: true,
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
      // tcp服务器管理表格数据
      tcpIpManagerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 应用类型时间范围
      daterangeCreatTime: [],
      // 应用类型时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        serverName: null,
        serverIp: null,
        serverLan: null,
        serverPort: null,
        serverType: null,
        applicableType: null,
        creatTime: null,
        updateTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        serverName: [
          { required: true, message: "服务名称不能为空", trigger: "blur" }
        ],
        serverIp: [
          { required: true, message: "服务IP不能为空", trigger: "blur" }
        ],
        serverLan: [
          { required: true, message: "内网Ip不能为空", trigger: "blur" }
        ],
        serverPort: [
          { required: true, message: "服务端口不能为空", trigger: "blur" }
        ],
        serverType: [
          { required: true, message: "服务类型不能为空", trigger: "change" }
        ],
        applicableType: [
          { required: true, message: "应用类型不能为空", trigger: "change" }
        ],
        linksNum: [
          { required: true, message: "当前设备连接数量不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询tcp服务器管理列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreatTime && '' != this.daterangeCreatTime) {
        this.queryParams.params["beginCreatTime"] = this.daterangeCreatTime[0];
        this.queryParams.params["endCreatTime"] = this.daterangeCreatTime[1];
      }
      if (null != this.daterangeUpdateTime && '' != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] = this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      listTcpIpManager(this.queryParams).then(response => {
        this.tcpIpManagerList = response.rows;
        this.total = response.total;
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
        appid: null,
        serverName: null,
        serverIp: null,
        serverLan: null,
        serverPort: null,
        serverType: null,
        applicableType: null,
        linksNum: null,
        commandUrl: null,
        creatTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreatTime = [];
      this.daterangeUpdateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加tcp服务器管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTcpIpManager(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改tcp服务器管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTcpIpManager(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTcpIpManager(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除tcp服务器管理编号为"' + ids + '"的数据项？').then(function() {
        return delTcpIpManager(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有tcp服务器管理数据项？').then(() => {
        this.exportLoading = true;
        return exportTcpIpManager(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    }
  }
};
</script>
