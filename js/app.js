var App = angular.module('Company', []);

App.controller('HelloWorldController', ['$scope', function($scope) {
$scope.greeting = 'Hello World!';
}]);
