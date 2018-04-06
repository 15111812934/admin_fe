import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom';
import Statistic  from 'service/statistic-service.jsx';
import EUtil from 'util/em.jsx';

const _em=new EUtil();
const _statistic=new Statistic();
import './index.scss';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userCount:'-',
			productCount:'-',
			orderCount:'-'
		};
	}
	componentDidMount(){
		this.loadCount();
	}
	loadCount(){
		_statistic.getHomeCount().then((res)=>{
			this.setState(res);
		},(errMsg)=>{
			_em.errorTips(errMsg);
		});
	}
	render(){
		return(
			<div id="page-wrapper">
			    <PageTitle title="首页"/>
				<div className="row">
			   		<div className="col-md-4 media-margin-bottom">
			   		  	<Link to='/user' className="color-box brown">
			   		  		<p className="count">{this.state.userCount}</p>
			   		  		<p className="desc">
			   		  			<i className="fa fa-user-o"></i>
			   		  			<span>用户总数</span>
			   		  		</p>
			   		  	</Link>
			   		</div>
			   		<div className="col-md-4 media-margin-bottom">
			   		  	<Link to='/product' className="color-box green">
			   		  		<p className="count">{this.state.productCount}</p>
			   		  		<p className="desc">
			   		  			<i className="fa fa-list"></i>
			   		  			<span>商品总数</span>
			   		  		</p>
			   		  	</Link>
			   		</div>
			   		<div className="col-md-4 media-margin-bottom">
			   		  	<Link to='/order' className="color-box blue">
			   		  		<p className="count">{this.state.orderCount}</p>
			   		  		<p className="desc">
			   		  			<i className="fa fa-check-square-o"></i>
			   		  			<span>订单总数</span>
			   		  		</p>
			   		  	</Link>
			   		</div>
			   </div>
			</div>
		);
	}
}
export default Home;