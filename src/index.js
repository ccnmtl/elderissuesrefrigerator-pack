/* global jQuery: true */

require('!file-loader?name=[name].[ext]!../static/index.html');
require('./static.js');

// load and apply css
require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('!style-loader!css-loader!../static/css/common.css');
require('!style-loader!css-loader!../static/css/infographic.css');

var jQuery = require('jquery');
var module = require('./infographic.js');

jQuery(document).ready(function() {
    module.InfographicApp.initialize({'background': 'fridge_print.jpg'});
});
