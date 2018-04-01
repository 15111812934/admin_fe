/*
* @Author: Aley
* @Date:   2018-03-17 21:57:04
* @Last Modified by:   Aley
* @Last Modified time: 2018-03-17 22:37:39
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch,Link } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home   from 'page/home/index.jsx';

class App extends React.Component{
	render(){
		return(
			<Router>
			    <Layout>
			    	<Switch>
						<Route exact path="/" component={Home}/>
						<Route  path="/product" component={Home}/>
						<Route  path="/product-category" component={Home}/>
				</Switch>
			    </Layout>
			</Router>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)

