import EUtil from 'util/em.jsx';
const _em=new EUtil();

class Statistic{
	getHomeCount(){
		return _em.request({
			type :'get',
			url  :'/manage/statistic/base_count.do'
		});
	}
	
	
}
export default Statistic;