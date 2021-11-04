export interface IFormItem {
  type: 'input' | 'select' | 'checkbox' | 'radio' | 'date-picker';
  label: string;
  value: string;
  placeholder?: string;
  rules?: any[];
  options?: IFormOption[];
  dateOptions?: {
    startPlaceholder: string;
    endPlaceholder: string;
    type: string;
    rangeSeparator: string;
  };
}

interface IFormOption {
  label: string;
  value: any;
}

export interface Ilists {
  ref: string;
  value1: string;
  value2: any;
  value3: string;
  isActive: boolean;
  item: any;
  rule: {
    value2: any;
  };
}

//返回值需要类型检测，方便父组件使用
export interface IResoult {
  target: string;
  val: any;
  relation: string;
}
