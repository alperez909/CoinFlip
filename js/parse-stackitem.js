// StackItem object with convenience setters and getters.
var StackItem = Parse.Object.extend("StackItem", {
    getMetal: function () {
        return this.get("metal");
    },
    setMetal: function (metal) {
        this.set("metal", metal);
    },
    getType: function () {
        return this.get("type");
    },
    setType: function (type) {
        this.set("type", new StackType({id: type}));
        //action.set("bookPointer", new Book({id: "SPecEgZUhL"}));
        //this.set("type", type);
    },
    getPurchaseDate: function () {
        return this.get("purchase_date");
    },
    setPurchaseDate: function (purchaseDate) {
        this.set("purchase_date", purchaseDate);
    },
    getQty: function () {
        return this.get("qty");
    },
    setQty: function (qty) {
        this.set("qty", qty);
    },
    getPremium: function () {
        return this.get("premium");
    },
    setPremium: function (premium) {
        this.set("premium", premium);
    },
    getUnitPrice: function () {
        return this.get("unit_price");
    },
    setUnitPrice: function (unitPrice) {
        this.set("unit_price", unitPrice);
    },
    getPercentAu: function () {
        return this.get("percent_au");
    },
    setPercentAu: function (percent_au) {
        this.set("percent_au", percent_au);
    },
    getWeight: function () {
        return this.get("weight");
    },
    setWeight: function (weight) {
        this.set("weight", weight);
    },
    getPic: function () {
        return this.get("pic");
    },
    setPic: function (pic) {
        this.set("pic", pic);
    }
});

// StackTotal object
var StackTotal = Parse.Object.extend("StackTotal", {
    getOwner: function () {
        return this.get("owner");
    },
    setOwner: function (owner) {
        this.set("owner", owner);
    },
    getMetal: function () {
        return this.get("metal");
    },
    setMetal: function (metal) {
        this.set("metal", metal);
    },
    getTotal: function () {
        return this.get("total");
    },
    setTotal: function (total) {
        this.set("total", total);
    },
    isCurrent: function () {
        return this.get("current");
    },
    setCurrent: function (current) {
        this.set("current", current);
    }
});

// StackTotal object
var StackType = Parse.Object.extend("StackType", {
    getName: function () {
        return this.get("name");
    },
    setName: function (name) {
        this.set("name", name);
    },
    getPercentMetal: function () {
        return this.get("percent_metal");
    },
    setPercentMetal: function (percent_metal) {
        this.set("percent_metal", percent_metal);
    },
    getWeight: function () {
        return this.get("weight");
    },
    setWeight: function (weight) {
        this.set("weight", weight);
    }
});

function getStackTypes(callback) {
    var qry = new Parse.Query(StackType);

    qry.find({
        success: function (totals) {
            console.log('Successfully retrieved ' + totals.length + ' items');
            callback.done(totals);
        },
        error: function (error) {
            console.log('Failed to retrieve totals, with error code: ' + error.message);
        }
    });
}

function createStackType(callback, name, percent_metal, weight) {
    // Create StackItem object.
    var item = new StackType();
    item.setName(name);
    item.setPercentMetal(percent_metal);
    item.setWeight(weight);

    // Save item.
    item.save(null, {
        success: function (item) {
            // Item successfully saved.
            console.log('Successfully created new StackItem: ' + item.id);
            // Add to user's relation.
            if (callback && callback.done)
                callback.done(item);
        },
        error: function (item, error) {
            console.log('Failed to create new StackItem, with error code: ' + error.message);
        }
    });
}

/**
 * Gets an array of totals for the specified metal, returned by ascending date.
 */
function getTotalsWithinDate(metal, callback, start_date, end_date) {
    var currUser = Parse.User.current();

    // Make query.
    var query = new Parse.Query(StackTotal);
    query.equalTo("metal", metal);
    query.equalTo("owner", currUser);
    query.lessThan("createdAt", end_date);
    query.greaterThan("createdAt", start_date);
    query.ascending("createdAt");
    query.find({
        success: function (totals) {
            console.log('Successfully retrieved ' + totals.length + ' totals');

            var ret = [];
            // Create objects mapping Dates to values.
            for (var i = 0; i < totals.length; i++) {
                var total = totals[i];
                var dateVal = {
                    date: total.createdAt,
                    val: total.getTotal().toFixed(2)
                };

                ret.push(dateVal);
            }
            callback.done(ret, metal);
        },
        error: function (error) {
            console.log('Failed to retrieve totals, with error code: ' + error.message);
        }
    })
}

/**
 * Gets an array of totals for the specified metal, returned by ascending date.
 */
function getTotals(metal, callback) {
    var currUser = Parse.User.current();

    // Make query.
    var query = new Parse.Query(StackTotal);
    query.equalTo("metal", metal);
    query.equalTo("owner", currUser);
    query.find({
        success: function (totals) {
            console.log('Successfully retrieved ' + totals.length + ' totals');

            var ret = [];
            // Create objects mapping Dates to values.
            for (var i = 0; i < totals.length; i++) {
                var total = totals[i];
                var dateVal = {
                    date: total.createdAt,
                    val: total.getTotal()
                };

                ret.push(dateVal);
            }
            callback.done(ret);
        },
        error: function (error) {
            console.log('Failed to retrieve totals, with error code: ' + error.message);
        }
    })
}

/**
 * Adds a total row belonging to the logged-in user, based upon previous total
 * if any.
 */
function addTotal(metal, delta, callback) {
    var currUser = Parse.User.current();

    // Create new total row.
    var newStackTotal = new StackTotal();
    newStackTotal.setOwner(currUser);
    newStackTotal.setMetal(metal);
    newStackTotal.setCurrent(true);

    var query = new Parse.Query(StackTotal);
    query.equalTo("metal", metal);
    query.equalTo("current", true);
    query.equalTo("owner", currUser);
    query.first({
        success: function (ret) {
            if (typeof ret === 'undefined') {
                // Set new total to just the delta and save it.
                newStackTotal.setTotal(delta);
                newStackTotal.save(null, {
                    success: function (ret) {
                        callback.done(ret);
                    },
                    error: function (error) {
                        console.log(error.message);
                    }
                });
            } else {
                console.log('Successfully got previous total, with id: ' + ret.id);

                // Set current to false and save it.
                ret.setCurrent(false);
                ret.save(null, {
                    success: function (ret) {
                        // Get previous total and add delta to it.
                        var prevTotal = ret.getTotal();
                        var newTotal = prevTotal + delta;

                        // Set new total and save it.
                        newStackTotal.setTotal(newTotal);
                        newStackTotal.save({
                            success: function (ret) {
                                callback.done(ret);
                            },
                            error: function (error) {
                                console.log(error.message);
                            }
                        });
                    },
                    error: function (error) {
                        console.log(error.message);
                    }
                });


            }
        },
        error: function (error) {
            console.log('Failed to get previous total, with error code: ' + error.message);
        }
    });
}

/**
 * Calculates value of this StackItem entry
 */
function calcVal(qty, premium, unitPrice) {
    return (qty * (premium + unitPrice));
}

/**
 * Create function that takes parameters for every column of the StackItem
 * table and saves the new StackItem along with adding it to the currently
 * logged-in user's relation.
 * @param {String} metal
 * @param {String} type
 * @param {Date} purchaseDate
 * @param {Number} qty
 * @param {Number} premium
 * @param {Number} unitPrice
 */
function createStackItem(callback, metal, type, purchaseDate, qty, premium, unitPrice, percent_au, weight) {
    // Get current user.
    var currUser = Parse.User.current();
    var relation = currUser.relation("stack_items");

    // Create StackItem object.
    var item = new StackItem();
    item.setMetal(metal);
    item.setType(type);
    item.setPurchaseDate(purchaseDate);
    item.setQty(parseInt(qty));
    item.setPremium(parseFloat(premium));
    item.setUnitPrice(parseFloat(unitPrice));
    item.setPercentAu(parseFloat(percent_au));
    item.setWeight(parseFloat(weight));

    // Calculate value.
    var delta = calcVal(parseInt(qty), parseFloat(premium), parseFloat(unitPrice));

    // Save item.
    var internal_callback = {
        done: function () {
            item.save(null, {
                success: function (item) {
                    // Item successfully saved.

                    // Add to user's relation.
                    relation.add(item);
                    currUser.save(null, {
                        success: function (item) {
                            console.log('Successfully created new StackItem: ' + item.id);
                            callback.done(item);
                        },
                        error: function (error) {
                            console.log("Error:" + error.message);
                        }
                    });

                },
                error: function (item, error) {
                    console.log('Failed to create new StackItem, with error code: ' + error.message);
                }
            });
        }
    };


    // Add to user total.
    addTotal(metal, delta, internal_callback);


}

/**
 * Returns all the StackItems of the currently logged-in user. Gives it to
 * the passed-in callback object's done function.
 * @param {Object} callback
 * @returns {Array}
 */
function viewStackItems(callback) {
    // Get current user.
    var currUser = Parse.User.current();
    var relation = currUser.relation("stack_items");

    // Get items belonging to this relation.
    relation.query().include("type").find({
        success: function (items) {
            console.log('Successfully retrieved StackItems');
            callback.done(items);
        },
        error: function (error) {
            console.log('Failed to retrieve StackItems, with error code: ' + error.message);
        }
    });
}

function getStackItem(id, callback) {
    var currUser = Parse.User.current();
    var relation = currUser.relation("stack_items");

    // Get items belonging to this relation.
    relation.query().include("type").get(id, {
        success: function (item) {
            console.log('Successfully retrieved StackItems');
            callback.done(item);
        },
        error: function (error) {
            console.log('Failed to retrieve StackItems, with error code: ' + error.message);
        }
    });
}

function viewStackItemsWithMetalType(callback, metal) {
    var currUser = Parse.User.current();
    var relation = currUser.relation("stack_items");

    // Get items belonging to this relation.
    relation.query().equalTo("metal", metal).include("type").find({
        success: function (items) {
            console.log('Successfully retrieved StackItems');
            callback.done(items);
        },
        error: function (error) {
            console.log('Failed to retrieve StackItems, with error code: ' + error.message);
        }
    });
}

/**
 * Save the StackItem after edits have been made to its fields
 * @param {String} id
 * @param {String} metal
 * @param {String} type
 * @param {Date} purchaseDate
 * @param {Number} qty
 * @param {Number} premium
 * @param {Number} unitPrice
 */
function updateStackItem(id, metal, type, purchaseDate, qty, premium, unitPrice, percent_au, weight) {
    getStackItem(id, {
        done: function (item) {
            // Get old value of this item and calculate delta.
            var oldVal = calcVal(item.getQty(), item.getPremium(), item.getUnitPrice());
            var newVal = calcVal(parseInt(qty), parseFloat(premium), parseFloat(unitPrice));
            var delta = newVal - oldVal;

            // Update fields.
            item.setMetal(metal);
            item.setType(type);
            item.setPurchaseDate(purchaseDate);
            item.setQty(parseInt(qty));
            item.setPremium(parseFloat(premium));
            item.setUnitPrice(parseFloat(unitPrice));
            item.setPercentAu(parseFloat(percent_au));
            item.setWeight(parseFloat(weight));

            // Save item.
            var internal_callback = {
                done: function () {
                    item.save(null, {
                        success: function (item) {
                            // Item successfully saved.
                            console.log('StackItem updated with id: ' + item.id);
                        },
                        error: function (item, error) {
                            console.log('Failed to update StackItem, with error code: ' + error.message);
                        }
                    });
                }
            };

            // Add a new total row.
            addTotal(metal, delta, internal_callback);
        }
    });
}

/**
 * Delete the StackItem from the Parse backend.
 * @param {String} id
 */
function deleteStackItem(id, callback) {
    var result = false;
    getStackItem(id, {
        done: function (item) {
            // Get value of this item to be subtracted from total.
            var destroyVal = calcVal(item.getQty(), item.getPremium(), item.getUnitPrice());
            var delta = destroyVal * (-1);
            var internal_callback = {
                done: function () {
                    item.destroy({
                        success: function (item) {
                            result = true;
                            console.log('StackItem with id ' + item.id + ' was successfully deleted.');
                            callback.done(item);
                        },
                        error: function (item, error) {
                            console.log('Failed to delete StackItem, with error code: ' + error.message);
                        }
                    });
                }
            };
            // Add a new total row.
            addTotal(item.getMetal(), delta, internal_callback);

        }
    });
    return result;
}

/**
 * Associates an image file with the StackItem
 */
function setPicture(item, file, callback) {
    var parseFile = new Parse.File("coin_photo.jpg", file);
    parseFile.save().then(function () {
        console.log('Successfully saved file');
        item.setPic(parseFile);
        item.save().then(function () {
            callback.done();
        });
    });
}

function initializeParse() {
    Parse.initialize("3ypyp9jtWjEImtmUjcHIofS4kzLi08KzVFscFrOj", "GYnYa1MYjvCMvnhzVoVczFDXA2eGsY2x1OMjv932");
}

