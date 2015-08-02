/**
 * Created by zlbbq on 14-12-5.
 */

define(function (require, exports, module) {
    var jsonAPI = require('json-api');
    exports.load = function (callback, noSessionHandler) {
        jsonAPI.immediate('sys', 'lu', {}, function (err, result) {
            if (jsonAPI.isSuccess(err, result)) {
                app.user = result.result;
                callback && callback(app.user);
            }
            else {
                noSessionHandler && noSessionHandler();
            }
        });
    };

    exports.isLogin = exports.available = function () {
        return app.user != null;
    };

    exports.getLoginUser = function () {
        return app.user;
    };

    exports.isUserInRole = function (roles) {
        if (app.user == null) return false;
        roles = roles || [];
        if (roles.length == 0) return false;
        for (var i = 0; i < app.user.roles.length; i++) {
            var n = app.user.roles[i];
            if (n == '*') {
                return true;
            }
            for (var j = 0; j < roles.length; j++) {
                if (roles[j] == '*') {
                    return true;
                }
                if (n === roles[j]) {
                    return true;
                }
            }
        }
        return false;
    };
});