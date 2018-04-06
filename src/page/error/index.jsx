import React        from 'react';
import ReactDOM     from 'react-dom';
import {Link}       from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';

class ErrorPage extends React.Component{
    construnctor(props) {
        supur(props);
    }
    componentDidMount(){
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="出错啦~"/>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default ErrorPage;