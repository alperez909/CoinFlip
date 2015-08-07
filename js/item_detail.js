function loadItemDetail() {
    var id = getItemDetailId();
    var callback = {
        done: function (item) {
            displayItemDetail(item._serverData);
        }
    };
    getStackItem(id, callback);
}

function getItemDetailId() {
    return location.search.split('id=')[1];
}

function displayItemDetail(coin) {
    var tmp = new Date(coin.purchase_date);
    var date = (tmp.getMonth() + 1) + "-" + tmp.getDate() + "-" + tmp.getFullYear();
    document.getElementById("metalValue").innerHTML = coin.metal;
    document.getElementById("typeValue").innerHTML = coin.type._serverData.name;
    document.getElementById("purchaseDateValue").innerHTML = date;
    document.getElementById("quantityValue").innerHTML = coin.qty;
    document.getElementById("premiumValue").innerHTML = coin.premium;
    document.getElementById("unitPriceValue").innerHTML = coin.unit_price;
    document.getElementById("percentValue").innerHTML = coin.percent_au;
    document.getElementById("weightValue").innerHTML = coin.weight;
    if (coin.pic) {
        document.getElementById("coin_img").style.background = "url(" + coin.pic._url + ") center no-repeat";
    }
    onAddStackItemUpdateTotal();
    updateAddStackItemLabels(coin.metal);
}

function deleteConfirmation() {
    var id = getItemDetailId();
    var callback = {
        done: function (item) {
            displayItemDetail(item._serverData);
        }
    };
    //type._serverData.name
    var result = confirm("Are you sure you want to delete this item?"/* +callback.type*/);

    return result;
}

function loadMetalTypes() {
    var callback = {
        done: function (items) {
            var i;
            var el = document.getElementById("typeValue");
            var opts = el.options;

            // removes loading label
            opts.remove(0);

            for (i = 0; i < items.length; i++) {
                var new_opt = document.createElement("option");
                new_opt.value = items[i].id;
                new_opt.innerHTML = items[i].getName();

                metal_types.push(items[i]);

                opts.add(new_opt);
            }

            var add_new_opt = document.createElement("option");
            add_new_opt.value = "New";
            add_new_opt.innerHTML = "Add new type";

            opts.add(add_new_opt);
        }
    };
    getStackTypes(callback);
}

function uploadPic() {
    var fileUploadControl = document.getElementById("coinPhotoFileUpload");
    fileUploadControl.onchange = function (e) {
        var tgt = e.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById("fileUpload").style.background = "url(" + fr.result + ") no-repeat center";
            };
            fr.readAsDataURL(files[0]);
        }

        // Not supported
        else {
            console.log("FileReader not supported, preview cannot be shown!");
        }
    };

    var uploadButton = document.getElementById("fileUpload");
    uploadButton.addEventListener('click', function (e) {
        fileUploadControl.click();
    }, false);
}