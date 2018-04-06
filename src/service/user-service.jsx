import EUtil from 'util/em.jsx';
const _em=new EUtil();

class User{
	// 登录
	login(loginInfo){
		// return 可以链式操作 .then
		return _em.request({
			type :'post',
			url  :'/manage/user/login.do', //这里需要劫持
			data :loginInfo
		});
	}
	// 退出登录
	logout(){
		return _em.request({
			type :'post',
			url  :'/user/logout.do'
		});
	}
	getUserList(pageNum){
		return _em.request({
			type :'post',
			url  :'/manage/user/list.do',
			data :{
				pageNum:pageNum
			}
		});
	}
	//检查登录接口的数据是否合法
	checkLoginInfo(loginInfo){
		let username=$.trim(loginInfo.username),
		    password=$.trim(loginInfo.password);
		//判断用户名是否为空
		if(typeof username !== 'string' || username.length ===0 ){
			return {
				status:false,
				msg:'用户名不能为空'
			};
		}
		//判断密码是否为空
		if(typeof password !== 'string' || password.length ===0 ){
			return {
				status:false,
				msg:'密码不能为空'
			};
		}
		return{
			status:true,
			msg:'验证通过'
		};
	}
	
}
export default User;