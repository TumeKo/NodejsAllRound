angular.module('cv').controller('CvController',['$scope', '$routeParams', '$location', 'Cv',function($scope, $routeParams, $location, Cv){
    $scope.find = function () {
        $scope.cvs = Cv.query();
    };
    
    $scope.create = function(){
        var cv = new Cv({
            title: this.title,
            content: this.content
        });
        cv.$save(function(res){
            $location.path('cv');
        }, function(errRes){
            $scope.error = errRes.data.message;
        });
    };
    $scope.changeView = function(view){
        $location.path(view);
    };
   
    
}]);