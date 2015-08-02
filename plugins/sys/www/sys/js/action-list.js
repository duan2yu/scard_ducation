//../../js/lib/jquery-1.11.3.min.js
var app = angular.module('app', []);
app.controller('ActionList', function PhoneListCtrl($scope, $http) {
        $http.get('/action/sys/la').success(function(data){
            $scope.actionList = data.result;
                sotrArr($scope.actionList);
                $("td a").click(function(){
                        open("action-desc.html?"+$(this).val());
                })
        });
        $scope.actionList1 = [
                {
                        m: "mvc-test",
                        a: "action1",
                        state: 1,
                        desc: "测试１"
                },

                {
                        m: "mvc-test1",
                        a: "action2",
                        state: 1,
                        desc: "测试2"
                },
                {
                        m: "mvc-test",
                        a: "action3",
                        state: 1,
                        desc: "测试3"
                },
                {
                        m: "mvc-test1",
                        a: "action4",
                        state: 1,
                        desc: "测试4"
                }
        ];

        var reNum = function (a, b) {
                if (a.m < b.m) {
                        return -1;
                } else {
                        return 1;
                };
        }
        function sotrArr(data){
                var data = data.sort(reNum);
//            alert(JSON.stringify(arr.sort(reNum)));
        }





});


function toDesc(){
        open("action-desc.html?"+$(this).val());
}