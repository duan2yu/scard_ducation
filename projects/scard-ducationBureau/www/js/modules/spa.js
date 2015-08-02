/**
 * Created by zlbbq on 14-12-4.
 */

define(function (require, exports, module) {
    var $ = require('$');
    require('./query-parameter.js');

    //页面路由，_routes['T'] = 'test/T'表示访问xxx#T时，实际使用test/T.html及test/T.js
    var _routes = {};

    //默认Widget URL前缀和Widget JS的前缀
    var _DEFAULT_HOME = './widgets';
    //默认加载的容器
    var _DEFAULT_CONTAINER = '#__spa__';
    var _DEFAULT_WIDGET = 'home';

    var _widgetHome = _DEFAULT_HOME;
    var _containerSelector = _DEFAULT_CONTAINER;
    var _defaultWidget = _DEFAULT_WIDGET;
    var _autoScroll = true;
    var _autoScrollAnimate = 200;
    var _version = '$RELEASE_VERSION$';              //版本号，每次发布时请使用程序替换该占位符
    var hash = '';
    var realHash = '';
    var smartMode = false;                            //默认true当smartMode === true时，如果hash只是参数变化，则不再重新请求widget与widgetJS改为直接调用$module.onParameterChange()来刷新数据
    //var _mode = 'production';                        //正式发布的版本要确认是production模式, 开发时请在本地改成dev,并且不要提交
    var _mode = 'dev';
    var _404Defined = true;
    var _404Content = null;
    var _beforeLoad = function (hash, widgetURL) {
    };
    var _afterLoad = function (hash, widgetURL, flag) {
    };
    var _loadErrorHandler = function (element, res, status, xhr, widgetURI) {
        if (widgetURI.indexOf('?') > 0) {
            widgetURI = widgetURI.substring(0, widgetURI.indexOf('?'));
        }
        var extraInfo = '';
        if (xhr.status == 404) {
            extraInfo = '(' + _normalizeURI(widgetURI) + ')';
        }
        if (_404Content) {
            $(_containerSelector).html(_404Content);
            $(_containerSelector).find('[url404]').text(_normalizeURI(widgetURI));
        }
        else if (_404Defined !== false) {
            $(_containerSelector).load(_getModuleWidgetURL('404'), function (res, status, xhr) {
                if (status != 'error') {
                    _404Content = xhr.responseText;
                    $(_containerSelector).find('[url404]').text(_normalizeURI(widgetURI));
                }
                else if (xhr.status == 404) {
                    _404Defined = false;
                    $(element).html('<label style="color:red">Error:' + xhr.status + extraInfo + '</label>');
                }
                else {
                    $(element).html('<label style="color:red">Error:' + xhr.status + extraInfo + '</label>');
                }
            });
        }
        else {
            $(element).html('<label style="color:red">Error:' + xhr.status + extraInfo + '</label>');
        }
    };

    function _getModuleWidgetURL(hash) {
        hash = hash.replace(/\#!?/, '');
        if (_routes[hash]) {
            hash = _routes[hash];
        }
        else {
            for(var p in _routes) {
                var path = _routes[p];
                p = p.replace(/\-/, '\\-');
                p = p.replace(/\*/, '.+');
                p = '^' + p + '$';
                var regEx = new RegExp(p);
                if(regEx.test(hash)) {
                    if(path.endsWidth('/')) {
                        hash = path + hash;
                    }
                    else {
                        hash = path;
                    }
                }
            }
        }
        var url = '';
        var ext = '.html';
        if(hash.endsWidth('.shtml')) {
            ext = '';
        }
        else if(hash.endsWidth('.html')) {
            ext = '';
        }
        if(hash.startsWith('/')) {
            url = hash + ext;
        }
        else {
            url = _widgetHome + '/' + hash + ext;
        }
        if (_mode === 'dev') {
            url += '?d=' + new Date().getTime();
        }
        else {
            url += '?v=' + _version;
        }
        return url;
    }

    function _getModuleJSURL(hash) {
        hash = hash.replace(/\#!?/, '');
        if (_routes[hash]) {
            hash = _routes[hash];
        }
        else {
            for(var p in _routes) {
                var path = _routes[p];
                p = p.replace(/\-/, '\\-');
                p = p.replace(/\*/, '.+');
                p = '^' + p + '$';
                var regEx = new RegExp(p);
                if(regEx.test(hash)) {
                    if(path.endsWidth('/')) {
                        hash = path + hash;
                    }
                    else {
                        hash = path;
                    }
                }
            }
        }
        hash = hash.replace(/\.shtml/i, '');
        hash = hash.replace(/\.html/i, '');
        var url = '';
        if(hash.startsWith('/')) {
            url = hash + '.js';
        }
        else {
            url = _widgetHome + '/' + hash + '.js';
        }
        if (_mode === 'dev') {
            url += '?d=' + new Date().getTime();
        }
        else {
            url += '?v=' + _version;
        }
        return url;
    }

    function _normalizeURI(uri) {
        return uri;
    }

    function _launch(spaDashboard, config) {
        if(arguments.length == 1) {
            config = spaDashboard;
            spaDashboard = config.spaDashboard;
        }
        window.$spa = spaDashboard;
        config = config || {};
        config.routesEx = config.routesEx || [];
        app.use(config.routesEx, function(){
            for(var i = 0;i<arguments.length;i++) {
                if(arguments[i] != null) {
                    $.extend(_routes, arguments[i].routes || {});   //外面脚本定义: module.exports.routes = {...};
                }
            }
            $.extend(_routes, config.routes || {});
            _widgetHome = config.widgetHome || _widgetHome;
            _containerSelector = config.container || _containerSelector;
            _loadErrorHandler = config.loadErrorHandler || _loadErrorHandler;
            _defaultWidget = config.defaultWidget || _defaultWidget;
            _beforeLoad = config.beforeLoad || _beforeLoad;
            _afterLoad = config.afterLoad || _afterLoad;
            _autoScroll = config.autoScroll === false ? false : true;
            _mode = config.mode || _mode;
            _version = config.version || _version;
            smartMode = config.smartMode === true ? true : false;
            hash = config.ignoreInitLoad === true ? _defaultWidget : hash;
            if ($(_containerSelector).length > 0) {
                setInterval(function () {
                    var _hash = window.location.hash || _defaultWidget;
                    if (_hash != hash) {
                        hash = _hash;
                        _hash = _hash.replaceAll('\\\?.*$', '');
                        if (realHash != _hash || !smartMode) {
                            realHash = _hash;
                            var widgetURL = _getModuleWidgetURL(_hash);
                            _beforeLoad(_hash, widgetURL);
                            $(_containerSelector).load(widgetURL, function (res, status, xhr) {
                                if (status != 'error') {
                                    freeModule && freeModule();
                                    if(_autoScroll === true) {
                                        $('html, body').animate({scrollTop: 0}, _autoScrollAnimate);
                                    }
                                    if (!_hash.startsWith('#_') && !_hash.startsWith('#!_')) {
                                        app.use(_getModuleJSURL(_hash), function (widgetModule) {
                                            if (widgetModule && typeof widgetModule.init == 'function') {
                                                widgetModule.init($(_containerSelector), function () {
                                                    _afterLoad(_hash, widgetURL, true);
                                                });
                                            }
                                            else {
                                                _afterLoad(_hash, widgetURL, false);
                                            }
                                        });
                                    }
                                    else {
                                        _afterLoad(_hash, widgetURL, true);
                                    }
                                }
                                else {
                                    _loadErrorHandler(_containerSelector, res, status, xhr, widgetURL);
                                    _afterLoad(_hash, widgetURL, false);
                                }
                            });
                        }
                        else {              //模块widget是一样的，只是参数变化了，调用模块的onParameterChange()函数
                            //TODO 重写这块的事件
                            if ($module && typeof $module.onParameterChange == 'function') {
                                $module.onParameterChange(getQueryParam());
                            }
                        }
                    }
                }, 100);
            }
            else {
                console.log('找不到OSOP容器->' + _containerSelector);
            }
        });
    }

    //可以使用该函数重定向Hash
    window.redirect = window.hashTo = function (hash, arg) {
        hash = hash.replaceAll('\\\/', '\\^');
        if (typeof arg == 'string') {
            if (arg.indexOf('?') != 0) {
                arg = '?' + arg;
            }
            window.location.hash = hash + arg;
        }
        else if (typeof arg == 'object') {
            var s = [];
            for (var key in arg) {
                if (typeof key != "function") {
                    s.push(key + '=' + encodeURIComponent(arg[key]));
                }
            }
            if(s.length > 0) {
                window.location.hash = hash + '?' + s.join('&');
            }
            else {
                window.location.hash = hash;
            }
        }
        else {
            window.location.hash = hash;
        }
    };

    exports.launch = _launch;
});