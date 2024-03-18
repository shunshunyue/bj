export class LoginDto {
  username: string
  password: string
}

// 角色
export const roles = {
  "超级管理员": {
    name: '超级管理员',
    value: 'admin',
    desc: '拥有所有权限',
    routes: [],  // 导航
    button: []    // 按钮
  },
  "班导": {
    name: '班导',
    value: 'bd',
    desc: '拥有管理班级权限',
    routes: ["user"],
    button: ["userC", "userD"]
  },
  "学生": {
    name: '学生',
    value: 'xs',
    desc: '拥有查看权限',
    routes: [],
    button: []
  }
}

