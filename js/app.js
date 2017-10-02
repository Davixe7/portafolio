angular.module("myApp", ["ngRoute"])
.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix("");
  $locationProvider.html5Mode(true);
  
  $routeProvider
  .when("/", {
    controller : "mainController",
    templateUrl : "templates/home.html"
  })
  .when("/portfolio", {
    controller : "mainController",
    templateUrl : "templates/portfolio.html"
  })
  .when("/hire", {
    controller : "mainController",
    templateUrl : "templates/hire.html"
  });
})
.directive('includeReplace', function(){
  return {
    require: 'ngInclude',
    restrict: 'A', /* optional */
    link: function (scope, el, attrs) {
      el.replaceWith(el.children());
    }
  };
})
.controller("mainController", function($scope, $http){
    
    $scope.profile = {};
    $scope.projects = [];
    $scope.currentProject = {};
    
    $scope.setCurrentProject = function(id){
      let foundProject = $scope.projects.find(function(proj){
        return proj._id == id;
      });
      
      if(foundProject){
        $scope.currentProject = foundProject;
      }else{
        console.log("No projects found");
      }
    }
    
    $http.get("js/profile.json").then(function(res){
      if(res){
        $scope.profile = res.data;
        console.log($scope.profile["work-exp"]);
      }else {
        console.log("There's no response");
      }
    });
    
    $http.get("js/projects.json").then(function(res){
      if(res){
        $scope.projects = res.data;
        $scope.currentProject = $scope.projects[0];
      }else {
        console.log("There's no response");
      }
    });
    
    $scope.printVersion = function(){
      $(".component img, .component i").toggle();
    }
    
    $scope.toggleText = function(){        
      $('.description > .text').toggle();
    }
    
  }
);