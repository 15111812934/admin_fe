import EUtil from 'util/em.jsx';
const _em=new EUtil();

class Product{
	getProductList(pageNum){
		return _em.request({
			type :'post',
			url  :'/manage/product/list.do',
			data :{
				pageNum:pageNum
			}
		});
	}
	
	
}
export default Product;