/* global jQuery: true, module: true */

jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var models = require('./models.js');
window.jQuery = window.$ = jQuery;
require('bootstrap');

var InfographicView = Backbone.View.extend({
    events: {
        'hover #imageMapArea area': 'onHover',
        'click #imageMapArea area': 'onClick',
    },
    initialize: function(options) {
        _.bindAll(this, 'render', 'progress', 'onHover', 'onClick',
                  'beforeUnload');

        var self = this;
        this.template = require('../static/templates/page.html');

        var data = require('../static/json/items.json');
        this.items = new models.ItemList(data);

        for (var i = 0; i < this.items.length; i++) {
            this.items.at(i).bind('change', self.render);
        }

        jQuery('.btn-print').click(this.onPrint);
        jQuery(window).on('beforeunload', this.beforeUnload);

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
    onHover: function(evt) {
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
            el: jQuery('.infographic')
        });

        jQuery('body').show();
    }
};

module.exports.InfographicApp = InfographicApp;
