/*
* @Author: Aley
* @Date:   2018-03-17 21:57:04
* @Last Modified by:   Aley
* @Last Modified time: 2018-03-17 22:37:39
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch,Link } from 'react-router-dom';

import Layout        from 'page/layout/index.jsx';
import Home          from 'page/home/index.jsx';
import ProductRouter from 'page/product/index.jsx';
import Login         from 'page/login/index.jsx';
import UserList      from 'page/user/index.jsx';
import ErrorPage     from 'page/error/index.jsx';
import OrderList        from 'page/order/index.jsx';
import OrderDetail      from 'page/order/detail.jsx';

class App extends React.Component{
	render(){
		let LayoutRouter=(
			<Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/product(.category)?(/*)?" component={ProductRouter}/>
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect from="/user(/*)" to="/user/index"/>
                    <Redirect exact from="/order" to="/order/index"/>
                    <Route path="*" component={ErrorPage}/>
                </Switch>
            </Layout>
		);
		return(
			<Router>
            	<Switch>
                	<Route path="/login" component={Login}/>
                	<Route path="/" render={() => LayoutRouter }/>
            	</Switch>
        	</Router>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)

