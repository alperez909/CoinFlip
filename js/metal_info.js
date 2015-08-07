function getMetalInformation(metal) {
    var all_metal_arr = getMetalBidAsk(metal);
    var metal_arr = all_metal_arr[0];

    metal_date[metal] = metal_arr[0];
    metal_ask_price[metal] = metal_arr[6].toFixed(2);
    metal_bid_price[metal] = metal_arr[5].toFixed(2);
    metal_pct_chg[metal] = (getMetalChange(all_metal_arr) * 100).toFixed(2);
}

function getMetalChange(all_metal_arr) {
    var curr = all_metal_arr[0][6].toFixed(2);
    var last = all_metal_arr[1][6].toFixed(2);

    return (curr - last) / last;
}

function getMetalBidAsk(metal) {
    var url = metal_bidask_url[metal];

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    //  metal_prices[metal] = getBidAvg(xmlHttp.response);

    return JSON.parse(xmlHttp.response).data;
}

function getBidAvg(resp) {
    var arr = [];
    var i;
    var obj = JSON.parse(resp);

    for (i = 0; i < new Date().getMonth(); i++) {
        arr.push(obj.data[i][5].toFixed(2));
    }
    for (i = 0; i < 7 - new Date().getMonth(); i++) {
        arr.push(null);
    }


    return arr;
}

function generateGoldHeader() {
    document.getElementById("goldHeader").innerHTML =
        "Gold <small><i>Last updated " + metal_date[GOLD] + "</i></small>" +
        "<svg class=\"icon icon-play-arrow\"><symbol id=\"icon-play-arrow1\" viewBox=\"0 0 1024 1024\">" +
        "<title>play-arrow</title>" + "<path class=\"path1\" d=\"M341.333 213.333v597.333l469.333-298.667z\"></path>" +
        "</symbol><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-arrow1\"></use></svg>";
}

function generateSilverHeader() {
    document.getElementById("silverHeader").innerHTML =
        "Silver <small><i>Last updated " + metal_date[SILVER] + "</i></small>" +
        "<svg class=\"icon icon-play-arrow\"><symbol id=\"icon-play-arrow1\" viewBox=\"0 0 1024 1024\">" +
        "<title>play-arrow</title>" + "<path class=\"path1\" d=\"M341.333 213.333v597.333l469.333-298.667z\"></path>" +
        "</symbol><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-arrow1\"></use></svg>";
}

function generatePlatHeader() {
    document.getElementById("platHeader").innerHTML = "Platinum <small><i>Last updated " + metal_date[PLATINUM] + "</i></small>" +
        "<svg class=\"icon icon-play-arrow\"><symbol id=\"icon-play-arrow1\" viewBox=\"0 0 1024 1024\">" +
        "<title>play-arrow</title>" + "<path class=\"path1\" d=\"M341.333 213.333v597.333l469.333-298.667z\"></path>" +
        "</symbol><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-arrow1\"></use></svg>";
}

function generateCurrentSpotHeader(metal) {
    document.getElementById("current-spot").innerHTML = "Current Spot <small><i>Last updated " + metal_date[metal] + "</i></small>";
}

function generatePlatStats() {
    var plat_ask_price_el = document.createElement("td");
    plat_ask_price_el.innerHTML = metal_ask_price[PLATINUM];

    var plat_bid_price_el = document.createElement("td");
    plat_bid_price_el.innerHTML = metal_bid_price[PLATINUM];

    var plat_change_price_el = document.createElement("td");

    plat_change_price_el.innerHTML = (parseFloat(metal_pct_chg[PLATINUM]) >= 0 ? "+" : "") + metal_pct_chg[PLATINUM] + "%";
    plat_change_price_el.className = (parseFloat(metal_pct_chg[PLATINUM]) >= 0 ? "pos-change" : "neg-change");

    var plat_numbers_row = document.createElement("tr");
    plat_numbers_row.appendChild(plat_ask_price_el);
    plat_numbers_row.appendChild(plat_bid_price_el);
    plat_numbers_row.appendChild(plat_change_price_el);

    var platDataTable = document.getElementById("platData");
    platDataTable.insertBefore(plat_numbers_row, platDataTable.firstChild);
}

function generateMetalStats(metal) {
    var metal_ask_price_el = document.createElement("td");
    metal_ask_price_el.innerHTML = metal_ask_price[metal];

    var metal_bid_price_el = document.createElement("td");
    metal_bid_price_el.innerHTML = metal_bid_price[metal];

    var metal_change_price_el = document.createElement("td");

    metal_change_price_el.innerHTML = (parseFloat(metal_pct_chg[metal]) >= 0 ? "+" : "") + metal_pct_chg[metal] + "%";
    metal_change_price_el.className = (parseFloat(metal_pct_chg[metal]) >= 0 ? "pos-change" : "neg-change");

    var metal_numbers_row = document.createElement("tr");
    metal_numbers_row.appendChild(metal_bid_price_el);
    metal_numbers_row.appendChild(metal_ask_price_el);
    metal_numbers_row.appendChild(metal_change_price_el);

    var metalDataTable = document.getElementById("metalData");
    metalDataTable.insertBefore(metal_numbers_row, metalDataTable.firstChild);
}

function generateGoldStats() {
    var gold_ask_price_el = document.createElement("td");
    gold_ask_price_el.innerHTML = metal_ask_price[GOLD];

    var gold_bid_price_el = document.createElement("td");
    gold_bid_price_el.innerHTML = metal_bid_price[GOLD];

    var gold_change_price_el = document.createElement("td");

    gold_change_price_el.innerHTML = (parseFloat(metal_pct_chg[GOLD]) >= 0 ? "+" : "") + metal_pct_chg[GOLD] + "%";
    gold_change_price_el.className = (parseFloat(metal_pct_chg[GOLD]) >= 0 ? "pos-change" : "neg-change");

    var gold_numbers_row = document.createElement("tr");
    gold_numbers_row.appendChild(gold_ask_price_el);
    gold_numbers_row.appendChild(gold_bid_price_el);
    gold_numbers_row.appendChild(gold_change_price_el);

    var goldDataTable = document.getElementById("goldData");
    goldDataTable.insertBefore(gold_numbers_row, goldDataTable.firstChild);
}

function generateSilverStats() {
    var silver_ask_price_el = document.createElement("td");
    silver_ask_price_el.innerHTML = metal_ask_price[SILVER];

    var silver_bid_price_el = document.createElement("td");
    silver_bid_price_el.innerHTML = metal_bid_price[SILVER];

    var silver_change_price_el = document.createElement("td");

    silver_change_price_el.innerHTML = (parseFloat(metal_pct_chg[SILVER]) >= 0 ? "+" : "") + metal_pct_chg[SILVER] + "%";
    silver_change_price_el.className = (parseFloat(metal_pct_chg[SILVER]) >= 0 ? "pos-change" : "neg-change");

    var silver_numbers_row = document.createElement("tr");
    silver_numbers_row.appendChild(silver_ask_price_el);
    silver_numbers_row.appendChild(silver_bid_price_el);
    silver_numbers_row.appendChild(silver_change_price_el);

    var silverDataTable = document.getElementById("silverData");
    silverDataTable.insertBefore(silver_numbers_row, silverDataTable.firstChild);
}

function metalNumberToString(metal_num) {
    if (metal_num == GOLD)
        return "Gold";
    else if (metal_num == SILVER)
        return "Silver";
    else
        return "Platinum";
}

function getUserMetalTotal(metal) {
    var callback = {
        done: function (items) {
            var i = 0;
            var obj;
            for (i = 0; i < items.length; i++) {
                obj = items[i]._serverData;
                var tot = obj.qty * (obj.premium + obj.unit_price);
                if (obj.metal == "Gold") {
                    metal_totals[GOLD] += tot;
                } else if (obj.metal == "Silver") {
                    metal_totals[SILVER] += tot;

                } else if (obj.metal == "Platinum") {
                    metal_totals[PLATINUM] += tot;

                }
            }
            displayTotalCoinValue(current_metal);
        }
    };
    viewStackItems(callback);
}

function displayTotalCoinValue(metal) {
    var total;
    if (!metal)
        total = metal_totals[GOLD] + metal_totals[SILVER] + metal_totals[PLATINUM];
    else if (metal.toLowerCase() == 'gold')
        total = metal_totals[GOLD];
    else if (metal.toLowerCase() == 'silver')
        total = metal_totals[SILVER];
    else
        total = metal_totals[PLATINUM];

    document.getElementById("totalCoinValue").innerHTML = "$" + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}