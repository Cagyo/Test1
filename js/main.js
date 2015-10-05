require.config({
    paths: {
        jquery: '../lib/vendor/jquery/dist/jquery',
        underscore: '../lib/vendor/underscore/underscore',
        backbone: '../lib/vendor/backbone/backbone',
        handlebars: '../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../lib/vendor/backbone.marionette/lib/backbone.marionette',
        marionette_node: '../node_modules/backbone.marionette/lib/backbone.marionette',
        radio: '../node_modules/backbone.radio/build/backbone.radio',
        application: 'Application',
        order: 'models/Order',
        orders: 'collections/Orders',
        orderView: 'views/orderView',
        book: 'models/Book',
        books: 'collections/Books',
        bookListView: 'views/bookView',
        filterOrderListView: 'views/mainView',
        filterController: 'controllers/mainController',
        orderConstants: 'constants/OrderConstants',
        otherConstants: 'constants/OtherConstants'
    },
    hbs: { // optional
        helpers: true,            // default: true
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: ''           // default: ''
    }
});

require(["jquery","underscore","application"],function($,_,app){
    //var OrderViewer = new Application();
    app.start();
});