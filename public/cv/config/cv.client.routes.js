angular.module('cv').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/cv', {
        templateUrl: 'cv/views/cv2.client.view.html'
    }).when('/cv2', {
        templateUrl: 'cv/views/cv3.client.view.html'
    }).when('/cv/create', {
        templateUrl: 'cv/views/cv-create.client.view.html'
    });
}]);