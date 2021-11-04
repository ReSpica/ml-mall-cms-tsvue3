export const contentTableConfig = {
  propsList: [
    { prop: 'name', label: '用户名', minWidth: '' },
    { prop: 'realname', label: '真实姓名', minWidth: '' },
    { prop: 'cellphone', label: '手机号码', minWidth: '' },
    { prop: 'enable', label: '状态', minWidth: '', slotName: 'enable' },
    { prop: 'createAt', label: '创建时间', minWidth: '', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColum: true,
  title: '用户列表',
  // handleSelectChange: (val: any) => {
  //   console.log(val);
  // },
  pageName: 'user',
  pageGroup: 'system',
  showFooter: true
};
