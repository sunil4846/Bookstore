var bookStoreApp = angular.module('app', ['ui.router','angularUtils.directives.dirPagination']);    //,'ngMaterial'

bookStoreApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
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

   

  ;
