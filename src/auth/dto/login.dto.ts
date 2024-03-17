export class LoginDto {
  username: string
  password: string
}

// 角色
const role = [
  {
    name: '超级管理员',
    value: 'admin',
    desc: '拥有所有权限',
    routes: [],  // 导航
    button: []    // 按钮
  },
  {
    name: '班导',
    value: 'bd',
    desc: '拥有管理班级权限',
    routes: [],
    button: []
  },
  {
    name: '学生',
    value: 'xs',
    desc: '拥有查看权限',
    routes: [],
    button: []
  }
]