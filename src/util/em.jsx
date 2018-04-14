class EUtil{
	request(param){
		return new Promise((resolve,reject) => {
			$.ajax({
				type     : param.type    || 'get',
				url      : param.url     || '',
				dataType : param.dataType || 'json',
				data     : param.data     || null,
				success  : res => {
					// 数据请求成功
					if(0=== res.status){
						typeof resolve === 'function' && resolve(res.data,res.msg);
					}
					//用户未登录,强制登录
					else if(10 === res.status){
						this.doLogin();
					}else{
						typeof reject === 'function' && reject(res.data || res.msg);
					}
				},
				error: err => {
					typeof reject === 'function' && reject(err.statusText);//http对象里的东西
				}
			});
		});
	}
	//跳转登录
	doLogin(){
		let loginUrl = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        	window.location = loginUrl;	
    }
	//获取url参数 如www.xxxx?params1=xx&params2=xxx
	getUrlParam(){
		let queryString=(window.location.search.split('?'))[1] || ' ',//url参数部分
		    reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)"),
		    result=queryString.match(reg); //result:['param=123','','123','&']
		return result ? decodeURLComponent(result[2]):null;
	}
	//成功提示
	successTips(successMsg){
		alert(successMsg || '成功');
	}
	//错误提示
	errTips(errMsg){
		alert(errMsg || '好像哪里不对了');
	}
	//存储内容
	setStorage(name,data){
		let dataType=typeof data;
		//json对象
		if(dataType === 'object'){
			window.localStorage.setItem(name,JSON.stringify(data));
		}
		//基础类型
		else if(['string','number','boolean'] .indexOf(dataType) >=0){
			window.localStorge.setItem(name,data);
		}
		// 其他不支持的类型
		else{
			this.errTips('该类型不支持存储');
		}
	}
	// 取出存储内容
	getStorage(name){
		let data=window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}else{
			return ' ';
		}
	}
	// 删除存储内容
	removeStorage(name){
		window.localStorage.removeItem(name);
	}
}
export  default EUtil;