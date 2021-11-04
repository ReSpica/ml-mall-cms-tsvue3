import { ref } from 'vue';
import PageModal from '@/components/page-modal';

type CallbackFn = (_row?: any) => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn): any {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();

  const defaultInfo = ref({});
  const newBtnClick = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
    }
    newCb && newCb();
  };

  const editBtnClick = (_row: any) => {
    defaultInfo.value = { ..._row };
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
    }
    editCb && editCb(_row);
  };
  return [pageModalRef, defaultInfo, newBtnClick, editBtnClick];
}
