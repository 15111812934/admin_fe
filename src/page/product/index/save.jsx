import React        from 'react';
import ReactDOM     from 'react-dom';
import {Link}       from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor   from 'util/rich-editor/index.jsx';


import Product      from 'service/product-service.jsx';
import EUtil        from 'util/em.jsx';

const _em=new EUtil();
const _product=new Product();
import  Pagination from 'util/pagination/index.jsx';
import './index.scss';
import './save.scss';

class ProductSave extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           :[],
            detail              :'',
            // name                : product.name,
            // subtitle            : product.subtitle,
            // price               : product.price,
            // stock               : product.stock,
            // status              : product.status
        };
    }
    componentDidMount(){
        
    }
     // 普通字段更新
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value;
        // 更改state
        this.setState({
            [name] : e.target.value
        });
    }
    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId          : categoryId,
            parentCategoryId    : parentCategoryId,
        });
    }
    // 图片上传成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res.data);
        this.setState({
            subImages: subImages
        });
    }
    // 图片上传失败
    onUploadError(err){
        _em.errorTips(err.message);
    }
    // 删除图片
    onDeleteImage(img){
        let subImages   = this.state.subImages,
            imageIndex  = subImages.indexOf(img);
        if(imageIndex >= 0){
            subImages.splice(imageIndex, 1);
        }
        this.setState({
            subImages: subImages
        });
    }
    // 富文本字段更新
    onRichValueChange(newValue){
        this.setState({
            detail: newValue
        });
    }
    render() {
         return (
            <div id="page-wrapper">
                <PageTitle title="添加商品">
                    <div className="f-right">
                        <Link className="m-right-100 " to="/product/index">
                            返回
                        </Link>
                    </div>
                    <div className="page-header-right">
                       
                        <Link className="btn btn-primary" to="/product/save">
                            <i className="fa fa-plus fa-fw"></i>
                            保存商品
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        placeholder="请输入商品名称"
                                        value={this.state.name}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="subtitle"
                                        id="subtitle"
                                        placeholder="请输入商品描述"
                                        value={this.state.subtitle}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                             <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                                <CategorySelector onCategoryChange={(categoryId,parentCategoryId)=>this.onCategoryChange(categoryId,parentCategoryId)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="price" 
                                            placeholder="价格"
                                            name="price"
                                            value={this.state.price}
                                            onChange={(e) => this.onValueChange(e)}/>
                                        <div className="input-group-addon">元</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock" className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="stock" 
                                            name="stock"
                                            placeholder="库存" 
                                            value={this.state.stock}
                                            onChange={(e) => this.onValueChange(e)}/>
                                        <div className="input-group-addon">件</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品图片</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.subImages.length ? this.state.subImages.map((image, index) => {
                                            return (
                                                <div className="sub-img" key={index}>
                                                    <img className="img" src={image.url}/>
                                                    <i className="fa fa-close fa-fw" onClick={this.onDeleteImage.bind(this, image)}></i>
                                                </div>
                                            );
                                        }) : <div className="notice">请上传图片</div>
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10">
                                    <FileUploader onSuccess={(res) => this.onUploadSuccess(res)} onError={(err) => this.onUploadError(err)}/>
                                </div>
                            </div>
                             <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10">
                                    <RichEditor ref="rich-editor" onValueChange={(value) => this.onRichValueChange(value)} placeholder="商品详细信息"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="btn" className="btn btn-xl btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductSave;