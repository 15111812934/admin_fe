import EUtil from 'util/em.jsx';
const _em=new EUtil();

class Product{
	getProductList(listParam){
		var url='',
		    data={};
		if(listParam.listType === 'list'){
			url='/manage/product/list.do';
			data.pageNum=listParam.pageNum;
		}else if(listParam.listType === 'search'){
		var key=listParam.searchType,
            value=listParam.keyword;
			url='/manage/product/search.do';
			data.pageNum=listParam.pageNum;
			data[key]=value;
		}
		return _em.request({
			type :'post',
			url  :url,
			data :data
		});
	}
	//变更商品销售状态
	setProductStatus(productInfo){
		return _em.request({
			type :'post',
			url  :'/manage/product/set_sale_status.do',
			data :productInfo
		});
	}
	// 获取商品信息
    getProduct(productId){
        return _em.request({
        	type    :'post',
            url     : '/manage/product/detail.do',
            data    : {
                productId : productId || 0
            }
        });
    }
	// 保存商品信息
    saveProduct(product){
        return _em.request({
        	type    :'post',
            url     : '/manage/product/save.do',
            data    : product
        });
    }
    // 获取品类
    getCategory(parentCategoryId){
        return _em.request({
        	type    :'post',
            url     : '/manage/category/get_category.do',
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 新增品类
    saveCategory(category){
        return _em.request({
            url     : '/manage/category/add_category.do',
            data    : {
                parentId        : category.parentId    || 0,
                categoryName    : category.categoryName  || ''
            }
        });
    }
    // 更新品类名称
    updateCategoryName(category){
        return _em.request({
        	type    :'post',
            url     : '/manage/category/set_category_name.do',
            data    : category
        });
    }
}
export default Product;