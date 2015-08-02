
var app = angular.module('app', []);
app.controller('ActionDesc', function PhoneListCtrl($scope,$http) {
        $http.get('/action/sys/ad?moduleName='+GetQueryString("action").split('/')[0]+"&actionName="+GetQueryString("action").split('/')[1]).success(function(data){
                $scope.params = data.result;

        });
        $scope.params1 = [
                {name: "param1",
                        type: "int",
                        length:2,
                        desc:"测试１",
                        validations:'..'
                }

        ];
        $("#actionName").html('功能接口: /action/' + GetQueryString("action"));
});
function GetQueryString(name)
{
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
}