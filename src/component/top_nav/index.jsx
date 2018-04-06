import React from 'react';
import { Link } from 'react-router-dom';
import User  from 'service/user-service.jsx';
import EUtil from 'util/em.jsx';

const _em=new EUtil();
const _user=new User();

class TopNav extends React.Component{
	constructor(props){
		super(props);
        this.state={
            username:_em.getStorage('userInfo').username || ''
        }
	}
    // 退出登录
    onLogout(){
        _user.logout().then((res)=>{
            _em.removeStorage('userInfo');
            // this.props.history.push('./login');
            window.location.href='./login';
        },(errMsg)=>{
            _em.errTips(errMsg);
        });
    }
	render(){
		return(
			<div className="navbar navbar-default top-navbar" role="navigation">
            	<div className="navbar-header">
                	<Link className="navbar-brand" to="/"><b>EMALL</b></Link>
            	</div>
				<ul className="nav navbar-top-links navbar-right">
               		<li className="dropdown">
                    	<a className="dropdown-toggle"  href="javascript:;" >
                        	<i className="fa fa-user fa-fw"></i> 
                            { 
                                this.state.username? 
                                <span>欢迎, {this.state.username}</span>
                                :<span>欢迎您！</span>

                            }
                            <i className="fa fa-caret-down"></i>
                    	</a>
                    	<ul className="dropdown-menu dropdown-user">
							<li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i> 
                                    <span> 退出登录</span>
                                </a>
							</li>
                    	</ul>
                   	</li>
               	</ul>
        	</div>
		);
	}
}
export default TopNav;