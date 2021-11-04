import PageContent from '@/components/page-content';
import { ref } from 'vue';
export function usePageSearch(): any[] {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleResetBtnClick = () => {
    pageContentRef.value?.getPageData();
  };
  const handleQueryBtnClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  return [pageContentRef, handleResetBtnClick, handleQueryBtnClick];
}
