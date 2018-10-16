import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


function importAll(r) {
    let datas = {};
    r.keys().map((item, index) => { datas[item.replace('./', '')] = r(item); });
    return datas;
}

const images = importAll(require.context('./images/masteries', false, /\.(png|jpe?g|svg)$/));
const styles = importAll(require.context('./css', false, /\.css$/));

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

import 'react-tippy/dist/tippy.css'
import 'react-dropdown/style.css'

import App from './components/App';

var instantLog = console.log
console.instantLog = function (obj) {
    instantLog(JSON.parse(JSON.stringify(obj)));
}

ReactDOM.render((
    <BrowserRouter>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </BrowserRouter>
), document.getElementById('app'));

