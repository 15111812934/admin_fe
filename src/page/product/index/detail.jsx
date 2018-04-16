import React        from 'react';
import { Link }     from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';

import Product      from 'service/product-service.jsx';
import EUtil        from 'util/em.jsx';

const _em=new EUtil();
const _product=new Product();

class ProductDetail extends React.Component{
	render(){
		return(
            <div id="page-wrapper">
                <PageTitle title="商品详情">
                    <div className="f-right">
                        <Link  to="/product/index">
                            返回
                        </Link>
                    </div>
                </PageTitle>
            </div>
        );
	}
}
export default ProductDetail;