import React        from 'react';
import ReactDOM     from 'react-dom';
import {Link}       from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

import Product      from 'service/product-service.jsx';
import EUtil        from 'util/em.jsx';

const _em=new EUtil();
const _product=new Product();
import  Pagination from 'util/pagination/index.jsx';

class ProductList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            hasError        : false
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
         _product.getProductList(this.state.pageNum).then((res)=>{
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
            this.loadProductList();
        });
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表"/>
                <TableList tableHeads={['商品ID','商品信息','价格','状态','操作']}>
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
                                    <span>{product.status == 1?'在售':'已下架'} </span>
                                </td>
                                <td>
                                    <Link to={'./product/detail/${product.id}'}>查看详情</Link>
                                    <Link to={'./product/save/${product.id}'}>编辑</Link>
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