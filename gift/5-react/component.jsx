import React from 'react';
import ReactDOM from 'react-dom'; 

// function形式的组件
function Component(props){
    return <h1 className="title">{props.name}</h1>
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);

// ES6组件
class Component extends React.Component{
    render(){
        return <h1 className="title">{props.name}</h1>
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);


// status && props
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            age: 18
        }
    }
    render(){
        return (
        <div>
            <h1 className="title">{this.props.name}</h1>
            <p className="content">I am {this.state.age} years old.</p>
        </div>
        );
    }
}
ReactDOM.render(
    // new Component({name:test}).render() 声明式组件
    <Component name="Rosen"/>,
    document.getElementById('app')
);

// status && props
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            age: 18,
            upperName : props.name.toUpperCase()
        }
    }
    render(){
        return (
        <div>
            <h1 className="title">{this.props.name}</h1>
            <p className="content">I am {this.state.age} years old.</p>
            <p className="content">My name is {this.state.upperName}.</p>
        </div>
        );
    }
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'Rosen'
        }
    }
    render(){
        setTimeout(()=>{
            this.setState({name: 'Hahaha'});
        },2000);
        return (
        <div className="app-wrap">
            <Component name={this.state.name}/>
        </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

// 事件处理1
class Component extends React.Component{
    // props && state
    constructor(props){
        super(props);
        this.state = {
            age: 18
        }
        this.handleClick = this.handleClick.bind(this) //改变作用域
    }
    handleClick(){
        this.setState({
            age: this.state.age + 1
        })
    }
    render(){
        return (
        <div>
            <h1 className="title">{this.props.name}</h1>
            <p className="content">I am {this.state.age} years old.</p>
            <button onClick={this.handleClick}>加一岁</button>
        </div>
        );
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);


// 事件处理2
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            age: 18

        }
    }
    handleClick(e){
        console.log('按钮出发');
        this.setState({
            age: this.state.age + 1
        });
    }
    onValueChange(e){
        let count = parseInt(e.target.value);
        console.log('输入触发')
        this.setState({
            age: count >= 0 ? count : 18
        });
    }
    render(){
        return (
        <div>
            <h1 className="title">{this.props.name}</h1>
            <p className="content">I am {this.state.age} years old.</p>
            <button onClick={(e) => this.handleClick(e)}>加一岁</button>
            <br/>
            <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
        </div>
        );
    }
}
ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);


// 嵌套关系
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            age: 18

        }
    }
    handleClick(event){
        this.setState({
            age: this.state.age + 1
        })
    }
    render(){
        return (
        <div>
            <h1 className="title">{this.props.name}</h1>
            <p className="content">I am {this.state.age} years old.</p>
            <button onClick={(e) => this.handleClick(e)}>加一岁</button>
        </div>
        );
    }
}
class Title extends React.Component{
    render(){
        return (
        <div className="title">
            <p className="wrap-border">==============</p>
            {this.props.children}
            <p className="wrap-border">==============</p>
        </div>
        );
    }
}

class App extends React.Component{
    render(){
        return (
        <div>
            <Title>
                <p className="text">个人信息</p>
            </Title>
            <Component name="Rosen"/>
        </div>
        );
    }
}

ReactDOM.render(
    // new Component({name:test}).render() 声明式组件
    <App />,
    document.getElementById('app')
);


// 子组件修改父组件状态
class Child extends React.Component{
    constructor(props){
        super(props);
    }
    changeFatherBgColor(event){
        this.props.onBgColorChange('blue');
    }
    render(){
        return (
        <div style={{background:'#ccc',border: '2px dashed #fff'}}>
            <p>子组件</p>
            <p className="content">外层背景色：{this.props.bgColor}</p>
            <button onClick={(e) => this.changeFatherBgColor(e)}>更换外层背景色</button>
        </div>
        );
    }
}

class Father extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bgColor: '#999'
        }
    }
    onBgColorChange(color){
        this.setState({
            bgColor: color
        });
    }
    render(){
        return (
        <div style={{background: this.state.bgColor,padding: '10px'}}>
            <p>父组件</p>
            <Child bgColor={this.state.bgColor} onBgColorChange={(color) => {this.onBgColorChange(color)}}/>
        </div>
        );
    }
}

ReactDOM.render(
    <Father />,
    document.getElementById('app')
);