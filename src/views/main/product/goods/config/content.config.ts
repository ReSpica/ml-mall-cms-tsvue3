export const contentTableConfig = {
  propsList: [
    { prop: 'name', label: '商品名称', minWidth: '' },
    { prop: 'oldPrice', label: '原价钱', minWidth: '', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价钱', minWidth: '', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '图片', minWidth: '', slotName: 'imgUrl' },
    { prop: 'status', label: '状态', minWidth: '', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColum: true,
  title: '商品列表',
  // handleSelectChange: (val: any) => {
  //   console.log(val);
  // },
  pageName: 'good',
  pageGroup: 'product',
  showFooter: true
};
