<template>
  <div class="user">
    <div class="search">
      <div style="display: flex; align-items: center; margin-bottom: 6px">
        <el-input v-model="searchInfo" style="width: 220px; margin-right: 6px"></el-input>
        <el-button size="small" type="primary">搜索</el-button>
        <el-button size="small" @click="seniorFlag = !seniorFlag"
          >高级搜索
          <i :class="seniorFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </el-button>
        <el-button size="small" type="info">批量操作</el-button>
        <el-button size="small" type="info">导出</el-button>
      </div>
      <SelectForm :formItems="formItems" v-show="seniorFlag" @seniorResult="seniorResult" />
    </div>

    <div class="content">
      <el-table :data="tableData" style="width: 100%; margin-top: 10px" :height="seniorFlag ? height2 : height1" border>
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
      </el-table>
      <el-date-picker v-model="value1" type="monthrange" range-separator="To" start-placeholder="Start month" end-placeholder="End month"> </el-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SelectForm, { IFormItem, IResoult } from '@/base-ui/select-form';

export default defineComponent({
  components: {
    SelectForm
  },
  setup() {
    const searchInfo = '';
    const seniorFlag = ref(false);
    const formItems: IFormItem[] = [
      {
        type: 'select',
        label: '爱好',
        value: 'hoppy',
        rules: [
          {
            required: true,
            message: '爱好必填',
            trigger: 'blur'
          }
        ],
        placeholder: '请选择爱好信息',
        options: [
          { label: '打拳', value: '打拳' },
          { label: '蓄意轰拳', value: '蓄意轰拳' },
          { label: '强手裂颅', value: '强手裂颅' }
        ]
      },
      {
        type: 'input',
        label: '姓名',
        value: 'name',
        rules: [
          {
            required: true,
            message: '姓名必填',
            trigger: 'blur'
          }
        ],
        placeholder: '请输入姓名信息'
      },
      {
        type: 'input',
        label: '电话',
        value: 'phone',
        rules: [
          {
            required: true,
            message: '电话必填',
            trigger: 'blur'
          }
        ],
        placeholder: '请输入电话信息'
      },
      {
        type: 'date-picker',
        label: '创建时间',
        value: 'createTime',
        dateOptions: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange',
          rangeSeparator: 'To'
        }
      }
    ];
    const height1 = window.innerHeight - 120;
    const height2 = window.innerHeight - 368;

    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }
    ];
    const seniorResult = (e: IResoult[]) => {
      console.log(e);
    };
    return { searchInfo, seniorFlag, formItems, tableData, height1, height2, seniorResult };
  }
});
</script>

<style scoped lang="less">
.user {
  background: #fff;
  padding: 20px;
  height: calc(100% - 40px);
}
</style>
