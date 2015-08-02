/**
 * Created by zlbbq on 15-4-20.
 */

define(function (require, exports, module) {
    var jsonAPI = require('json-api');
 /*   module.exports.loadSession = function (callback, noSessionHandler) {
        jsonAPI.rest('/BASIC/lu', {}, function (err, result) {
            if (jsonAPI.isSuccess(err, result)) {
                app.user = result.result;
                callback && callback(app.user);
            }
            else {
                noSessionHandler && noSessionHandler();
            }
        });
    };*/
    module.exports.loadSession = function (callback, noSessionHandler) {
        app.user={'name':'test'};
        callback && callback(app.user);
    };

    module.exports.isLogin = exports.available = function () {
        return app.user != null;
    };

    module.exports.getLoginUser = function () {
        return app.user;
    };

    module.exports.isUserInRole = function (roles) {
        if (app.user == null) return false;
        if (app.user.roles == null) return false;
        roles = roles || [];
        if (typeof roles != 'number') {
            for (var i = 0; i < app.user.roles.length; i++) {
                var n = app.user.roles[i];
                if (n == '*') {
                    return true;
                }
                for (var j = 0; j < roles.length; j++) {
                    if (n === roles[j]) {
                        return true;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < app.user.roles.length; i++) {
                var n = app.user.roles[i];
                if (n === roles) {
                    return true;
                }
            }
        }
        return false;
    };

    //----------------------------------------Menus-----------------------------------------//


    module.exports.getMenu = function (cb) {
        //获取用户菜单
        //jsonAPI.restful("/BASIC-MENU/GET-MENU-BY-USER", {}, function (err, result) {
     //       if (jsonAPI.handleErrors(err, result)) {
                var menus=[
                    {
                        'MENU_CODE':'1',
                        'MENU_LINK':'test',
                        'MENU_ICON':'icon-edit',
                        'MENU_TEXT':'广告管理'
                    }
                ]
                var data = menus;
                var nemuHtml = '';
                for (var _i = 0; _i < data.length; _i++) {
                    if (data[_i]["MENU_CODE"].length == 2) {
                        alert( data[_i]["MENU_CODE"]);

                        nemuHtml = '<li menucode="' + data[_i]["MENU_CODE"] + '"><a href="' + data[_i]["MENU_LINK"] + '"><img class="menuIcon icon-" src="' + data[_i]["MENU_ICON"] + '"/><span>' + data[_i]["MENU_TEXT"] + '</span></a></li>'
                        $("#main-nav>div>ul").append(nemuHtml);
                    } else {
                        alert("li [menucode=" + data[_i]["MENU_CODE"].substring(0, data[_i]["MENU_CODE"].length - 2) + "]");
                        var _pLi = $("li [menucode=" + data[_i]["MENU_CODE"].substring(0, data[_i]["MENU_CODE"].length - 2) + "]");
                        nemuHtml = '<li menucode="' + data[_i]["MENU_CODE"] + '"><a href="' + data[_i]["MENU_LINK"] + '"><img class="menuIcon icon-" src="' + data[_i]["MENU_ICON"] + '"/><span>' + data[_i]["MENU_TEXT"] + '</span></a></li>'
                        if ($("li[menucode=" + data[_i]["MENU_CODE"].substring(0, data[_i]["MENU_CODE"].length - 2) + "]").find("ul").length == 0) {
                            nemuHtml = '<ul class="nav nav-stacked in" style="display: none;">' + nemuHtml + '</ul>';
                            _pLi.append(nemuHtml);
                            if( _pLi.find('.icon-angle-down').length==0){
                            _pLi.find('a').append(' <i class="icon-angle-down angle-down"></i>');}
                            _pLi.find('a').addClass('dropdown-collapse');
                        }
                        else {
                            _pLi.find("ul").append(nemuHtml);
                        }
                    }
                }
                cb && cb();
     //       }
   //     });

    };
});
