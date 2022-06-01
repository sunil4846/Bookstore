// myCart controller
bookStoreApp.controller('myCartCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {
    console.log("myCart calling");
    $scope.show = true;
    //get myCart
    $scope.myCartItems = [
        $http({
            method: 'GET',
            url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items',
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            // data: user    
        }).then(
            function successCallback(response) {
                console.log(response);
                $scope.myCartItems = response.data.result;
                console.log($scope.myCartItems);
                $scope.message = "get my cart item created successful";
                // $location.path('/signin');
            },
            function errorCallback(response) {
                console.log("get my cart item not created ", response);
                $scope.message = response.data.message;
            }
        )
    ];

    // quantity adding
    $scope.addQuantity = function (myCartItem) {
        console.log("adding quantity of book calling", myCartItem);
        var user = {
            'quantityToBuy': myCartItem.quantityToBuy,
        }
        console.log("quantity updating", user);
        $http({
            method: 'PUT',
            url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/' + myCartItem._id,
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            data: user

        }).then(
            function successCallback(response) {
                console.log("quantity added successful");
                console.log(response);
                $scope.addQuantity = response.data;
                console.log($scope.addQuantity);
                $scope.message = "quantity updated successful";
                // $location.path('/dashboard');
            },
            function errorCallback(response) {
                console.log("quantity updated unsuccessful", response);
                $scope.message = response.data.message;
            }
        );
    }

    // remove cart item
    $scope.remove = function (myCartItem) {
        console.log("deleting item", myCartItem);
        $http({
            method: 'DELETE',
            url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/' + myCartItem._id,
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            // data: user    
        }).then(
            function successCallback(response) {
                console.log(response);
                $scope.remove = response.data.result;
                console.log("deleted book from my cart", $scope.remove);
                $scope.message = "deleted book from cart successful";
                // $location.path('/signin');
            },
            function errorCallback(response) {
                console.log("deleted book from cart unsuccessful ", response);
                $scope.message = response.data.message;
            }
        )
    }

    $scope.placeOrder = function () {
        $scope.show = false;
        $scope.showCustomer = true;

    }

    $scope.continue = function () {
        $scope.show = false;
        $scope.showCustomer = false;
        console.log("customer details calling", $scope.myCartItems.fullAddress);
        var user = {
            'addressType': $scope.myCartItems.addressType,
            'fullAddress': $scope.myCartItems.fullAddress,
            'city': $scope.myCartItems.city,
            'state': $scope.myCartItems.state
        }
        console.log("customer details calling", user);
        $http({
            method: 'PUT',
            url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/edit_user',
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            data: user

        }).then(
            function successCallback(response) {
                console.log("customer details fetch successful");
                console.log(response);
                $scope.continue = response.data.result;
                console.log($scope.continue);
                $scope.message = "customer details fetch successful";
                // $location.path('/dashboard');
            },
            function errorCallback(response) {
                console.log("customer details fetch unsuccessful", response);
                $scope.message = response.data.message;
            }
        );
        $scope.showOrder = true;
    }

    $scope.checkout = function (placeOrder) {
        console.log('checkout calling', placeOrder)
        console.log("customer details calling", placeOrder._id);
        $scope.orders = []
        var user = {
            'product_id': placeOrder._id,
            'product_name': placeOrder.bookName,
            'product_quantity': placeOrder.quantity,
            'product_price': placeOrder.price
        }
        $scope.orders.push(user);
        var bookOrders = $scope.orders;
        console.log('order details', bookOrders);
        $http({
            method: 'POST',
            url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            data: bookOrders
        }).then(
            function successCallback(response) {
                console.log(response);
                $scope.checkout = response.data.result;
                console.log($scope.checkout);
                $scope.message = "order placed successful";
                $location.path('/placeOrder');
            },
            function errorCallback(response) {
                console.log("order not placed ", response);
                $scope.message = "order not placed";
            }
        )
    }
}])