/* global jQuery: true, module: true */

jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var models = require('./models.js');
window.jQuery = window.$ = jQuery;
require('bootstrap');

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var InfographicView = Backbone.View.extend({
    events: {
        'mouseover #imageMapArea area': 'onMouseOver',
        'mouseout #imageMapArea area': 'onMouseOut',
        'click #imageMapArea area': 'onClick',
    },
    initialize: function(options) {
        _.bindAll(this, 'render', 'progress', 'onMouseOver', 'onMouseOut',
                'onClick', 'beforeUnload');

        var self = this;
        this.template = require('../static/templates/page.html');

        var data = require('../static/json/items.json');
        this.items = new models.ItemList(data);

        for (var i = 0; i < this.items.length; i++) {
            this.items.at(i).bind('change', self.render);
        }

        jQuery('.btn-print').click(this.onPrint);

        var quiet = getUrlParameter('quiet') === '1';
        if (!quiet) {
            jQuery(window).on('beforeunload', this.beforeUnload);
        }

        this.render();
    },
    progress: function() {
        var pct = this.items.clicked() / this.items.length;
        return Math.round(100 * pct);
    },
    render: function() {
        var context = {
            'items': this.items.toTemplate(),
            'clicked': this.items.clicked(),
            'shim': './shim.gif',
            'percentDone': this.progress()
        };

        var markup = this.template(context);
        jQuery(this.el).html(markup);

        this.maybeComplete();
    },
    onMouseOut: function(evt) {
        var itemContent = jQuery(evt.target).attr('href');
        var itemPosition = 'item-position-' + itemContent;
        var itemImage = 'item-image-' + itemContent;
        jQuery('#' + itemPosition).removeClass(itemImage + '-hover');
    },
    onMouseOver: function(evt) {
        var itemContent = jQuery(evt.target).attr('href');
        var itemPosition = 'item-position-' + itemContent;
        var itemImage = 'item-image-' + itemContent;
        jQuery('#' + itemPosition).addClass(itemImage + '-hover');
    },
    onClick: function(evt) {
        evt.preventDefault();
        var $elt = jQuery(evt.target);
        var item = this.items.getByDataId($elt.data('id'));
        item.set('clicked', true);

        var $modal = this.$el.find('#item-modal');
        $modal.find('.modal-title').html(item.get('label_name'));
        $modal.find('.item-thumbnail')
            .attr('id', 'thumbnail-' + item.get('label'));
        $modal.find('.item-content').html(item.get('content'));
        $modal.modal({});

        return false;
    },
    onPrint: function(evt) {
        evt.preventDefault();
        window.print();
        return false;
    },
    maybeComplete: function() {
        if (this.items.clicked() === this.items.length) {
            jQuery('.activity-complete').show();
        }
    },
    beforeUnload: function() {
        if (jQuery('.activity-complete:hidden').length > 0) {
            return 'The activity is not complete. ' +
                'Your progress will not be saved if you leave this page.';
        }
    }
});

var InfographicApp = {
    initialize: function(options) {
        var infographicView = new InfographicView({
            el: jQuery('.infographic-container')
        });

        jQuery('.interactive-container').show();
    }
};

module.exports.InfographicApp = InfographicApp;
