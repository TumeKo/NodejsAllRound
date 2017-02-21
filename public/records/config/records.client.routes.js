angular.module('records').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/records', {
        templateUrl: 'records/views/list-records.client.view.html'
    }).when('/records/create', {
        templateUrl: 'records/views/create-records.client.view.html'
    }).when('/records/:recordId', {
        templateUrl: 'records/views/view-records.client.view.html'
    }).when('/records/:articleId/edit', {
        templateUrl: 'records/views/edit-records.client.view.html'
    });
}]);