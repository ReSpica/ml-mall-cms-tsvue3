export const contentTableConfig = {
  propsList: [
    { prop: 'name', label: '名称', minWidth: '' },
    { prop: 'intro', label: '权限', minWidth: '' },
    { prop: 'createAt', label: '创建时间', minWidth: '', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColum: true,
  title: '角色列表',
  // handleSelectChange: (val: any) => {
  //   console.log(val);
  // },
  pageName: 'role',
  pageGroup: 'system',
  showFooter: true
};
