/*
 * @Author: tsingwong 
 * @Date: 2017-11-13 22:18:39 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-19 20:22:53
 */
import './css/index.css';
import './css/black.less';
import './css/nav.scss';
import tsingwong from './tsingwong.js';

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
