import React from 'react';
import './category-selector.scss';

import Product      from 'service/product-service.jsx';
import EUtil        from 'util/em.jsx';

const _em=new EUtil();
const _product=new Product();

//品类选择器
class CategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state={
			firstCategoryList  :[],
			firstCategoryId    :0,
			secondCategoryList  :[],
            secondCategoryId   :0,
		};
	}
	componentDidMount(){
        this.loadFirstCategoryList();
    }
    //加载一级分类
	loadFirstCategoryList(){
		//请求接口
         _product.getCategory().then((res)=>{
             this.setState({
             	firstCategoryList:res
             });
         },(errMsg)=>{
             _em.errorTips(errMsg);
         });
	}
	onFirstCategoryChange(e){
		let newValue    = e.target.value || 0;
        // 更新一级选中值，并清除二级选中值
        this.setState({
            firstCategoryId     : newValue,
            secondCategoryId    : 0,
            secondCategoryList  : []
        }, () => {
            // 更新二级品类列表
            this.loadSecondCategoryList();
            this.onPropsCategoryChange();
        });
	}
	
	//加载二级分类
	loadSecondCategoryList(){
		// 一级品类不存在时，不初始化二级分类
        if(!this.state.firstCategoryId){
            return;
        }
		//请求接口
         _product.getCategory(this.state.firstCategoryId).then((res)=>{
             this.setState({
             	secondCategoryList:res
             });
         },(errMsg)=>{
             _em.errorTips(errMsg);
         });
	}
	// 二级品类变化
    onSecondCategoryChange(e){
        let newValue    = e.target.value;
        // 更新二级选中值
        this.setState({
            secondCategoryId    : newValue
        },()=>{
        	this.onPropsCategoryChange();
        });
    }
    //传给父组件选中的结果
	onPropsCategoryChange(){
		//判断props里的回调函数是否存在
		let categoryChangeable=typeof  this.props.onCategoryChange === 'function';
		if(this.state.secondCategoryId){
			categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
		}
		//如果只有一级品类
		else{
			this.props.onCategoryChange(this.state.firstCategoryId,0);
		}
	}
	render(){
		return(
			<div className="col-md-10">
                <select type="password" className="form-control cate-select col-md-5" value={this.state.firstCategoryId} onChange={(e) => this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级品类</option>
                    {
                    	this.state.firstCategoryList.map(
                    		(category,index)=><option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
                { this.state.secondCategoryList.length ?
                   (<select type="password" className="form-control cate-select col-md-5" value={this.state.secondCategoryId} onChange={(e) => this.onSecondCategoryChange(e)}>
                    	<option value="">请选择二级品类</option>
                    	{
                    		this.state.secondCategoryList.map(
                    			(category,index)=><option value={category.id} key={index}>{category.name}</option>
                       		)
                    	}
                	</select>) :null
                }
            </div>
		);
	}
}
export default CategorySelector;