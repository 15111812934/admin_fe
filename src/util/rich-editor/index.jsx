import React        from 'react';
import Simditor     from 'simditor';

import 'simditor/styles/simditor.scss';

class RichEditor extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    loadEditor(){
        this.textarea  = this.refs['textarea'];
        this.editor = new Simditor({
            textarea: $(this.textarea),
            defaultValue: this.props.placeholder,
            upload:{
                url             : '/manage/product/richtext_img_upload.do',
                defaultImage    : '',
                fileKey         :'upload_file'
            }
        });
        // bind event
        this.bindEditorEvent();
    }
    bindEditorEvent(){
        this.editor.on('valuechanged', e => {
            this.props.onValueChange(this.editor.getValue());
        })
    }
    setValue(value){
        this.editor.setValue(value);
    }
    render() {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )           
    }
};

export default RichEditor;