export const RoleMapType = {
	0: {
		name: '未知',
		desc: '未知',
        value: 'unkown'
	},
	1: {
		name: '组员',
		desc: '查看案件的权限',
        value: 'member'
	},
    2: {
		name: '管理员',
		desc: '修改案件的权限',
        value: 'admin'
	},
    3: {
		name: '组长',
		desc: '修改组员，案件的权限',
        value: 'leader'
	},
    4: {
        name: '主任',
		desc: '修改组长，案件的权限',
        value: 'director'
    }
}