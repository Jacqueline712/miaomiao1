const state = {
	nm:window.localStorage.getItem('name') || '',
	isAdmin:window.localStorage.getItem('isAdmin') || false,
	userHead:''
};

const actions = {
	
};

const mutations = {
	// 这里边的方法一般要大写 表示状态管理的方法
	//  payload 载荷
	USER_NAME(state , payload){
		state.name = payload.name;
		state.isAdmin = payload.isAdmin;
		state.userHead = payload.userHead;
	}
};

export default{
	namespaced:true,
	state,
	actions,
	mutations
}