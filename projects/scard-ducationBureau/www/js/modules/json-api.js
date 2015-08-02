/**
 * Created by zlbbq on 14-12-4.
 */

define(function(require, exports, module){
    var $ = require('$');
    var async = require('async');
    require('jquery-json');

    var _config = {
        jsonCallTimeout : 5000,
        jsonAPIURL : '/json',
        jsoncAPIURL : '/jsonc',
        restURL : '/rest'
    };

    var SUCCESS_CODE = 0;
    var NEED_LOGIN = -6;

    var invokeArray = [];

    var _isSuccess = function(err, actionResult) {
        return !err && actionResult && actionResult.code === SUCCESS_CODE;
    };

    var _jsonAPI = function (m, a, args, timeout, callback) {
        var t = typeof args;
        if (t == 'function') {
            callback = args;
        }
        args = args || {};
        t = typeof timeout;
        if (t == 'function') {
            callback = timeout;
            timeout = _config.jsonCallTimeout;
        }
        else if (t == 'number') {
            timeout = (timeout < 0 || isNaN(timeout)) ? this.jsonCallTimeout : timeout;
        }
        else {
            timeout = _config.jsonCallTimeout;
        }
        if (typeof m == 'string' && typeof a == 'string' && !m.isEmpty() && !a.isEmpty()) {
            args.m = m;
            args.a = a;
            var options = {};
            options.url = _config.jsonAPIURL;
            options.type = 'POST';
            options.data = args;
            options.dataType = 'json';
            options.timeout = timeout;
            options.error = function (xmlHttpRequest, msg, err) {
                if(err && err.message) {
                    switch (msg) {
                        case 'timeout':
                        {
                            msg = 'JSON API请求超时, 超过设定值[' + (timeout / 1000) + ']秒, 请求参数: [' + $.toJSON(args) + ']';
                            break;
                        }
                        case 'error':
                        {
                            msg = 'JSON API请求发生异常[' + err.message + ']';
                            break;
                        }
                    }
                    var error = new Error(msg);
                    callback && callback(error, null);
                }
                else {
                    callback && callback(new Error('网络或服务错误'));
                }
            };
            options.success = function (actionResult) {
                callback && callback(null, actionResult);
            };
            $.ajax(options);
        }
        else {
            var err = new Error('参数类型错误');
            callback && callback(err, null);
        }
    };

    var _restfulApi = function(uri, args, timeout, callback) {
        var t = typeof args;
        if (t == 'function') {
            callback = args;
        }
        args = args || {};
        t = typeof timeout;
        if (t == 'function') {
            callback = timeout;
            timeout = _config.jsonCallTimeout;
        }
        else if (t == 'number') {
            timeout = (timeout < 0 || isNaN(timeout)) ? this.jsonCallTimeout : timeout;
        }
        else {
            timeout = _config.jsonCallTimeout;
        }
        if(/\/[a-zA-Z]+[a-zA-Z0-9\-_]*\/[a-zA-Z]+[a-zA-Z0-9\-_]*\??.*/.test(uri)) {
            var options = {};
            options.url = _config.restURL + uri;
            options.type = 'POST';
            options.data = args;
            options.dataType = 'json';
            options.timeout = timeout;
            options.error = function (xmlHttpRequest, msg, err) {
                if(err && err.message) {
                    switch (msg) {
                        case 'timeout':
                        {
                            msg = 'JSON API请求超时, 超过设定值[' + (timeout / 1000) + ']秒, 请求参数: [' + $.toJSON(args) + ']';
                            break;
                        }
                        case 'error':
                        {
                            msg = 'JSON API请求发生异常[' + err.message + ']';
                            break;
                        }
                    }
                    var error = new Error(msg);
                    callback && callback(error, null);
                }
                else {
                    callback && callback(new Error('网络或服务错误'));
                }
            };
            options.success = function (actionResult) {
                callback && callback(null, actionResult);
            };
            $.ajax(options);
        }
        else {
            var err = new Error('错误的Restful地址: ' + uri);
            callback && callback(err, null);
        }
    };

    var _lazy = function (name, m, a, args, timeout, callback) {
        var t = typeof args;
        if (t == 'function') {
            callback = args;
        }
        args = args || {};
        t = typeof timeout;
        if (t == 'function') {
            callback = timeout;
            timeout = _config.jsonCallTimeout;
        }
        else if (t == 'number') {
            timeout = (timeout < 0 || isNaN(timeout)) ? this.jsonCallTimeout : timeout;
        }
        else {
            timeout = _config.jsonCallTimeout;
        }
        if (typeof m == 'string' && typeof a == 'string' && !m.isEmpty() && !a.isEmpty()) {
            var invocation = {
                name : name,
                m: m,
                a: a,
                args: args,
                timeout: timeout,
                callback: callback
            };
            invokeArray.push(invocation);
        }
        return false;
    };

    var _send = function(callback) {
        var maxTimeout = 0;
        var arg = [];
        for(var i = 0;i<invokeArray.length;i++) {
            var invocation = invokeArray[i];
            if(invocation.timeout > maxTimeout) {
                maxTimeout = invocation.timeout;
            }
            arg.push({
                name : invocation.name,
                m : invocation.m,
                a : invocation.a,
                args : invocation.args
            });
        }

        var _cb = function(err, actionResult) {
            if(_isSuccess(err, actionResult)) {
                for(var i = 0;i<invokeArray.length;i++) {
                    var invocation = invokeArray[i];
                    if(typeof invocation.callback == 'function') {
                        invocation.callback(null, actionResult.result[invocation.name]);
                    }
                }
            }
            else {
                for(var i = 0;i<invokeArray.length;i++) {
                    var invocation = invokeArray[i];
                    if(typeof invocation.callback == 'function') {
                        invocation.callback(new Error('调用失败'), null);
                    }
                }
            }
            invokeArray = [];
            callback && callback(err, actionResult);
        };

        var options = {};
        options.url = _config.jsoncAPIURL;
        options.type = 'POST';
        options.data = arg;
        options.dataType = 'json';
        options.timeout = maxTimeout;
        options.error = function (xmlHttpRequest, msg, err) {
            if(err && err.message) {
                switch (msg) {
                    case 'timeout':
                    {
                        msg = 'JSON API请求超时, 超过设定值[' + (options.timeout / 1000) + ']秒';
                        break;
                    }
                    case 'error':
                    {
                        msg = 'JSON API请求发生异常[' + err.message + ']';
                        break;
                    }
                }
                var error = new Error(msg);
                _cb(error, null);
            }
        };
        options.success = function (actionResult) {
            _cb(null, actionResult);
        };
        $.ajax(options);
    };

    var _handleErrors = function(err, result, handler) {
        handler = handler || {
            noSessionHandler : app.noSessionHandler || function(){
                console.log('用户未登录通用处理->json-api.js');
            },
            errorHandler : app.jsonAPIErrorHandler || function(msg) {
                console.log('jsonAPI错误通用处理->json-api.js' + ',' + msg);
            }
        };
        if(_isSuccess(err, result)) {
            return true;
        }
        else if(!err && result.code === NEED_LOGIN){
            console.log(module.uri + '-> _handleErrors(USER_NOT_LOGIN)');
            handler.noSessionHandler && handler.noSessionHandler();
        }
        else {
            var msg = _getError(err, result);
            console.log(module.uri + '-> _handleErrors('+msg+')');
            handler.errorHandler && handler.errorHandler(msg);
        }
        return false;
    };

    function _combo (jsonCalls, callback) {
        jsonCalls = jsonCalls || [];
        var calls = [];
        for(var i = 0;i<jsonCalls.length;i++) {
            (function(o){
                var fn = function(cb) {
                    var _callback = function(err, result){
                        o.callback && o.callback(err, result);
                        cb(err, result);
                    };
                    _jsonAPI(o.m, o.a, o.args || {}, o.timeout || _config.jsonCallTimeout, _callback);
                };
                calls.push(fn);
            })(jsonCalls[i]);
        }
        async.series(calls, callback || function(){});
    }

    function _getError(err, result) {
        return (err && err.message) || (result.msg + '(' + result.code + ')');
    }

    module.exports.isSuccess = _isSuccess;

    module.exports.call = module.exports.jsonAPI = module.exports.immediate = _jsonAPI;

    module.exports.rest = module.exports.restful = _restfulApi;
    /*
    module.exports.lazy = _lazy;
    module.exports.send = _send;
    */
    module.exports.clearLazy = function() {
        invokeArray = [];
    };

    //接口留好, 测试时直接调用
    module.exports.lazy = function(m, a, args, timeout, callback) {
        _jsonAPI(m, a, args, timeout, callback);
    };

    module.exports.send = module.exports.flush = function(callback){
        callback && callback();
    };

    module.exports.combo = _combo;

    module.exports.handleErrors = _handleErrors;

    module.exports.getError = _getError;
});
