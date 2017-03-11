require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.css');
require('../less/index.less');

import $ from 'jquery';
import 'bootstrap';
import 'jquery-form';
import 'jquery.cookie';

import str from './content.js';

$(function () {
    const $p = $('p.js-test-content', $('body'));
    $p.text(str);
});
