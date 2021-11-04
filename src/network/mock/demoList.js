let demoList = {
  status: 200,
  message: 'success',
  data: {
    total: 100,
    'rows|10': [
      {
        id: '@guid',
        name: '@cname',
        'age|20-30': 23,
        'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
      }
    ]
  }
};

export default {
  'get|/parameter/query': demoList,
  'delete|/parameter/query': () => {
    // 可以在这个地方对demoList进行一系列操作，例如增删改
    return {
      status: 200,
      message: 'success',
      data: demoList
    };
  }
};
