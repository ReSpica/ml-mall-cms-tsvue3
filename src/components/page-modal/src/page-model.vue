<template>
  <div class="page-modal">
    <el-dialog :title="modalConfig.dialogTitle" v-model="centerDialogVisible" width="30%" center destroy-on-close>
      <MlForm v-bind="modalConfig" v-model="formData"></MlForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import MlForm from '@/base-ui/form';
import { newUseStore } from '@/store';
export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: { MlForm },
  setup(props) {
    const centerDialogVisible = ref(false);
    const formData = ref<any>({});
    watch(
      () => props.defaultInfo,
      (newValue) => {
        //传来的defaultInfo发生变化就会触发，让formData发生变化，实现页面内容变化
        for (const item of props.modalConfig?.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    //点击确认按钮
    const store = newUseStore();
    const handleConfirmClick = () => {
      centerDialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        //当传来的defaultInfo不是空对象，那就是修改按钮
        console.log('props.otherInfo', props.otherInfo);

        store.dispatch(`${props.modalConfig?.pageGroup}/editPageDataAction`, {
          pageName: props.modalConfig?.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        });
      } else {
        //当传来的defaultInfo是空对象，那就是新增按钮
        console.log('props.otherInfo', props.otherInfo);

        store.dispatch(`${props.modalConfig?.pageGroup}/createPageDataAction`, {
          pageName: props.modalConfig?.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        });
      }
    };
    return { centerDialogVisible, formData, handleConfirmClick };
  }
});
</script>

<style scoped></style>
