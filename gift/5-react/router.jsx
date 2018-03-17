// 浏览器 Router
window.location.href = 'http://www.baidu.com';
history.back();

// hash Router
window.location.href = '#test'
window.onhashchange = function(){
    document.querySelector('#app').innerHTML = '当前Hash:' + window.location.hash;
}


// H5 Router
history.pushState('test', 'Title', '/dist/test.html')
window.onpopstate = function(e){
    console.log(e)
    console.log(window.location.href);
    document.querySelector('#app').innerHTML = '当前state:' + e.state;
}


import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 


// Router

class A extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return <div>
            Component A
            <Switch>
                <Route exact path={`${this.props.match.path}`} render={() => {
                    return <div>当前组件: A本身</div>
                }}/>
                <Route  path={`${this.props.match.path}/sub1`} render={() => {
                    return <div>当前组件: Sub1</div>
                }}/>
                <Route  path={`${this.props.match.path}/sub2`} render={() => {
                    return <div>当前组件: Sub2</div>
                }}/>
                <Route path={`${this.props.match.path}/:id`} render={(route) => {
                    return <div>当前组件: 带参数的A本身，参数为：{route.match.params.id}</div>
                }}/>
            </Switch>
        </div>
    }
}

class B extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return <div>
            Component B
        </div>
    }
}

class Wrapper extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return <div>
            <Link to="/a">组件A</Link>
            <br/>
            <Link to="/a/sub1">子组件Sub1</Link>
            <br/>
            <Link to="/a/sub2">子组件Sub2</Link>
            <br/>
            <Link to="/a/123">带参数的A</Link>
            <br/>
            <Link to="/b">组件B</Link>
            <hr/>
            {this.props.children}
        </div>
    }
}

ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path="/a" component={A}/>
            <Route path="/b" component={B}/>
        </Wrapper>
    </Router>,
    document.getElementById('app')
);