var app = angular.module('app', []);

app.controller('PhoneListCtrl', function ($scope, $http) {
        $http.get('/rest/demo/demo').success(function(data){
                $scope.ppp = data;
        });
        $scope.phones = [
                {
                        'name': 'Nexus S',
                        'snippet': 'Fast just got faster with Nexus S.'
                },
                {
                        'name': 'Motorola XOOM™ with Wi-Fi',
                        'snippet': 'The Next, Next Generation tablet.'
                },
                {
                        'name': 'MOTOROLA XOOM™',
                        'snippet': 'The Next, Next Generation tablet.'
                }
        ];
});