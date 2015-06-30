/// <reference path="../scripts/angular.js" />

angular.module("cart", [])
    .factory("cart", function () {
        var cartData = [];
        return {
            addProduct: function (id, name, price) {
                ///<summary>Adds the specified product to the cart or incremenets the number required
                /// if the cart already contains the product.</summary>
                ///<param name="id">The id of the product.</param>
                ///<param name="name">The name of the product.</param>
                ///<param name="price">The price of the product.</param>
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1, id: id, price: price, name: name
                    });
                }
            },
            removeProduct: function (id) {
                ///<summary>Removes the product with the specified ID.<summary>
                ///<param name="id">The ID of the product that will be removed.</param>
                for (var i = 0; i < cartData.length; i++) {
                    if(cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },
            getProducts: function () {
                ///<summary>Gets the products from the cart.</summary>
                ///<returns>Returns the array of objects in the cart.</returns>
                return cartData;
            }
        }
    })
    .directive("cartSummary", function (cart) {
        return {
            //Specifies that the directive can be applied only as an element.
            restrict: "E",
            //Specifies the Url of the partial view.
            templateUrl: "components/cart/cartSummary.html",
            controller: function ($scope) {
                var cartData = cart.getProducts();

                $scope.total = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++){
                        total += (cartData[i].price * cartData[i].count);
                    }
                    return total;
                }
            }
        };
    });