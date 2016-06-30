'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

// Home controller
.controller('HomeCtrl', ['$scope', '$firebaseAuth',
  function($scope, $firebaseAuth) {
    var auth = $firebaseAuth();

    $scope.signIn = function() {
      var username = $scope.user.email;
      var password = $scope.user.password;

      auth.$signInWithEmailAndPassword(username, password).catch(function(error){
        console.log(error);
      })
    };

    $scope.signOut = function(){
      auth.$signOut()
    };

    $scope.auth = auth;

    $scope.auth.$onAuthStateChanged(function(firebaseUser){
      $scope.firebaseUser = firebaseUser;
    });

  }
]);
