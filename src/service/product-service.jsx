import EUtil from 'util/em.jsx';
const _em=new EUtil();

class Product{
	getUserList(pageNum){
		return _em.request({
			type :'post',
			url  :'/manage/user/list.do',
			data :{
				pageNum:pageNum
			}
		});
	}
	
	
}
export default Product;