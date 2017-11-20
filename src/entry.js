/*
 * @Author: tsingwong 
 * @Date: 2017-11-13 22:18:39 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-20 16:20:37
 */
import './css/index.css';
import './css/black.less';
import './css/nav.scss';
import tsingwong from './tsingwong.js';

import hmr from './hmr';

import $ from 'jquery';

{
    const a = 'TsingWong~~';
    
    document.getElementById('title').innerHTML = a;
    tsingwong();
    $('#title').on('click', function (e) {
        /* eslint-disable */
        console.log($(this).text());
        /* eslint-enable */
    });
}

import json from '../config.json';

$('.json').text(json.name);

if (module.hot) {
    module.hot.accept('./hmr', () => {
        console.log('hmr js update');
        hmr.log();
    });
}
