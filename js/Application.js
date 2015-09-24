define(["jquery","underscore","worker","order","orders","orderView"], function($,_,Worker,Order,Orders,OrderView){

    (function(){
        STATES = {CANCELLED: 0, INPROGRESS: 1, COMPLETED: 2};
        PAYMENTMETHODS = {CASH: 0, CASHLESS: 1};
        function filterEverything(){
            var state = -1;
            if (this.id === 'cancelledOrders') {
                state = 0;
            }
            else if (this.id === 'currentOrders') {
                state = 1;
            }
            else if (this.id === 'completedOrders') {
                state = 2;
            }

            var filteredOrders = orders.filterByState(state);
            if(state === -1) {
                filteredOrders = orders;
            }
            $('#ordersSection').empty();
            orderViews = [];
            filteredOrders.forEach(function(order){
                orderViews.push(new OrderView({model: order}));
            });
            _.forEach(orderViews, function (orderView) {
                $('#ordersSection').append(orderView.el);
            });


            _.each(filters,function (filter){
                $("#"+filter.id).children("a:eq(0)").attr("class","selectedFilterItemUnderlined")
            });
            $("#"+this.id).children("a:eq(0)").attr("class","selectedFilterItem");

        }

        var data;
        $.ajaxSetup({
            async: false
        });

        var json;
        $.getJSON("http://localhost:63342/task1/json/orders.json", data, function(result) {
            json = result;
        });

        orders = new Orders();
        for(var i =0; i<json.orders.length; i++)
        {
            var currentOrder=JSON.parse(JSON.stringify(json.orders[i]));
            currentOrder.items = [];
            currentOrder.id = i+1;
            currentOrder.displaySet = false;
            orders.add(currentOrder,{validate:true});
            _.forEach(json.orders[i].items,function(item){
                orders.get(i+1).addBook(item);
            });
            orders.get(i+1).orderFinished();
        }
        orderViews = [];

        orders.forEach(function(order){
            orderViews.push(new OrderView({model: order}));
        });

        _.forEach(orderViews, function (orderView) {
            $('#ordersSection').append(orderView.el);
        });

        var filters = $("h2");
        _.each(filters, function(filter){
            filter.onclick = filterEverything;
        });
    })();
});