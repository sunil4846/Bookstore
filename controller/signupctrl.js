// bookStoreApp.controller('signupCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
//     console.log("signup calling");
//     $scope.signup = function () {
//         console.log("register calling");
//         var user = {
//             'fullName': $scope.fullName,
//             'email': $scope.email,
//             'password': $scope.password,
//             'phone': $scope.phone,
//             'service': 'advance'
//         }
//         console.log("signup calling", user);
//         $http({
//             method: 'POST',
//             url: 'https://new-bookstore-backend.herokuapp.com/bookstore_user/registration',
//             data: user

//         }).then(
//             function successCallback(response) {
//                 console.log("signup successful");
//                 console.log(response);
//                 $scope.message = "signup successful";
//                 $location.path('template/dashboard.html');
//             },
//             function errorCallback(response) {
//                 console.log("signup  unsuccessful", response);
//                 $scope.message = response.data.message;
//             }
//         );

//     };

// }])