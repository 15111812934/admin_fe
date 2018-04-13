import React        from 'react';
import './index.scss';


//通用分页组件
class TableList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isFirstLoading:true
		};
	}
	componentWillReceiveProps(){
		//列表只有在第一次挂载，isFirstLoading为true,其他为false
		this.setState({
			isFirstLoading:false
		});
	}
	render(){
		//表头信息
		let tableHeader=this.props.tableHeads.map(
			(tableHead,index) => <th key={index}>{tableHead}</th>
		);
		//列表内容
		let listBody=this.props.children;
		let listInfo=(
			<tr >
				<td colSpan={this.props.tableHeads.length} className="text-center ">
				    <div className="page-loading">
				    	{this.state.isFirstLoading ? '正在加载数据...' :'未找到相应的数据'}
				    </div>
			    </td>
			</tr>
		);
		let tableBody=listBody.length>0 ? listBody:listInfo;
		return(
			<div className="row">
					<div className="col-md-12">
						<table className="table table-striped table-border">
							<thead>
								<tr>
									{tableHeader}
								</tr>
							</thead>
							<tbody>
							    {tableBody}
							</tbody>
						</table>
					</div>
				</div>
		);
	}
}
export default TableList;