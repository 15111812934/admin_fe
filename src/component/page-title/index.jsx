import React from 'react';

class PageTitle extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		document.title=this.props.title+'-EMALL';
	}
	render(){
		return(
			<div className="row">
			   	<div className="col-md-12">
			   		<h3 className="page-header">{this.props.title}</h3>
			   	    {this.props.children}  {/*把pageTitle转化为容器样的组件*/}
			   	</div>
			</div>
		);
	}
}
export default PageTitle;