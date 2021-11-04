<template>
  <el-card class="select-form">
    <div class="content">
      <template v-for="(row, i) in lists" :key="i">
        <el-form :model="row" :rules="row.rule" :ref="row.ref" style="margin: 6px 0px">
          <el-row>
            <el-col :span="4" class="row-left">
              <el-checkbox v-model="row.isActive"></el-checkbox>
              <el-select v-model="row.value1" @change="(e) => value1Change(e, row)" placeholder="请选择搜索字段">
                <el-option v-for="(item, j) in formItems" :key="j" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="row-right">
              <el-form-item prop="value2">
                <el-input v-if="row.item.type === 'input'" v-model="row.value2" :placeholder="row.item.placeholder" style="width: 100%"></el-input>
                <el-select v-if="row.item.type === 'select'" v-model="row.value2" :placeholder="row.item.placeholder" style="width: 100%">
                  <el-option v-for="(val, k) in row.item.options" :key="k" :label="val.label" :value="val.value"></el-option>
                </el-select>
                <el-date-picker v-if="row.item.type === 'date-picker'" v-bind="row.item.dateOptions" v-model="row.value2" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="row-right">
              <el-select v-model="row.value3" placeholder="搜索关系" style="width: 100%">
                <el-option label="和" value="and"></el-option>
                <el-option label="或者" value="or"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="row-icon">
              <el-button icon="el-icon-delete" size="small" @click="delRow(row, i)"></el-button>
              <el-button icon="el-icon-plus" size="small" @click="addRow" v-if="lists.length === i + 1"></el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </div>

    <div class="pull">
      <el-button size="small" type="info" @click="clear(row, i)">重置</el-button>
      <el-button size="small" type="primary" @click="search">高级搜索</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, nextTick } from 'vue';
import type { IFormItem, Ilists, IResoult } from '../types';
import { ElForm } from 'element-plus';

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [] //数组对象的默认值需要用方法的方式写
    }
  },
  setup(props, content) {
    //循环列表
    const a: Ilists[] = [
      {
        ref: 'form' + new Date().getTime(),
        value1: props.formItems[0].value,
        value2: '',
        value3: 'and',
        isActive: true,
        item: { type: 'input', placeholder: props.formItems[0].placeholder ?? '请输入', options: [] },
        rule: {
          value2: props.formItems[0].rules ?? [
            {
              required: true,
              message: '必填',
              trigger: 'blur'
            }
          ]
        }
      }
    ];
    const lists: Ilists[] = reactive(a);

    //存放所有的form的ref
    const refObj: any = {};
    refObj[`${lists[0].ref}`] = ref<InstanceType<typeof ElForm>>(); //存放默认第一条数据的ref

    //列表第一项下拉框发生改变
    const value1Change = (e: any, _row: any) => {
      console.log(_row.ref);
      console.log(refObj);
      refObj[_row.ref].value?.resetFields(); //清空当前表单内容和验证问题
      _row.value2 = '';
      _row.rule.value2 = []; //清空第二个输入框的规则
      const one = props.formItems.find((item) => item.value === e); //找到当前下拉框的内容
      _row.item = one; //赋值到当前row的item里面
      _row.rule.value2 = one?.rules; //当前row的规则要都等于所选的内容的rule
    };

    //删除row
    const delRow = (_row: any, _idx: number) => {
      if (_idx !== 0) {
        lists.splice(_idx, _idx);
      }
    };

    //添加row
    const addRow = () => {
      const newRef = 'form' + new Date().getTime();
      refObj[newRef] = ref<InstanceType<typeof ElForm>>();
      nextTick(() => {
        lists.push({
          ref: newRef,
          value1: props.formItems[0].value,
          value2: '',
          value3: 'and',
          isActive: true,
          item: { type: 'input', placeholder: '请输入', options: [] },
          rule: {
            value2: props.formItems[0].rules ?? [
              {
                required: true,
                message: '必填',
                trigger: 'blur'
              }
            ]
          }
        });
      });
    };

    //重置
    const clear = () => {
      //把除了第一条都删了，第一条情况数据
      const n = lists.length - 1;
      for (let i = 0; i < n; i++) {
        lists.pop();
      }
      lists[0].value1 = '';
      lists[0].value2 = '';
      lists[0].value3 = '和';

      //把除了第一个ref，都删了
      Object.keys(refObj).forEach((key) => {
        if (key !== lists[0].ref) {
          delete refObj[key];
        }
      });
    };
    //高级搜索
    const search = () => {
      if (document.getElementsByClassName('el-form-item__error').length > 0) return;
      const choseRow = lists.filter((item) => item.isActive);
      const result: IResoult[] = choseRow.map((item) => {
        return {
          target: item.value1,
          val: item.value2,
          relation: item.value3
        };
      });
      console.log('高级搜索选择结果如下：', result);
      content.emit('seniorResult', result);
    };
    return { lists, value1Change, ...refObj, delRow, addRow, clear, search };
  }
});
</script>

<style scoped lang="less">
.select-form {
  position: relative;
  background-color: #e9eef365;
  .content {
    height: 200px;
    overflow: auto;
  }
  .el-col {
    padding: 0 5px;
    height: 42px;
  }
  .row-left {
    display: flex;
    & > .el-select {
      flex: 1;
      margin-left: 5px;
    }
  }
  .pull {
    position: absolute;
    right: 30px;
    bottom: 20px;
  }
}
</style>
