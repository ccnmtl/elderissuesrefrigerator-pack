/* global jQuery: true */

require('!file?name=[name].[ext]!../static/index.html');
require('./static.js');

// load and apply css
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootstrap-arrow-buttons/dist/' +
        'css/bootstrap-arrow-buttons.css');
require('../static/css/common.css');
require('../static/css/infographic.css');

var jQuery = require('jquery');
var module = require('./infographic.js');

jQuery(document).ready(function() {
    module.InfographicApp.initialize();
});
