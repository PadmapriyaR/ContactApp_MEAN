var app = angular.module('contactApp', [
  'ngRoute', 'ngStorage'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider   
    .when("/", {
      templateUrl: "templates/create.html", 
      controller: "createCtrl"
    })
    .when("/view", {
      templateUrl: "templates/view.html", 
      controller: "viewCtrl"
    })
    .otherwise("/", {
      templateUrl: "templates/create.html", 
      controller: "createCtrl"
    });
}]);

app.controller('viewCtrl', function($scope, $localStorage, $location, $http, $timeout, $q, $log) {
  console.log('view controller');
    $http.get('/api/contacts', $scope.contact).success(function(response){
        $scope.contacts = response;
        console.log('from view', $scope.contacts);
    });   

    $scope.editContact = function(id){
      $http.get('/api/contacts/'+id).success(function(response){
        $scope.contact = response;
        $scope.contact.mobile = response.mobile;
        console.log('from edit', $scope.contact.mobile);
      });
    }

    $scope.updateContact = function(){
      console.log('from updateContact', $scope.contact);
      $http.put('/api/contacts/'+$scope.contact._id, $scope.contact).success(function(response){
          console.log('updated', $scope.contact);
          $scope.contact = '';
          refresh();
      });
    }

    var refresh = function(){
      console.log('came to refresh');
      $http.get('/api/contacts').success(function(response){
         console.log('Final lists'); 
         $scope.contacts = response;
         $scope.contact = '';
      });
    }

    $scope.deleteContact = function(id){
        $http.delete('/api/contacts/'+$scope.contact._id).success(function(response){
          console.log('Deleted!');
          $scope.contact = '';
          refresh();
        });
      }
});

app.controller('createCtrl', function($scope, $filter, $localStorage, $location, $http, $timeout, $q, $log, $window) {
  console.log('Create controller');
  $scope.createContact = function(){
    console.log('createContact function');
    $http.post('/api/contacts', $scope.contact).success(function(response){
        console.log(response);
        $scope.contact = '';
    });
  }  
});