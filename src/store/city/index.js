const state = {
	nm:window.localStorage.getItem('nowNm') || '北京',
	id: window.localStorage.getItem('nowId') || 1
};

const actions = {
	
};

const mutations = {
	// 这里边的方法一般要大写 表示状态管理的方法
	//  payload 载荷
	CITY_INFO(state , payload){
		state.nm = payload.nm;
		state.id = payload.id;
		
	}
};

export default{
	namespaced:true,
	state,
	actions,
	mutations
}