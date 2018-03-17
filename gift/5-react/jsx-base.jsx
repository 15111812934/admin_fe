/*
* @Author: Rosen
* @Date:   2018-01-13 11:27:21
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-13 13:04:52
*/ 
import React from 'react';
import ReactDOM from 'react-dom'; 
 
let name = 'Rosen',
    names = ['Rosen', 'Geely', 'Jimin'];

// 样式
let style = {
    color: 'red',
    fontSize: '30px',
}

// 数据、循环、样式
let app = (
    <div>
        <h1 style={{color: 'r'+'ed'}}>Hello, {name}!</h1>
        <ul>
            {
                names.map((name, index) => <li key={index}>Hello, I am {name}!</li>)
            }
        </ul>
    </div>
);

ReactDOM.render(
    app,
    document.getElementById('app')
);