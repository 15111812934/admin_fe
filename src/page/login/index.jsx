import React from 'react';
import './index.scss';
import User  from 'service/user-service.jsx';
import EUtil from 'util/em.jsx';

const _em=new EUtil();
const _user=new User();


class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:'',
			password:'',
			redirect:_em.getUrlParam('redirect') || '/' //如果没有 就跳到根目录下
		};
	}
	componentWillMount(){
		document.title='登录-EMALL';
	}
	//当输入框中的值发生改变
	onInputChange(e){
		let inputName=e.target.name,
		    inputValue=e.target.value;
		if(inputValue.length !== 0){
			$('.err-item').addClass('hidden').text(' ');
		}
		this.setState({
			[inputName]:inputValue
		});
	}
	onSubmit(e){
		let loginInfo={
			username:this.state.username,
			password:this.state.password
		},
		checkResult=_user.checkLoginInfo(loginInfo);
		if(checkResult.status){
			$('.err-item').addClass('hidden').text(' ');
			_user.login(loginInfo).then((res) =>{
				_em.setStorage('userInfo',res);
				this.props.history.push(this.state.redirect);
			},(errMsg) => {
				_em.errTips(errMsg);
			});
		}else{
			// _em.errTips(checkResult.msg);
			$('.err-item').removeClass('hidden').text(checkResult.msg);
		}
		
	}
	onInputKeyUp(e){
		if(e.keyCode === 13){
			let loginInfo={
				username:this.state.username,
				password:this.state.password
			},
			checkResult=_user.checkLoginInfo(loginInfo);
			if(checkResult.status){
				$('.err-item').addClass('hidden').text(' ');
				_user.login(loginInfo).then((res) =>{
					_em.setStorage('userInfo',res);
					this.props.history.push(this.state.redirect);
				},(errMsg) => {
					_em.errTips(errMsg);
				});
			}else{
				// _em.errTips(checkResult.msg);
				$('.err-item').removeClass('hidden').text(checkResult.msg);
			}
		}
	}
	render(){
		return(
			<div className="col-md-4 col-md-offset-4 ">
				<div className="panel panel-default panel-login">
  					<div className="panel-heading login-header">欢迎登录</div>
  					<div className="panel-body">
    					<div>
    						<div className="err-item hidden" >
                        		<i className="fa fa-minus-circle err-icon"></i>
                        		<div className="err-msg"></div>
                    		</div>
  							<div className="form-group">
    							<input type="text" 
    							    name="username"
    							    className="form-control"
    							    placeholder="请输入用户名"
    							    onKeyUp={e=>this.onInputKeyUp(e)}
    							    onChange={e=>this.onInputChange(e)} />
  							</div>
  							<div className="form-group">
    							<input type="password" 
    								name="password"
    								className="form-control" 
    							 	placeholder="请输入密码" 
    							 	onKeyUp={e=>this.onInputKeyUp(e)}
    							 	onChange={e=>this.onInputChange(e)} />
  							</div>
  							<button className="btn btn-lg btn-block btn-primary"
  					            onClick={e=>this.onSubmit(e)}>
  					            登录
  					        </button>
						</div>
  					</div>
				</div>
			</div>
		);
	}
}
export default Login;