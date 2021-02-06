/* global describe: true, before: true, it: true */
require('!file-loader?name=[name].[ext]!../test/view-test.html');

require('../src/static.js');

var chai = require('chai');
var assert = chai.assert;

var jQuery = require('jquery');
var module = require('../src/infographic.js');

describe('InfographicApp', function() {

    before(function() {
        var elt = jQuery('.infographic');
        assert.ok(elt);
        jQuery(elt).html('');

        module.InfographicApp.initialize({'background': ''});
    });

    describe('step1 interaction', function() {
        it('initialized', function() {
            assert.isTrue(jQuery('.progressbar-set-initial').is(':visible'));
            assert.equal(jQuery('.item-image').length, 7);
        });
    });
});
