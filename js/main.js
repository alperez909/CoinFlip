/* * * * * * * * * * * * * *
 *                         *
 *   		SETUP          *
 *                         *
 * * * * * * * * * * * * * */
function initializeParse() {
    Parse.initialize("3ypyp9jtWjEImtmUjcHIofS4kzLi08KzVFscFrOj", "GYnYa1MYjvCMvnhzVoVczFDXA2eGsY2x1OMjv932");
}

initializeParse();
userRedirect();

if (isLightTheme()) // ADDED AP
    $('head').append('<link title="lighttheme" rel="stylesheet" href="./style/lightstyle.css" type="text/css" />');
else
    $('link[title="lighttheme"]').remove();

var quandl_auth_token ="bLH93u9iDUbuu35qcPNv";

var metal_bidask_url = [
    "https://www.quandl.com/api/v1/datasets/PERTH/GOLD_USD_M.json?rows=7&auth_token=" + quandl_auth_token,
    "https://www.quandl.com/api/v1/datasets/PERTH/SLVR_USD_D.json?rows=7&auth_token=" + quandl_auth_token,
    "https://www.quandl.com/api/v1/datasets/PERTH/PLAT_USD_M.json?rows=7&auth_token=" + quandl_auth_token
];

var metal_pct_chg_url = [
    "https://www.quandl.com/api/v1/datasets/PERTH/GOLD_USD_D.json?rows=1&transformation=rdiff&auth_token=" + quandl_auth_token,
    "https://www.quandl.com/api/v1/datasets/PERTH/SLVR_USD_D.json?rows=1&transformation=rdiff&auth_token=" + quandl_auth_token,
    "https://www.quandl.com/api/v1/datasets/PERTH/PLAT_USD_D.json?rows=1&transformation=rdiff&auth_token=" + quandl_auth_token
];

function getMetal() {
    return location.search.split('metal=')[1];
}

function initializePage() {
    current_metal = getMetal();
    current_metal = current_metal.charAt(0).toUpperCase() + current_metal.slice(1);
    document.getElementById("metalTitle").innerHTML = "My " + current_metal + " - CoinFlip";
    document.getElementById("myMetalLabel").innerHTML = "MY " + current_metal.toUpperCase();
    document.getElementById("metalTotalLabel").innerHTML = "<div class='legend-item-color' id='legend-1'></div>" + current_metal + " Total";
    document.getElementById("ozLabel").innerHTML = "<div class='legend-item-color' id='legend-4'></div> 1oz " + current_metal;
    document.getElementById("metalHeader").innerHTML = "My " + current_metal;
    document.getElementById("metalValueLabel").innerHTML = "My " + current_metal + " Value";

}

function goToAddNewItem() {
    window.location = "addnewitem.html?metal=" + metalStringToNumber(current_metal);
}

function loadTopNav() {
    document.write("    <nav>");
    document.write("        <svg class=\"icon-spinner2\">");
    document.write("            <symbol id=\"icon-spinner2\" viewBox=\"0 0 1024 1024\">");
    document.write("                <title>spinner2<\/title>");
    document.write("                <path class=\"path1\" d=\"M1024 384h-384l143.53-143.53c-72.53-72.526-168.96-112.47-271.53-112.47s-199 39.944-271.53 112.47c-72.526 72.53-112.47 168.96-112.47 271.53s39.944 199 112.47 271.53c72.53 72.526 168.96 112.47 271.53 112.47s199-39.944 271.528-112.472c6.056-6.054 11.86-12.292 17.456-18.668l96.32 84.282c-93.846 107.166-231.664 174.858-385.304 174.858-282.77 0-512-229.23-512-512s229.23-512 512-512c141.386 0 269.368 57.326 362.016 149.984l149.984-149.984v384z\"><\/path>");
    document.write("            <\/symbol>");
    document.write("            <use xlink:href=\"#icon-spinner2\"><\/use>");
    document.write("        <\/svg>");
    document.write("        <a onclick=\"mixpanel.track('coinflip_icon');\" href=\"home.html\">COINFLIP<\/a>");
    document.write("        <svg class=\"icon-cog\">");
    document.write("            <symbol id=\"icon-cog\" viewBox=\"0 0 1024 1024\">");
    document.write("                <title>cog<\/title>");
    document.write("                <path class=\"path1\" d=\"M933.79 610.25c-53.726-93.054-21.416-212.304 72.152-266.488l-100.626-174.292c-28.75 16.854-62.176 26.518-97.846 26.518-107.536 0-194.708-87.746-194.708-195.99h-201.258c0.266 33.41-8.074 67.282-25.958 98.252-53.724 93.056-173.156 124.702-266.862 70.758l-100.624 174.292c28.97 16.472 54.050 40.588 71.886 71.478 53.638 92.908 21.512 211.92-71.708 266.224l100.626 174.292c28.65-16.696 61.916-26.254 97.4-26.254 107.196 0 194.144 87.192 194.7 194.958h201.254c-0.086-33.074 8.272-66.57 25.966-97.218 53.636-92.906 172.776-124.594 266.414-71.012l100.626-174.29c-28.78-16.466-53.692-40.498-71.434-71.228zM512 719.332c-114.508 0-207.336-92.824-207.336-207.334 0-114.508 92.826-207.334 207.336-207.334 114.508 0 207.332 92.826 207.332 207.334-0.002 114.51-92.824 207.334-207.332 207.334z\"><\/path>");
    document.write("            <\/symbol>");
    document.write("            <use xlink:href=\"#icon-cog\"><\/use>");
    document.write("        <\/svg>");
    document.write("		<svg class=\"icon-account-logout\">");
    document.write("            <symbol id=\"icon-account-logout\" viewBox=\"0 0 8 8\">");
    document.write("                <title>logout<\/title>");
    document.write("				<path class=\"path1\" d=\"M3 0v1h4v5h-4v1h5v-7h-5zm-1 2l-2 1.5 2 1.5v-1h4v-1h-4v-1z\"><\/path>");
    document.write("            <\/symbol>");
    document.write("            <use xlink:href=\"#icon-account-logout\"><\/use>");
    document.write("		<\/svg>");
    document.write("    <\/nav>");
}

function loadTopNavPersist() {
    document.write("    <nav style='display: block; visibility: visible;'>");
    document.write("        <svg class=\"icon-spinner2\">");
    document.write("            <symbol id=\"icon-spinner2\" viewBox=\"0 0 1024 1024\">");
    document.write("                <title>spinner2<\/title>");
    document.write("                <path class=\"path1\" d=\"M1024 384h-384l143.53-143.53c-72.53-72.526-168.96-112.47-271.53-112.47s-199 39.944-271.53 112.47c-72.526 72.53-112.47 168.96-112.47 271.53s39.944 199 112.47 271.53c72.53 72.526 168.96 112.47 271.53 112.47s199-39.944 271.528-112.472c6.056-6.054 11.86-12.292 17.456-18.668l96.32 84.282c-93.846 107.166-231.664 174.858-385.304 174.858-282.77 0-512-229.23-512-512s229.23-512 512-512c141.386 0 269.368 57.326 362.016 149.984l149.984-149.984v384z\"><\/path>");
    document.write("            <\/symbol>");
    document.write("            <use xlink:href=\"#icon-spinner2\"><\/use>");
    document.write("        <\/svg>");
    document.write("        <a onclick=\"mixpanel.track('coinflip_icon');\" href=\"home.html\">COINFLIP<\/a>");
    document.write("        <svg class=\"icon-cog\">");
    document.write("            <symbol id=\"icon-cog\" viewBox=\"0 0 1024 1024\">");
    document.write("                <title>cog<\/title>");
    document.write("                <path class=\"path1\" d=\"M933.79 610.25c-53.726-93.054-21.416-212.304 72.152-266.488l-100.626-174.292c-28.75 16.854-62.176 26.518-97.846 26.518-107.536 0-194.708-87.746-194.708-195.99h-201.258c0.266 33.41-8.074 67.282-25.958 98.252-53.724 93.056-173.156 124.702-266.862 70.758l-100.624 174.292c28.97 16.472 54.050 40.588 71.886 71.478 53.638 92.908 21.512 211.92-71.708 266.224l100.626 174.292c28.65-16.696 61.916-26.254 97.4-26.254 107.196 0 194.144 87.192 194.7 194.958h201.254c-0.086-33.074 8.272-66.57 25.966-97.218 53.636-92.906 172.776-124.594 266.414-71.012l100.626-174.29c-28.78-16.466-53.692-40.498-71.434-71.228zM512 719.332c-114.508 0-207.336-92.824-207.336-207.334 0-114.508 92.826-207.334 207.336-207.334 114.508 0 207.332 92.826 207.332 207.334-0.002 114.51-92.824 207.334-207.332 207.334z\"><\/path>");
    document.write("            <\/symbol>");
    document.write("            <use xlink:href=\"#icon-cog\"><\/use>");
    document.write("        <\/svg>");
    document.write("		<svg class=\"icon-account-logout\">");
    document.write("            <symbol id=\"icon-account-logout\" viewBox=\"0 0 8 8\">");
    document.write("                <title>logout<\/title>");
    document.write("				<path class=\"path1\" d=\"M3 0v1h4v5h-4v1h5v-7h-5zm-1 2l-2 1.5 2 1.5v-1h4v-1h-4v-1z\"><\/path>");
    document.write("            <\/symbol>");
    document.write("            <use xlink:href=\"#icon-account-logout\"><\/use>");
    document.write("		<\/svg>");
    document.write("    <\/nav>");
}

function loadSideNav(selected) {
    document.write("    <aside>");
    document.write("        <a onclick=\"mixpanel.track('home_icon');\" href=\"home.html\">");
    if (selected == 0)
        document.write("        <figure onclick=\"mixpanel.track('home_icon');\" class='nav-selected'>");
    else
        document.write("        <figure>");
    document.write("            <br\/>");
    document.write("              <svg class=\"icon-home2\">");
    document.write("                    <symbol id=\"icon-home2\" viewBox=\"0 0 1024 1024\">");
    document.write("                        <title>home2<\/title>");
    document.write("                        <path class=\"path1\" d=\"M426.667 853.333v-256h170.667v256h213.333v-341.333h128l-426.667-384-426.667 384h128v341.333z\"><\/path>");
    document.write("                    <\/symbol>");
    document.write("                    <use xlink:href=\"#icon-home2\"><\/use>");
    document.write("                <\/svg>");
    document.write("");
    document.write("            <figcaption>Home<\/figcaption>");
    document.write("        <\/figure>       ");
    document.write("        <\/a> ");
    document.write("        <a onclick=\"mixpanel.track('mygold_icon');\" href=\"mymetal.html?metal=gold\">");
    if (selected == 1)
        document.write("        <figure class='nav-selected'>");
    else
        document.write("        <figure>");
    document.write("            Au");
    document.write("            <figcaption>My Gold<\/figcaption>");
    document.write("        <\/figure>       ");
    document.write("        <\/a> ");
    document.write("        <a onclick=\"mixpanel.track('mysilver_icon');\" href=\"mymetal.html?metal=silver\">");
    if (selected == 2)
        document.write("        <figure class='nav-selected'>");
    else
        document.write("        <figure>");
    document.write("            Ag");
    document.write("            <figcaption>My Silver<\/figcaption>");
    document.write("        <\/figure>       ");
    document.write("        <\/a> ");
    document.write("        <a onclick=\"mixpanel.track('myplatinum_icon');\" href=\"mymetal.html?metal=platinum\">");
    if (selected == 3)
        document.write("        <figure class='nav-selected'>");
    else
        document.write("        <figure>");
    document.write("            Pt");
    document.write("            <figcaption>My Platinum<\/figcaption>");
    document.write("        <\/figure>");
    document.write("        <\/a> ");
    document.write("    <\/aside>");
}

function loadFooter() {
    document.write("    <footer>");
    document.write("        &copy; 2015 CoinFlip");
    document.write("    <\/footer> ");

}

var metal_ask_price = [];
var metal_bid_price = [];
var metal_pct_chg = [];
var metal_date = [];
var metal_totals = [0, 0, 0];
var current_metal;
var metal_types = [];

var GOLD = 0;
var SILVER = 1;
var PLATINUM = 2;


var metal_total_data = {
    0: [],
    1: [],
    2: []
};

function getTotalForMonth(month) {
    var gold_val = metal_total_data[GOLD][month] ? parseFloat(metal_total_data[GOLD][month]) : 0;
    var silver_val = metal_total_data[SILVER][month] ? parseFloat(metal_total_data[SILVER][month]) : 0;
    var plat_val = metal_total_data[PLATINUM][month] ? parseFloat(metal_total_data[PLATINUM][month]) : 0;
    return gold_val + silver_val + plat_val;
}

function updateMonthlyValues() {
    var className;
    var sym;
    var tot;
    var last_div;
    var curr_date = new Date().getMonth();
    if (current_metal) {
        var idx = metalStringToNumber(current_metal);
        last_div = metal_total_data[idx][(curr_date - 1) % 12] == 0 ? 1 : metal_total_data[idx][(curr_date - 1) % 12];
        tot = (((metal_total_data[idx][curr_date] - metal_total_data[idx][curr_date - 1]) / last_div) * 100);
        if (tot == Number.POSITIVE_INFINITY || tot == Number.NEGATIVE_INFINITY) {
            tot = parseFloat(metal_total_data[idx][curr_date]);
        }
    } else {
        var last = getTotalForMonth((curr_date - 1) % 12);
        last_div = last == 0 ? 100 : last;
        tot = ((getTotalForMonth(curr_date) - last ) / last_div) * 100;
    }
    if (isNaN(tot)) {
        tot = 0;
    }

    if (tot >= 0) {
        sym = "+";
        className = "pos-change";
    } else {
        sym = "-";
        className = 'neg-change';
    }

    document.getElementById("monthlyChangeValue").class = className;
    document.getElementById("monthlyChangeValue").innerHTML = sym + tot.toFixed(2).toString() + "%";
}

var tmp_timeout;

function selectProperMetal() {
    var metal_num = getMetal(); // number
    document.getElementById("metalValue").selectedIndex = metal_num;
    if (metal_num == 0)
        updateAddStackItemLabels("Gold");
    else if (metal_num == 1)
        updateAddStackItemLabels("Silver");
    else
        updateAddStackItemLabels("Platinum");
}

function onTypeChange() {
    if (document.getElementById("typeValue").value == "New") {
        toggleNewTypeVisibility();

    } else {
        var curr = metal_types[document.getElementById("typeValue").selectedIndex];
        var percent = curr.getPercentMetal();
        var weight = curr.getWeight();
        var gu = percent * weight;
        var oztu = gu / 31.1034768;
        var currPremium = document.getElementById("premiumValue").value;
        var currUnitPriceValue = document.getElementById("unitPriceValue").value;
        var totalCost = parseFloat(currPremium) + parseFloat(currUnitPriceValue);

        document.getElementById("guValue").innerHTML = gu.toFixed(2);
        document.getElementById("oztuValue").innerHTML = oztu.toFixed(2);
        document.getElementById("totalAuValue").innerHTML = (document.getElementById("quantityValue").value * oztu).toFixed(2);

        document.getElementById("percentValue").innerHTML = percent;
        document.getElementById("weightValue").innerHTML = weight;
        document.getElementById("totalValue").innerHTML = totalCost.toFixed(2);
    }
}

function toggleNewTypeVisibility() {
    var elt = document.getElementById("newTypeDialog");
    if (elt.style.display == "none") {
        elt.style.display = "block";
    } else {
        elt.style.display = "none";
    }
}

function submitNewMetalType() {
    var metal_name = document.getElementById("input_typeName").value;
    var metal_perc = document.getElementById("input_typePercent").value;
    var metal_weight = document.getElementById("input_typeWeight").value;

    // submit to parse
    createStackType({
        done: function (type) {
            metal_types.push(type);
            // change current selection of type to newly added
            var new_type_opt = document.createElement("option");
            new_type_opt.innerHTML = "Add new type";
            new_type_opt.value = "New";

            var selected_el = document.getElementById("typeValue");
            var opts = selected_el.options;
            opts[selected_el.selectedIndex].innerHTML = metal_name;
            opts[selected_el.selectedIndex].value = type.id;
            opts.add(new_type_opt);
            onTypeChange();
        }
    }, metal_name, metal_perc, metal_weight);

    toggleNewTypeVisibility();
}

function metalStringToNumber(metal_string) {
    if (metal_string.toLowerCase() == "gold")
        return GOLD;
    else if (metal_string.toLowerCase() == "silver")
        return SILVER;
    else
        return PLATINUM;
}

function saveToMyStack() {
    var metal = document.getElementById("metalValue").value;
    var typ = document.getElementById("typeValue").value;
    var purchase_date = new Date(document.getElementById("purchaseDateValue").value);
    var qty = document.getElementById("quantityValue").value;
    var premium = document.getElementById("premiumValue").value;
    var unit_price = document.getElementById("unitPriceValue").value;
    var percent_au = document.getElementById("percentValue").innerHTML;
    var weight = document.getElementById("weightValue").innerHTML;


    var leave = {
        done: function () {
            window.location = 'home.html';
        }
    };
    var callback = {
        done: function (item) {
            var fileUploadControl = document.getElementById("coinPhotoFileUpload");
            if (fileUploadControl.files.length > 0) {
                var file = fileUploadControl.files[0];
                setPicture(item, file, leave);
            } else {
                leave.done();
            }
        }
    };
    createStackItem(callback, metal, typ, purchase_date, qty, premium, unit_price, percent_au, weight);
    console.log("Complete");

    return true;
}

function deleteItem() {
    var result = deleteConfirmation();
    var name = getItemDetailId();
    var cb = {
        done: function (ret) {
            window.location = 'home.html';
        }
    };
    if (result == true) {
        console.log("returned true");
        var r = deleteStackItem(name, cb);
        //if(r==true){
        console.log("Item was Deleted");
    }
}

function updateAddStackItemLabels(metal) {
    var currPremium = document.getElementById("premiumValue").value;
    var currUnitPriceValue = document.getElementById("unitPriceValue").value;
    var totalCost = parseFloat(currPremium) + parseFloat(currUnitPriceValue);

    document.getElementById("percentLabel").innerHTML = metal + " %";
    document.getElementById("guLabel").innerHTML = metal + " g/u";
    document.getElementById("oztuLabel").innerHTML = metal + " ozt/u";
    var chem_sym = getChemicalSymbol(metal);
    document.getElementById("totalAuLabel").innerHTML = "Total " + chem_sym + " (ozt)";

    document.getElementById("totalValue").innerHTML = totalCost.toFixed(2);
}

function getChemicalSymbol(metal) {
    if (metal.toLowerCase() == "gold") {
        return "au";
    } else if (metal.toLowerCase() == "silver") {
        return "ag";
    } else {
        return "pt";
    }
}

function onAddStackItemUpdateTotal() {
    document.getElementById("totalValue").innerHTML = (parseFloat(document.getElementById("quantityValue").innerHTML) * (parseFloat(document.getElementById("unitPriceValue").innerHTML) + parseFloat(document.getElementById("premiumValue").innerHTML))).toFixed(2);
}

function onEditAddStackItemUpdateTotal() {
    document.getElementById("totalValue").innerHTML = (parseFloat(document.getElementById("quantityValue").value) * (parseFloat(document.getElementById("unitPriceValue").value) + parseFloat(document.getElementById("premiumValue").value))).toFixed(2);
}

function createCoinRow(id, coin) {
    var tr = document.createElement("tr");
    tr.onclick = function () {
        window.location = "itemdetail.html?id=" + id;
    };

    var img = document.createElement("td");
    img.className = "stack_img_col";
    if (!coin.pic) {
        img.innerHTML = "<div class=\"coin_mini\"></div>";
    } else {
        img.innerHTML = "<img src='" + coin.pic._url + "' alt='fake_img' style='width:35px;height:35px'>";
    }
    var typ = document.createElement("td");
    //var href_template = "<a href=\"itemdetail.html?id=" + id + "\">";
    typ.innerHTML = coin.type._serverData.name; //+ "</a>";

    var qty = document.createElement("td");
    qty.innerHTML = coin.qty;

    var weight = document.createElement("td");
    weight.innerHTML = coin.weight;

    var pct_au = document.createElement("td");
    pct_au.innerHTML = coin.percent_au;

    var value = document.createElement("td");
    value.innerHTML = coin.premium + coin.unit_price;

    tr.appendChild(img);
    tr.appendChild(typ);
    tr.appendChild(qty);
    tr.appendChild(weight);
    tr.appendChild(pct_au);
    tr.appendChild(value);

    document.getElementById("coinList").appendChild(tr);
}


/* * * * * * * * * * * * * *
 *                         *
 *   AUTHORIZE FUNCTIONS   *
 *                         *
 * * * * * * * * * * * * * */
// Create a new user
function createUser() {
    // Create new user object
    var user = new Parse.User();

    // Set username, email, password
    user.set("username", document.getElementById("sign-up-username").value);
    user.set("email", document.getElementById("sign-up-email").value);
    user.set("password", document.getElementById("sign-up-password").value);

    // Sign up user
    user.signUp(null, {
        success: function (user) {
            window.location.href = "./home.html"
        },
        error: function (user, error) {
            //alert(error.message);
            displayError(error);
        }
    });
}

// Login an existing user
function loginUser() {
    // Login
    Parse.User.logIn(document.getElementById("log-in-username").value, document.getElementById("log-in-password").value, {
        success: function (user) {
            //alert("Logged in!");
            window.location.href = "./home.html"
        },
        error: function (user, error) {
            //alert(error.message);
            displayError(error);
        }
    });
}

// Display validation error during log in and sign up
function displayMessage(message) {
    var outEl = document.createElement("div")
    var inEl = document.createElement("div");
    inEl.innerHTML = message;
    if (document.getElementById("message")) {
        document.getElementById("message").innerHTML = message;
    } else {
        outEl.innerHTML = inEl.outerHTML;
        outEl.setAttribute("id", "message");
        document.getElementById("auth-banner").appendChild(outEl);
    }
}

function displayError(error) {
    displayMessage(error.message);
    document.getElementById("message").setAttribute("style", "background-color:rgb(140, 67, 67)");
}

// Setup Facebook SDK
function facebookSetup() {
    // Initialize Parse
    window.fbAsyncInit = function () {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId: '1856532144572747', // Facebook App ID
            status: true,  // check Facebook Login status
            cookie: true,  // enable cookies to allow Parse to access the session
            xfbml: true,  // initialize Facebook social plugins on the page
            version: 'v2.3' // point to the latest Facebook Graph API version
        });
        // Run code after the Facebook SDK is loaded.
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

// Log in or Sign Up User
function loginFacebookUser() {
    Parse.FacebookUtils.logIn(null, {
        success: function (user) {
            //New Users Sign Up
            if (!user.existed()) {
                //alert("User signed up and logged in through Facebook!");
                window.location.href = "./home.html"
                // User Login
            } else {
                //alert("User logged in through Facebook!");
                window.location.href = "./home.html"
            }
        },
        error: function (user, error) {
            // Error related to user session
            Parse.User.logOut();
            displayError(error);
            //if(error.code===251) {
            //window.location.reload()
            //Parse.FacebookUtils.logIn(null,{success:function(){window.location.href = "./home.html"}});
            //}
        }
    });
}

function userRedirect() {

    // Current Page
    var ap_page = window.location.pathname.split("/").pop();

    // Redirect logged user
    if (ap_page === "index.html" || ap_page === "signup.html" || ap_page === "login.html" || ap_page === "") {
        if (Parse.User.current()) {
            window.location.replace("./home.html");
        }
        // Redirect user not logged in
    } else {
        if (Parse.User.current() === null) {
            window.location.replace("./index.html")
        }
    }
}

/* * * * * * * * * * * * * *
 *                         *
 *   SETTINGS FUNCTIONS    *
 *                         *
 * * * * * * * * * * * * * */
function getTheme() { // ADDED AP
    var user = Parse.User.current();
    if (user)
        return user.get("theme");
    else
        return "";
}

function isLightTheme() { // ADDED AP
    return getTheme() === "Light";
}

function getMultiplier() { // ADDED AP
    return isLightTheme() ? 3 : 1;
}

function setRadioButton() {
    // Get current theme
    if (isLightTheme()) {
        $('#light-theme-radio').attr('checked', '');
        $('#dark-theme-radio').removeAttr('checked');
    } else {
        $('#dark-theme-radio').attr('checked', '');
        $('#light-theme-radio').removeAttr('checked');
    }
}

function displaySuccess(success) {
    displayMessage(success);
    document.getElementById("message").setAttribute("style", "background-color:rgb(60, 111, 52)");
}

function getUserInfo() {
    var user = Parse.User.current();
    var fullname = user.get("name");
    var username = user.getUsername();
    var email = user.getEmail();

    document.getElementById("user-full-name").value = fullname;
    document.getElementById("user-name").value = username;
    document.getElementById("user-email").value = email;

    // Get current theme
    if (isLightTheme()) { // ADDED AP
        $('#light-theme-radio').attr('checked', '');
        $('#dark-theme-radio').removeAttr('checked');
    } else {
        $('#dark-theme-radio').attr('checked', '');
        $('#light-theme-radio').removeAttr('checked');
    }
}

function checkPasswordEqual() {
    var password = document.getElementById("user-password").value;
    var re_password = document.getElementById("user-re-password").value;
    if (password === "" && re_password === "") {
        return false;
    } else {
        if (password === re_password) {
            return true;
        } else {
            //displayError("Passwords don't match");
            return false;
        }
    }
}

function updateUserChanges() {
    var user = Parse.User.current();
    var fullname = document.getElementById("user-full-name").value;
    var username = document.getElementById("user-name").value;
    var email = document.getElementById("user-email").value;
    var newPassword = document.getElementById("user-password").value;
    var re_password = document.getElementById("user-re-password").value;
    var light_theme = document.getElementById("light-theme-radio"); // ADDED AP

    user.set("name", fullname);

    if (light_theme.checked) {
        user.set("theme", light_theme.value);
    } else {
        user.set("theme", "Dark");
    }

    user.save(null, {
        success: function (user) {
            // Do stuff after successful login.
        },
        error: function (user, error) {
            // The login failed. Check error to see why.
            //displayError(error);
            console.log(error.message);
        }
    });

    user.setUsername(username, {
        success: function (user) {
            // Do stuff after successful login.
        },
        error: function (user, error) {
            // The login failed. Check error to see why.
            //displayError(error);
            console.log(error.message);
        }
    });
    user.setEmail(email, {
        success: function (user) {
            // Do stuff after successful login.
        },
        error: function (user, error) {
            // The login failed. Check error to see why.
            console.log(error.message);
        }
    });

    if (checkPasswordEqual()) {
        user.set("password", newPassword);
        user.save()
            .then(
            function (user) {
                displaySuccess("Password successfully changed");
                Parse.User.logOut();

                Parse.User.logIn(username, newPassword, {
                    success: function (user) {
                        //alert("Logged in!");
                        window.location.href = "./index.html"
                    },
                    error: function (user, error) {
                        //alert(error.message);
                        displayError(error);
                    }
                });

            },
            function (error) {
                handleParseError(error, username, newPassword);
                //console.log('Something went wrong', error);
            }
        );
    } else {
        if (newPassword != "" || re_password != "") {
            var err = new Parse.Error("123456", "Passwords don't match")
            displayError(err);
        } else {
            user.save(null, {
                success: function (user) {
                    // Do stuff after successful login.
                    //alert("Success");
                    //displaySuccess("Success");
                    location.reload();
                },
                error: function (user, error) {
                    // The login failed. Check error to see why.
                    displayError(error);
                }
            });
        }

    }
}

function requestChecked() {
    return document.getElementById("reset-password-box").checked;
}

$(window).load(function () {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    /* * * * * * * * * * * * * *
     *                         *
     *        GENERAL          *
     *                         *
     * * * * * * * * * * * * * */

    $('.icon-spinner2').click(function () {
        location.reload();
    });

    $('tr').click(function () {
        if ($(this).find('a')[0])
            $(this).find('a')[0].click();
    });

    $('.icon-account-logout').click(function () {
        Parse.User.logOut();
        window.location.href = "./index.html";
    });

    $('.icon-cog').click(function () {
        window.location.href = "./settings.html";
    });

    /* * * * * * * * * * * * * *
     *                         *
     *        AUTHROIZE        *
     *                         *
     * * * * * * * * * * * * * */
    $('#sign-up-btt').click(function () {
        createUser();
    });

    $('#log-in-btt').click(function () {
        loginUser();
    });

    $('#facebook-btt').click(function () {
        loginFacebookUser();
    });

    $('#settings-update-btt').click(function () {
        updateUserChanges();
    });

    /* * * * * * * * * * * * * *
     *                         *
     *     MOBILE HANDLING     *
     *                         *
     * * * * * * * * * * * * * */

    $('.mtb-1').click(function () {
        $('.graph-panel').removeClass('graph-panel-show');
        $('.market-status').fadeIn(0);
        $('.market-list').fadeIn(0);
        if (page == "mymetal.html")
            $('.my_stack').fadeIn(0);
        $('.mtb-2').removeClass('mobile-toggle-selected');
        $('.mtb-1').addClass('mobile-toggle-selected');

    });

    $('.mtb-2').click(function () {
        $('.market-status').fadeOut(0);
        $('.market-list').fadeOut(0);
        if (page == "mymetal.html")
            $('.my_stack').fadeOut(0);
        $('.mtb-1').removeClass('mobile-toggle-selected');
        $('.mtb-2').addClass('mobile-toggle-selected');
        $('.graph-panel').addClass('graph-panel-show');
        drawGraph();
    });

    var resizer = function () {
        winWidth = $(window).width();
        winHeight = $(window).height();

        if (winWidth > 999) {
            $('.graph-panel').removeClass('graph-panel-show');
            $('.market-status').fadeIn(0);
            $('.market-list').fadeIn(0);
            if (page == "mymetal.html")
                $('.my_stack').fadeIn(0);
            $('.mtb-2').removeClass('mobile-toggle-selected');
            $('.mtb-1').addClass('mobile-toggle-selected');
        }
    };

    $(window).resize(resizer);
});
