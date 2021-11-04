export const contentTableConfig = {
  propsList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单跳转地址', minWidth: '' },
    { prop: 'icon', label: '菜单图标', minWidth: '' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '220', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '220', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColum: false,
  title: '菜单列表',
  // handleSelectChange: (val: any) => {
  //   console.log(val);
  // },
  pageName: 'menu',
  pageGroup: 'system',
  childrenProps: {
    rowKey: 'id',
    children: 'children'
  },
  showFooter: false
};
