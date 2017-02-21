angular.module('cv').factory('Cv', ['$resource', function($resource){
    return $resource('api/cv',{});
}]);