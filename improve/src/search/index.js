'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../images/logo.png';
import './index.less';

class Search extends React.Component {

    render() {
        return <div className="search-text">
            搜索文字的内容<img src={ logo }  style={{width: '200px',border: "1px solid #ddd"}}/>
        </div>;
    }
}



ReactDOM.render(
    <Search />,
    document.getElementById('root')
);