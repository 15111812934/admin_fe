import React        from 'react';

import RcPagination from 'rc-pagination';

import 'rc-pagination/dist/rc-pagination.min.css';
import './index.scss';

//通用分页组件
class Pagination extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="row">
				<div className="col-md-12">
					<RcPagination {...this.props} 
				    hideOnSinglePage
				    showQuickJumper/> {/*结构函数 类似于 current={this.props.current } total={this.props.total} */}
				</div>
			</div>
		);
	}
}
export default Pagination;