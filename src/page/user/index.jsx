import React     from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link }  from 'react-router-dom';

import User         from 'service/user-service.jsx';
import TableList    from 'util/table-list/index.jsx';
import EUtil        from 'util/em.jsx';

const _em=new EUtil();
const _user=new User();
import  Pagination from 'util/pagination/index.jsx';

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            list            : [],
            pageNum         : 1
        };
	}
	componentDidMount(){
		this.loadUserList();
	}
	loadUserList(){
		_user.getUserList(this.state.pageNum).then((res)=>{
			this.setState(res);
		},(errMsg)=>{
			this.setState({
				list:[]
			});
			_em.errorTips(errMsg);
		});
	}
	//页数发生变化的时候
	onPageNumChange(pageNum){
        this.setState({
            pageNum     : pageNum
        }, () => {  //回调函数
            this.loadUserList();
        });
    }
	render(){
		return(
			<div id="page-wrapper">
				<PageTitle title="用户列表"/>
				<TableList tableHeads={['ID','用户名','邮箱','电话','注册时间']}>
                {
                   this.state.list.map((user,index) => {
                        return(
                            <tr key={ index }>
                                <td>{ user.id }</td>
                                <td>{ user.username }</td>
                                <td>{ user.email }</td>
                                <td>{ user.phone }</td>
                                <td>{ new Date(user.createTime).toLocaleString() }</td>
                            </tr>
                        )
                    })
                 }      
                </TableList> 
				<Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
			</div>
		);
	}
}
export default UserList;