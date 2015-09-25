define(["jquery","underscore","backbone","book","books","templates/helpers/priceWithDiscount"],function($,_,Backbone,Book, Books, priceWithDiscount){

            var Order = Backbone.Model.extend({
                validate:true,
                defaults: {
                    orderNumber: "",
                    date: "01.01.2015",
                    state: 2,
                    name: "",
                    address: "",
                    telephone: "",
                    paymentMethod: 0,
                    display: false,
                    displaySet: false,
                    summary: 0,
                    priceDelivery: 0,
                    receivedBonuses: 0,
                    items: new Books
                },
                setState: function(state){
                    this.state = state;
                },

                toggleDisplay: function(){
                    this.display = true;
                },

                getSum: function(){
                    var sum = 0;
                    this.attributes.items.forEach(function (item) {
                        sum += priceWithDiscount(item.get("price"),item.get("discount"));
                    });
                    return sum;
                },

                orderFinished: function () {
                    this.set("summary",this.getSum());
                },

                addBook: function (bookInformation) {
                    this.get("items").add(bookInformation);
                },

                validate: function(attributes){
                    if(attributes.summary < 0)
                        return "Error! Summary less than 0.";
                },

                initialize: function(){
                    this.on('change:display', function (e) {
                        console.log(e);
                    });
                    this.on("invalid", function(model, error){
                        alert( error );
                    });
                }
            });
        return Order;
    }
);