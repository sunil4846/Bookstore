(function() {
angular.module('app', ['ui.router','angularUtils.directives.dirPagination'])     //,'ngMaterial'

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
      // $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
      //if any unmatched url, route it to home state!
      // $urlRouterProvider.otherwise("/home");

      $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: "template/login.html",
          controller: "loginCtrl"
        })

      $stateProvider
        .state('signup', {
          url: "/signup",
          templateUrl: "template/signup.html",
          controller: "signupCtrl"
        })

        $stateProvider
        .state('dashboard', {
          url: "/dashboard",
          templateUrl: "template/dashboard.html",
          controller: "dashboardCtrl"
        })

        $stateProvider
        .state('myCart', {
          url: "/myCart",
          templateUrl: "template/myCart.html",
          controller: "myCartCtrl"
        })

        $stateProvider
        .state('myWishlist', {
          url: "/myWishlist",
          templateUrl: "template/myWishlist.html",
          controller: "myWishlistCtrl"
        })

        $stateProvider
        .state('placeOrder', {
          url: "/placeOrder",
          templateUrl: "template/placeOrder.html",
          controller: "placeOrderCtrl"
        })

        $stateProvider
        .state('quickView', {
          url: "/quickView",
          templateUrl: "template/quickView.html",
          // controller: "quickViewCtrl"
        })

    }])

    // login controller
    .controller('loginCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
      console.log("login calling");
      $scope.login = function () {
        console.log("login calling");
        var user = {
          'email': $scope.email,
          'password': $scope.password
        }
        console.log("login calling", user);
        $http({
          method: 'POST',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/login',
          data: user
  
        }).then(
          function successCallback(response) {
            console.log("login successful",response);
            localStorage.setItem('token',response.data.result.accessToken);
            $scope.message = "login successful";
            $location.path('/dashboard');
          },
          function errorCallback(response) {
            console.log("login unsuccessful", response);
            $scope.message = response.data.message;
          }
        );
      };
    }])

    // signup controller
    .controller('signupCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
      console.log("signup calling");
      $scope.signup = function () {
        console.log("register calling");
        var user = {
          'fullName': $scope.fullName,
          'email': $scope.email,
          'password': $scope.password,
          'phone': $scope.phone
        }
        console.log("signup calling", user);
        $http({
          method: 'POST',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/registration',
          data: user

        }).then(
          function successCallback(response) {
            console.log("signup successful");
            console.log(response);
            $scope.message = "signup successful";
            $location.path('/dashboard');
          },
          function errorCallback(response) {
            console.log("signup  unsuccessful", response);
            $scope.message = response.data.message;
          }
        );

      };

    }])

    // dashboard controller
    .controller('dashboardCtrl', ['$scope', '$state','$http','$location','orderByFilter', function ($scope, $state,$http,$location,orderBy) {
      console.log("dashboard calling");
      
      //get all books
      $scope.books = [
        $http({ 
          method: 'GET',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book',
          headers: {
            'Authorization': localStorage.getItem('token') 
          }    
        }).then(
          function successCallback(response) {
            console.log(response); 
            $scope.books = response.data.result;
            console.log($scope.books);
            $scope.message = "get book created successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("get book not created ", response);
            $scope.message = response.data.message;
          }
        )
      ];
      //sorting of book
      $scope.updateSelected = function(){
        console.log(' book to sort');
        switch($scope.selectedOption){
          case "lowToHigh" :
            $scope.lowToHigh('discountPrice');
            break;
          case "highToLow" :
            $scope.highToLow();
            break;
          case "newestarrivals" :
            $scope.newestarrivals();
            break;
        }
      } 
      // sorting of book low to high
      // var books = $scope.books;
      // console.log($scope.books['discountPrice']);
      // $scope.propertyName = $scope.books.discountPrice;
      // console.log('price',$scope.propertyName);
      $scope.reverse = true;
      // $scope.books = orderBy(books, $scope.propertyName, $scope.reverse);
      // console.log($scope.books);
      $scope.lowToHigh = function(propertyName){
        $scope.$watch("books",true);
        console.log($scope.books);
        $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
        ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        $scope.books = orderBy(books, $scope.propertyName, $scope.reverse);
        console.log('price',$scope.propertyName);
        // var discountPriceList = $scope.books.discountPrice;
        // console.log("list",discountPriceList)
      }

      // sorting of book high to low
      $scope.highToLow = function(){
        console.log('price');
      }

      // sorting of new book 
      $scope.newestarrivals = function(){
        console.log('price');
      }

      // quickview 
      $scope.quickViews = function(book){
        // var id = $scope.books;
        // console.log('all book',$scope.books._id);
        console.log("calling quick view",book);
        // if ($scope.books._id == book._id) {
        //   console.log(book._id);
        // }

        // $location.path('/quickView');
        // var quickBook = {
        //   'bookName':book.bookName,
        //   'author':book.author,
        //   'discountPrice':book.discountPrice,
        //   'price':book.price
        // }
        // console.log('something',quickBook);
        $http({ 
          method: 'GET',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book',
          headers: {
            'x-access-token': localStorage.getItem('token') 
          },
          // data: quickBook   
        }).then(
          function successCallback(response) {
            console.log(response); 
            $scope.quickView = response.data.result;
            console.log($scope.quickView);
            $scope.message = "get book created successful";
            $location.path('/quickView');
          },
          function errorCallback(response) {
            console.log("get book not created ", response);
            $scope.message = response.data.message;
          }
        )
      }
      //calling api to add to cart 
      $scope.addToCart = function(book){
        console.log("add to cart",book);
        $http({ 
          method: 'POST',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/'+book._id,
          headers: {
            'x-access-token': localStorage.getItem('token') 
          },
          // data: user    
        }).then(
          function successCallback(response) {
            console.log(response); 
            $scope.book = response.data.result;
            console.log($scope.book);
            $scope.message = "added book to my cart item added successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("added book to my cart item not added ", response);
            $scope.message = response.data.message;
          }
        )
      }

      //calling api to add to wishlist
      $scope.addToWishlist = function(book){
        console.log("add to cart",book);
        $http({ 
          method: 'POST',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/'+book._id,
          headers: {
            'x-access-token': localStorage.getItem('token') 
          },
          // data: user    
        }).then(
          function successCallback(response) {
            console.log(response); 
            $scope.book = response.data.result;
            console.log("added book to wishlist",$scope.book);
            $scope.message = "added book to wishlist added successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("added book to wishlist not added ", response);
            $scope.message = response.data.message;
          }
        )
      }
      
    }])

    // myCart controller
    .controller('myCartCtrl', ['$scope', '$state','$http', function ($scope, $state,$http) {
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
      
      // remove cart item
      $scope.remove = function(myCartItem){
        console.log("deleting item",myCartItem);
        $http({ 
          method: 'DELETE',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/'+myCartItem._id,
          headers: {
            'x-access-token': localStorage.getItem('token') 
          },
          // data: user    
        }).then(
          function successCallback(response) {
            console.log(response); 
            $scope.remove = response.data.result;
            console.log("deleted book from my cart",$scope.remove);
            $scope.message = "deleted book from cart successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("deleted book from cart unsuccessful ", response);
            $scope.message = response.data.message;
          }
        )  
      }

      $scope.placeOrder = function() {
        $scope.show = false;
        $scope.showCustomer = true;
        
      }
      
      $scope.continue = function(){
        $scope.show = false; 
        $scope.showCustomer = false;
        console.log("customer details calling",$scope.myCartItems.fullAddress);
        var user = {
          'addressType': $scope.myCartItems.addressType,
          'fullAddress' : $scope.myCartItems.fullAddress,
          'city' : $scope.myCartItems.city,
          'state' : $scope.myCartItems.state
        }
        console.log("customer details calling",user);
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

      $scope.checkout = function(placeOrder){
        console.log('checkout calling',placeOrder)
        console.log("customer details calling",placeOrder._id);
        $scope.orders = []
        var user = {
          'product_id': placeOrder._id,
          'product_name' : placeOrder.bookName,
          'product_quantity' : placeOrder.quantity,
          'product_price' : placeOrder.price
        }
        $scope.orders.push(user);
        var bookOrders = $scope.orders;
        console.log('order details',bookOrders);
        $http({ 
          method: 'POST',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order',
          headers: {
            'Content-type' : 'application/json',
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

    // myWishlist controller
    .controller('myWishlistCtrl', ['$scope', '$state','$http', function ($scope, $state,$http) {
      console.log("myWishlist calling");
      $scope.myWishlistItems = [
        $http({ 
          method: 'GET',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items',
          headers: {
            'x-access-token': localStorage.getItem('token') 
          },
          // data: user    
        }).then(
          function successCallback(response) {
            console.log(response); 
            $scope.myWishlistItems = response.data.result;
            console.log($scope.myWishlistItems);
            $scope.message = "get my wishlist item created successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("get my wishlist item not created ", response);
            $scope.message = response.data.message;
          }
        )
      ]; 
      
      $scope.deleteWishlistItem = function(myWishlistItem){
        console.log("deleting item",myWishlistItem);
        $http({ 
          method: 'DELETE',
          url: 'https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/'+myWishlistItem._id,
          headers: {
            'x-access-token': localStorage.getItem('token') 
          },
          // data: user    
        }).then(
          function successCallback(response) {
            console.log(response); 
            $scope.deleteWishlistItem = response.data.result;
            console.log("deleted book from wishlist",$scope.deleteWishlistItem);
            $scope.message = "deleted book from wishlist successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("deleted book from wishlist unsuccessful ", response);
            $scope.message = response.data.message;
          }
        )  
      }

    }])

    // place order page controller
    .controller('placeOrderCtrl', ['$scope', '$state','$http', function ($scope, $state,$http) {
      console.log("place order calling");

    }])

    // place order page controller
    .controller('quickViewCtrl', ['$scope', '$state','$http', function ($scope, $state,$http) {
      console.log("quick view calling");
      
    }])

  })();
