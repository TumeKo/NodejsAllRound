angular.module('records').controller('RecordsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Records', function ($scope, $routeParams, $location, Authentication, Records) {
    var weatherAPI = "9358ae82ce4605ccc43b9cb5b5272c6c";
    var xmlhttp;
    $scope.authentication = Authentication;
    $scope.create = function () {
        var record = new Records({
            title: this.title,
            content: this.content,
            weather: this.weather,
            location: this.location,
            name: this.name,
            weight: this.weight,
            length: this.length
        });
        
        record.$save(function (response) {
            $location.path('records/' + response._id);
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.find = function () {
        $scope.records = Records.query();
    };
    
    $scope.findOne = function () {
        $scope.record = Records.get({
            recordId: $routeParams.recordId
        });
    };
    
    $scope.update = function () {
        $scope.record.$update(function () {
            $location.path('records/' + $scope.record._id);
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    var getWeather = function () {
        var lat = $scope.location[0],
            lon = $scope.location[1];
        var requrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + weatherAPI;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = processResult; //Get data when ready
        getData(requrl);
    };
    
    function getData(url) {
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }
    
    function processResult() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            
            var result =  JSON.parse(xmlhttp.responseText);
            $scope.weather = result.weather[0].description;
            console.log($scope.weather);
            
            $scope.$apply();
        }
    }
    
    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.location = [position.coords.latitude.toFixed(7),position.coords.longitude];
                $scope.$apply();
                getWeather();
            });
        } else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    };
    
    
    $scope.delete = function (record) {
        if (record) {
            record.$remove(function() {
                for (var i in $scope.records) {
                    if ($scope.records[i] === record){
                        $scope.records.splice(i,1);
                    }
                }
            });
        } else {
            $scope.record.$remove(function(){
                $location.path('records');
            });
        }
    };
    
}]);