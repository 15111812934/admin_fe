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
    getCategoryList(parentCategoryId){
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
    checkProduct(product){
        let result={
            status:true,
            msg:'验证通过'
        }
        // 判断商品名称为空
        if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断商品描述为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 判断商品品类
        if(typeof product.categoryId !== 'number' ||!(product.categoryId >0) ){
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格
        if(typeof product.price !== 'number' || !(product.price>=0)){
            return {
                status: false,
                msg: '请填入正确的商品价格'
            }
        }
        // 判断商品库存
        if(typeof product.stock !== 'number' || !(product.stock>=0)){
            return {
                status: false,
                msg: '请填入正确的商品库存！'
            }
        }
        return result;
    }
}
export default Product;