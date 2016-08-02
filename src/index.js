/* global jQuery: true */

require('!file?name=[name].[ext]!../static/index.html');
require('./static.js');

// load and apply css
require('!style!css!bootstrap/dist/css/bootstrap.min.css');
require('../static/css/common.css');
require('../static/css/infographic.css');

var jQuery = require('jquery');
var module = require('./infographic.js');

jQuery(document).ready(function() {
    module.InfographicApp.initialize();
});
