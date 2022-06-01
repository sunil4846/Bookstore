// myWishlist controller
bookStoreApp.controller('myWishlistCtrl', ['$scope', '$state','$http', function ($scope, $state,$http) {
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