/**
 * Created by zlbbq on 15-4-29.
 */


define(function(require, exports, module){
    exports.SEARCH = 'search';
    exports.HASH = 'hash';

    var _getQueryParams = function (where) {
        var s = '';
        if(where == 'hash') {
            var search = location.hash;
            s = search.replace(/#.*\?/, '');
        }
        else {
            var search = location.search;
            s = search.replace(/\?/, '');
        }
        var regEx = /([\w\-]*)=([^&]*)/;
        var param = {};
        while (true) {
            var p = regEx.exec(s);
            if (p == null) {
                break;
            }
            s = s.replace(regEx, '');
            param[p[1]] = decodeURIComponent(p[2]);
        }
        return param;
    };

    exports.getQueryParam = function(name, where) {
        where = where || (window.$spa ? 'hash' : 'hash');
        name = name || '*';
        var param = _getQueryParams(where);
        if(name == '*') {
            return param;
        }
        else {
            return param[name];
        }
    };

    //overwrite window.getQueryParam, set the hash parameter has higher priority in SPA environment
    window.getQueryParam = exports.getQueryParam;
});