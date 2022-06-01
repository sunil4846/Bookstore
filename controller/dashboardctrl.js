// dashboard controller
bookStoreApp.controller('dashboardCtrl', ['$scope', '$state','$http','$location','$filter', function ($scope, $state,$http,$location,$filter) {
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
          $scope.lowToHigh();
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
    $scope.lowToHigh = function(){
      $scope.reverse = false;
      console.log($scope.books);
      for(let i = 0 ;i <= $scope.books.length; i++){
        $scope.booksList = $scope.books[i].discountPrice;
        console.log('list of discountPrice',$scope.booksList);
      }
      // $scope.test = $scope.booksList.sort(function(a, b) {
      //   return a.discountPrice - b.discountPrice;
      // });
      console.log('list of discountPrice',$scope.booksList);
      $scope.test = $filter('orderBy')($scope.booksList, 'discountPrice', $scope.reverse);
      console.log($scope.test);        
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
      console.log("calling quick view",book);
      $scope.variableBook = book;
      // for(let i = 0 ;i <= $scope.books.length; i++){
      //   $scope.booksList = $scope.books[i];
      //   // console.log('list of books ',$scope.booksList);
      //   if (book == $scope.booksList) {
      //     // console.log(book._id);
      //     console.log($scope.books[i]);
      //     $scope.variableBook = $scope.books[i];
      //     console.log($scope.variableBook);
      //     $location.path('/quickView');
      //   }
      // }  
      console.log($scope.variableBook);
      $location.path('/quickView');
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