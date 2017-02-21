angular.module('records').factory('Records', ['$resource', function($resource){
    return $resource('api/records/:recordId',{
        recordId: '@_id'
    },{
        update: {
            method: 'PUT'
        }
    });
}]);