// 作为所有组件的js的集合页
import Vue from 'vue';
import MessageBox from'./MessageBox';

export var messageBox = (function(){
	

	return function(opts){//配置参数
		
		var defaults = { //默认值
			title:'',
			content:'',
			cancel:'',
			ok:'',
			handleCancel:null,
			handleOk:null
		};
		
		var MyComponent = Vue.extend(MessageBox);
		
		
		for(var attr in opts){
			defaults[attr] = opts[attr];
		}
		
		
		var vm = new MyComponent({
			el:document.createElement('div'),
			data:{
				title:defaults.title,
				content:defaults.content,
				cancel:defaults.cancel,
				ok:defaults.ok
			},
			methods:{
				handleCancel(){
					console.log(defaults.handleCancel);
					defaults.handleCancel && defaults.handleCancel.call(this);
					document.body.removeChild(vm.$el);
				},
				handleOk(){
					defaults.handleOk && defaults.handleOk.call(this);
					document.body.removeChild(vm.$el);
				}
			}
		});
		console.log(MyComponent)
		document.body.appendChild(vm.$el);
	};
})();