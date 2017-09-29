/* global describe: true, before: true */

require('!file-loader?name=[name].[ext]!./view-test.html');
require('../src/static.js');

var chai = require('chai');
var assert = chai.assert;

var jQuery = require('jquery');
var module = require('../src/infographic.js');

describe('InfographicApp', function() {

    before(function() {
        var elt = jQuery('.infographic');
        assert.isDefined(elt);
        jQuery(elt).html('');

        module.InfographicApp.initialize();
    });
});
