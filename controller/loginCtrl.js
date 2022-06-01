 // login controller
 bookStoreApp.controller('loginCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
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