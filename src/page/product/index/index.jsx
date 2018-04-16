import React        from 'react';
import ReactDOM     from 'react-dom';
import {Link}       from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch    from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';

import Product      from 'service/product-service.jsx';
import EUtil        from 'util/em.jsx';

const _em=new EUtil();
const _product=new Product();
import  Pagination from 'util/pagination/index.jsx';
import './index.scss';

class ProductList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            hasError        : false,
            listType        : 'list'
        };
    }
    componentDidCatch(error, info) {
        // Display fallback UI
            this.setState({ hasError: true });
        // You can also log the error to an error reporting service
            logErrorToMyService(error, info);
  }
    componentDidMount(){
        this.loadProductList();
    }
    loadProductList(){
        var listParam={};
            listParam.listType=this.state.listType,
            listParam.pageNum=this.state.pageNum;
        if(listParam.listType=== 'search'){
            listParam.searchType=this.state.searchType;
            listParam.keyword=this.state.searchKeyword;
        }
        //请求接口
         _product.getProductList(listParam).then((res)=>{
             this.setState(res);
         },(errMsg)=>{
             this.setState({
                 list:[]
             });
             _em.errorTips(errMsg);
         });
    }
    //搜索
    onSearch(searchType,searchKeyword){
        console.log(searchType,searchKeyword);
        let listType=searchKeyword === ''? 'list':'search';
        this.setState({
            listType:listType,
            pageNum:1,
            searchType:searchType,
            searchKeyword:searchKeyword
        },()=>{
            this.loadProductList();
        });
       
    }
    //页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum     : pageNum
        }, () => {  //回调函数
            this.loadProductList();
        });
    }
    //改变商品状态
    onSetProductStatus(e,productId,currentStatus){
        let newStatus   = currentStatus == 1 ? 2:1,
            confirmTips = currentStatus == 1 ? '确定要下架该商品？':'确定要上架该商品?';
        if(window.confirm(confirmTips)){
            _product.setProductStatus({
                productId:productId,
                status:newStatus
            }).then((res)=>{
                _em.successTips(res);
                this.loadProductList();
            },(errMsg)=>{
                 _em.errorTips(errMsg);
            })
        }
    }
    
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        let tableHeads=[
            {name:'商品ID',width:'10%'},
            {name:'商品信息',width:'50%'},
            {name:'价格',width:'10%'},
            {name:'状态',width:'15%'},
            {name:'操作',width:'15%'},
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="商品管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/product/save">
                            <i className="fa fa-plus fa-fw"></i>
                            添加商品
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyword)=>{this.onSearch(searchType,searchKeyword)}}/>
                <TableList tableHeads={ tableHeads }>
                {
                   this.state.list.map((product,index) => {
                        return(
                            <tr key={ index }>
                                <td>{product.id}</td>
                                <td>
                                    <p>{product.name}</p>
                                    <p>{product.subtitle}</p>
                                </td>
                                <td>￥{product.price}</td>
                                <td>
                                    <p>{product.status == 1?'在售':'已下架'} </p>
                                    <button className="btn btn-xs btn-primary" onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>{product.status == 1?'下架':'上架'} </button>
                                </td>
                                <td>
                                    <Link className="opear" to={'/product/detail/${product.id}'}>查看详情</Link>
                                    <Link className="opear" to={'/product/save/${product.id}'}>编辑</Link>
                                </td>
                            </tr>
                        )
                    })
                 }      
                </TableList> 
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
};

export default ProductList;