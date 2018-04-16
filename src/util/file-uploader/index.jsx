import React        from 'react';
import FileUpload   from './react-fileupload.jsx';
// import FileUpload   from  'react-fileupload';

import EUtil        from 'util/em.jsx';

const _em=new EUtil();

class FileUploader extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount(){

    }
    render() {
        /*set properties*/
        const options={
            baseUrl         : '/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            accept          : 'image/gif,image/jpeg,image/jpg,image/png',
            chooseAndUpload : true,
            dataType        :'json',
            uploadSuccess   : this.props.onSuccess,
            uploadError     : this.props.onError
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">上传图片</button>
            </FileUpload>
        )           
    }
};

export default FileUploader;