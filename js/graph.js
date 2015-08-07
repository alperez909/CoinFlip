var metal_price_url = [
    "https://www.quandl.com/api/v1/datasets/WSJ/AU_EIB.json?auth_token=" + quandl_auth_token + "&",
    "https://www.quandl.com/api/v1/datasets/WSJ/AG_EIB.json?auth_token=" + quandl_auth_token + "&",
    "https://www.quandl.com/api/v1/datasets/WSJ/PL_MKT.json?auth_token=" + quandl_auth_token + "&"
];
var metal_graphFlag = [];
var metal_prices = [[]];
var graph_idx = 0;
var graph_src = "month";
var coinChart;

function formatDate(d) {
    var tmp = new Date(d);
    tmp.setDate(d.getDate() - 1);
    //d.setDate(d.getDate()-1);
    return tmp.toJSON().split('T')[0];
}

function toggleMonthDayButton() {
    if (graph_src == "day") {
        graph_src = "month";
    } else {
        graph_src = "day";
    }
    getChartData(graph_src, graph_idx);
}

function decrementGraphIndex() {
    graph_idx--;
    getChartData(graph_src, graph_idx);
}

function incrementGraphIndex() {
    graph_idx++;
    getChartData(graph_src, graph_idx);
}

function getPrices(metal, s, e, callback) {
    var dates = "trim_start=" + formatDate(s) + "&trim_end=" + formatDate(e);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", metal_price_url[metal] + dates, true);
    xmlHttp.onload = function (e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                var json_arr = JSON.parse(xmlHttp.response).data.reverse();
                var arr = [];
                var start_date = new Date(s);
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                var i = 0; // pointer to data
                var j = 0; // pointer to json
                if (graph_src == "day") {
                    while (i < 6 && j < 6) {
                        if (json_arr[j] && json_arr[j][0] == formatDate(start_date)) {
                            arr.push(json_arr[j][1]);
                            j++;
                            i++;
                        } else {
                            if (arr[i - 1])
                                arr.push(arr[i - 1]);
                            else {
                                arr[i] = null;
                            }
                            i++;
                        }
                        start_date.setDate(start_date.getDate() + 1);
                        if (formatDate(tomorrow) == formatDate(start_date)) {
                            break;
                        }
                    }
                } else {
                    arr = new Array(6);
                    var cnt = new Array(6);
                    var offset = 0;

                    if (graph_idx % 2 != 0) {
                        offset = 6;
                    }
                    for (var y = 0; y < cnt.length; y++) {
                        cnt[y] = 0;
                        arr[y] = 0;
                    }

                    for (var i = 0; i < json_arr.length; i++) {
                        var mo = new Date(json_arr[i][0]).getMonth() - offset;
                        arr[mo] = arr[mo] + json_arr[i][1];
                        cnt[mo]++;
                    }

                    for (var z = 0; z < arr.length; z++) {
                        arr[z] = (arr[z] / cnt[z]).toFixed(2);
                    }
                }
                callback.done(arr);

            } else {
                console.error(xmlHttp.statusText);
            }
        }
    };
    xmlHttp.onerror = function (e) {
        console.error(xmlHttp.statusText);
    };
    xmlHttp.send(null);
}

function getMetalPricesForGraph(s, e, callback) {
    console.log("Getting prices for graph");
    getPrices(GOLD, s, e, {
        done: function (res) {
            metal_prices[GOLD] = res;
            getPrices(SILVER, s, e, {
                done: function (res) {
                    metal_prices[SILVER] = res;
                    getPrices(PLATINUM, s, e, {
                        done: function (res) {
                            metal_prices[PLATINUM] = res;
                            callback.done();
                        }
                    });
                }
            });
        }
    });
}

function generateParameters(scale, idx) {
    var label = [];
    var start_date;
    var end_date;
    var yr;

    if (scale == "day") {
        var i;
        var iter_date = new Date();

        iter_date.setDate(iter_date.getDate() - 4);
        iter_date.setDate(iter_date.getDate() + 6 * (idx));

        start_date = new Date(iter_date);
        end_date = new Date(start_date);
        end_date.setDate(start_date.getDate() + 5);

        for (i = 0; i < 6; i++) {
            label.push((1 + iter_date.getMonth()) + "/" + iter_date.getDate());
            iter_date.setDate(iter_date.getDate() + 1);
        }

    } else if (scale == "month") {
        if (idx % 2 == 0) {
            yr = new Date().getFullYear() + (idx / 2);

            start_date = new Date(yr, 0, 2, 0, 0, 0, 0);
            end_date = new Date(yr, 6, 3, 0, 0, 0, 0);
            end_date.setDate(end_date.getDate() - 1);
            label = ["January " + yr, "February ", "March ", "April ", "May ", "June "];
        } else {
            yr = new Date().getFullYear() + Math.floor(idx / 2);

            start_date = new Date(yr, 6, 2, 0, 0, 0, 0);
            end_date = new Date(yr, 11, 3, 0, 0, 0, 0);
            label = ["July " + yr, "August", "September", "October", "November", "December"];
        }
    }
    var obj = {
        label: label,
        start_date: start_date,
        end_date: end_date
    };
    return obj;
}

function getTimestampArr(s, e) {
    var d = new Date(s.toString());
    var obj = {};
    for (var i = 0; i < 6; i++) {
        var str = d.toLocaleDateString();
        obj[str] = i;
        d.setDate(d.getDate() + 1);
    }
    return obj;
}

function getChartData(scale, idx) {
    var params = generateParameters(scale, idx);

    var sdate = params.start_date;
    var edate = params.end_date;
    var label = params.label;
    var cb;
    var date_dictionary;
    var today = new Date();
    if (sdate <= today) {
        getMetalPricesForGraph(sdate, edate, {
            done: function () {
                if (scale == "day") {
                    date_dictionary = getTimestampArr(sdate, edate);
                } else {
                    if (idx % 2 == 0) {
                        date_dictionary = [0, 1, 2, 3, 4, 5];
                    } else {
                        date_dictionary = [6, 7, 8, 9, 10, 11];
                    }
                }
                if (scale == "month") {
                    cb = {
                        ts_arr: date_dictionary,
                        done: function (res, metal) {
                            var arr = [];
                            for (var i = 0; i < res.length; i++) {
                                var date = new Date(res[i].date);

                                if (this.ts_arr[date.getMonth()]) {
                                    var val = date.getMonth();
                                    arr[val] = res[i].val;
                                }
                            }

                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i] == null)
                                    arr[i] = null;
                            }
                            metal_total_data[metalStringToNumber(metal)] = arr;
                            metal_graphFlag[metalStringToNumber(metal)] = true;
                        }
                    }
                }
                else {
                    cb = {
                        ts_arr: date_dictionary,
                        done: function (res, metal) {
                            var arr = [];
                            for (var i = 0; i < res.length; i++) {
                                var date = new Date(res[i].date);

                                if (this.ts_arr[date.toLocaleDateString()]) {
                                    arr[this.ts_arr[date.toLocaleDateString()]] = res[i].val;
                                }
                            }

                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i] == null)
                                    arr[i] = null;
                            }
                            metal_total_data[metalStringToNumber(metal)] = arr;
                            metal_graphFlag[metalStringToNumber(metal)] = true;
                        }
                    }
                }

                getTotalsWithinDate('Gold', cb, sdate, edate);
                getTotalsWithinDate('Silver', cb, sdate, edate);
                getTotalsWithinDate('Platinum', cb, sdate, edate);

                clearTimeout(tmp_timeout);
                tmp_timeout = setInterval(function () {
                    if (metal_graphFlag[PLATINUM] && metal_graphFlag[PLATINUM] && metal_graphFlag[PLATINUM]) {
                        drawGraph(label);
                        updateMonthlyValues();
                        clearTimeout(tmp_timeout);
                    }
                }, 500);
            }
        });
    } else {
        metal_total_data[GOLD] = [];
        metal_prices[GOLD] = [];
        metal_total_data[SILVER] = [];
        metal_prices[SILVER] = [];
        metal_total_data[PLATINUM] = [];
        metal_prices[PLATINUM] = [];
        drawGraph(label);
    }
}

function drawGraph(label) {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var pointStroke = "rgba(255,255,255,0.6)";
    var pointHighlightFill = "#fff";
    var pointHighlightStroke = "#fff";
    var _scaleGridLineColor = isLightTheme() ? "rgba(0,0,0,0.15)" : "rgba(104, 206, 222, 0.1)"; // ADDED AP

    if (page == "home.html") {
        var data = {
            labels: label,
            datasets: [
                {
                    label: "Gold Total",
                    fillColor: "rgba(255, 109, 103," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#FF6D67",
                    pointColor: "#FF6D67",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_total_data[GOLD]
                },
                {
                    label: "Platinum Total",
                    fillColor: "rgba(255, 168, 89," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#FFA859",
                    pointColor: "#FFA859",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_total_data[PLATINUM]
                },
                {
                    label: "Silver Total",
                    fillColor: "rgba(104, 206, 222," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#F3FF88",
                    pointColor: "#F3FF88",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_total_data[SILVER]
                },
                {
                    label: "1oz Gold",
                    fillColor: "rgba(159, 255, 152," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#9FFF98",
                    pointColor: "#9FFF98",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_prices[GOLD]
                },
                {
                    label: "1oz Platinum",
                    fillColor: "rgba(187, 245, 255," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#BBF5FF",
                    pointColor: "#BBF5FF",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_prices[PLATINUM]
                },
                {
                    label: "1oz Silver",
                    fillColor: "rgba(194, 159, 255," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#C29FFF",
                    pointColor: "#C29FFF",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_prices[SILVER]
                }
            ]
        };

        var options = {

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: _scaleGridLineColor, // ADDED AP

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot: true,

            //Number - Radius of each point dot in pixels
            pointDotRadius: 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: true,

            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

            responsive: true,

            maintainAspectRatio: false,


        };

        var ctx = document.getElementById("total-chart").getContext("2d");
        if (coinChart) {
            coinChart.destroy();
        }
        coinChart = new Chart(ctx).Line(data, options);
        coinChart.update();
    }
    else if (page == "mymetal.html") {
        var idx = metalStringToNumber(current_metal);
        var data = {
            labels: label,
            datasets: [
                {
                    label: current_metal + " Total",
                    fillColor: "rgba(255, 109, 103," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#FF6D67",
                    pointColor: "#FF6D67",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_total_data[idx]
                },
                {
                    label: "1oz " + current_metal,
                    fillColor: "rgba(159, 255, 152," + 0.05 * getMultiplier() + ")", // ADDED AP
                    strokeColor: "#9FFF98",
                    pointColor: "#9FFF98",
                    pointStrokeColor: pointStroke,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke,
                    data: metal_prices[idx]
                }
            ]
        };

        var options = {

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: _scaleGridLineColor, // ADDED AP

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot: true,

            //Number - Radius of each point dot in pixels
            pointDotRadius: 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: true,

            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

            responsive: true,

            maintainAspectRatio: false,


        };

        var ctx = document.getElementById("total-chart").getContext("2d");
        if (coinChart) {
            coinChart.destroy();
        }
        coinChart = new Chart(ctx).Line(data, options);
        coinChart.update();
    }
}

