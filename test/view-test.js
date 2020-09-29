/* global describe: true, before: true */

require('../src/static.js');

var assert = require('assert');

var jQuery = require('jquery');
var module = require('../src/infographic.js');

describe('InfographicApp', function() {

    before(function() {
        var elt = jQuery('.infographic');
        assert.ok(elt);
        jQuery(elt).html('');

        module.InfographicApp.initialize();
    });
});
