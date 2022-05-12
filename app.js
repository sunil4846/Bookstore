(function() {
angular.module('app', ['ui.router'])

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
          url: 'https://new-bookstore-backend.herokuapp.com/bookstore_user/login',
          data: user
  
        }).then(
          function successCallback(response) {
            console.log("login successful",response);
            localStorage.setItem('token',response.data.id);
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
          'phone': $scope.phone,
          'service': 'advance'
        }
        console.log("signup calling", user);
        $http({
          method: 'POST',
          url: 'https://new-bookstore-backend.herokuapp.com/bookstore_user/registration',
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
    .controller('dashboardCtrl', ['$scope', '$state','$http', function ($scope, $state,$http) {
      console.log("dashboard calling");
      
      //get all books
      $scope.books = [
        $http({ 
          method: 'GET',
          url: 'https://new-bookstore-backend.herokuapp.com/bookstore_user/get/book',
          headers: {
            'Authorization': localStorage.getItem('token') 
          },
          // data: user    
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
      
    }])
  })();
