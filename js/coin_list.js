function getCoins(metal) {
    var metal_string = metalNumberToString(metal);
    var callback = {
        done: function (items) {
            var i;
            for (i = 0; i < items.length; i++) {
                createCoinRow(items[i].id, items[i]._serverData);
            }
        }
    };
    viewStackItemsWithMetalType(callback, metal_string);
}

function generateCoinList(metal) {
    getCoins(metal);
}
