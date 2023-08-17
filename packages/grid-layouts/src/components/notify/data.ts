export interface ListItem {
  id: string
  avatar: string
  title: string
  titleDelete?: boolean
  datetime: string
  type: string
  read?: boolean
  description: string
  clickClose?: boolean
  extra?: string
  color?: string
}

export interface TabItem {
  key: string
  name: string
  list: ListItem[]
  unreadlist?: ListItem[]
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: 'Item 1',
    list: [
      {
        id: '000000001',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'Title 1',
        description: '',
        datetime: '2017-08-09',
        type: '1',
      },
      {
        id: '000000002',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: 'Title 2',
        description: '',
        datetime: '2017-08-08',
        type: '1',
      },
      {
        id: '000000003',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: 'Title 3',
        description: '',
        datetime: '2017-08-07',
        // read: true,
        type: '1',
      },
      {
        id: '000000004',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Title 4',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000005',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Title 5',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000006',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Title 6',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000007',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Title 7',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000008',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Title 8',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000009',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Title 9',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000010',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Title 10',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
    ],
  },
  {
    key: '2',
    name: 'Item 2',
    list: [
      {
        id: '000000006',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Title 2 - 1',
        description: '',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Title 2 - 2',
        description: '',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Title 2 - 3',
        description:'',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
    ],
  },
  {
    key: '3',
    name: 'Item 3',
    list: [
      {
        id: '000000009',
        avatar: '',
        title: 'Title 3 - 1',
        description: '',
        datetime: '',
        extra: 'extra',
        color: 'info',
        type: '3',
      },
      {
        id: '000000010',
        avatar: '',
        title: 'Title 3 - 1',
        description: '',
        datetime: '',
        extra: 'extra',
        color: 'error',
        type: '3',
      },
      {
        id: '000000011',
        avatar: '',
        title: 'Title 3 - 2',
        description: 'this is a demo and only a demo',
        datetime: '',
        extra: 'extra',
        color: 'error',
        type: '3',
      },
      {
        id: '000000012',
        avatar: '',
        title: 'Title 3 - 3',
        description: '',
        datetime: '',
        extra: 'extra',
        color: 'success',
        type: '3',
      },
    ],
  },
]
