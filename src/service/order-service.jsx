import EUtil from 'util/em.jsx';
const _em=new EUtil();

export default class Order{
    // 获取订单列表
    getOrderList(listParam){
        if(listParam.listType == 'list'){
            return _em.request({
                type    :'post',
                url     : '/manage/order/list.do',
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _em.request({
                type    :'post',
                url     : '/manage/order/search.do',
                data    : listParam
            });
        } 
    }
    // 获取订单详情
    getOrderDetail(orderNo){
        return _em.request({
            type    :'post',
            url     : '/manage/order/detail.do',
            data    : {
                orderNo : orderNo || 0
            }
        });
    }
    // 发货
    sendGoods(orderNo){
        return _em.request({
            type    :'post',
            url     : '/manage/order/send_goods.do',
            data    : {
                orderNo : orderNo || 0
            }
        });
    }
}