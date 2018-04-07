import React        from 'react';
import ReactDOM     from 'react-dom';
import {Link}       from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

import Product  from 'service/product-service.jsx';
import EUtil from 'util/em.jsx';

const _em=new EUtil();
const _product=new Product();
import  Pagination from 'util/pagination/index.jsx';

class ProductList extends React.Component{
    construnctor(props) {
        supur(props);
        this.state = {
            list            : [],
            pageNum         : 1
        };
    }
    componentDidMount(){
        this.loadProductList();
    }
    loadProductList(){
        // _product.getProductList(this.state.pageNum).then((res)=>{
        //     this.setState(res);
        // },(errMsg)=>{
        //     this.setState({
        //         list:[]
        //     });
        //     _em.errorTips(errMsg);
        // });
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
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表"/>
                { /*<TableList tableHeads={['ID','用户名','邮箱','电话','注册时间']}>
                   
                       
                </TableList>   */}
            </div>
        );
    }
};

export default ProductList;