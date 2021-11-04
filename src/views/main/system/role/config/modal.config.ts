import { IForm } from '@/base-ui/form';

export const modalConfig: IForm = {
  labelWidth: '80px',
  itemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  pageName: 'role',
  pageGroup: 'system',
  dialogTitle: '新增角色'
};
