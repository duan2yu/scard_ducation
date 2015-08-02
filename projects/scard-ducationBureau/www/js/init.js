/**
 * Created by zlbbq on 14-12-4.
 */

/**
 * ECMA-extension
 */
(function(){
    if (!window.console) {
        window.console = {
            log: function (s) {
            },
            error: function (err) {
            }
        };
    }
})();

(function () {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
//            if (typeof this !== "function") {
//// closest thing possible to the ECMAScript 5 internal IsCallable function
//                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
//            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (o) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == o) {
                    return i;
                }
            }
            return -1;
        };
    }
})();


(function () {
    String.prototype.startsWith = function (s) {
        return this.indexOf(s) == 0;
    };

    String.prototype.endsWidth = function (s) {
        return this.lastIndexOf(s) >= 0 && this.lastIndexOf(s) == this.length - s.length;
    };

    String.prototype.replaceAll = function (s1, s2) {
        if(typeof s1 == 'string') {
            return this.replace(new RegExp(s1, "gm"), s2);
        }
        else {
            return this.replace(s1, s2);
        }
    };

    String.prototype.trim = function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };

    String.prototype.toInt = function (noNaN) {
        var n = parseInt(this);
        if (noNaN === true) {
            n = isNaN(n) ? 0 : n;
        }
        return n;
    };

    String.prototype.toNumber = function (noNaN) {
        var n = parseFloat(this);
        if (noNaN === true) {
            n = isNaN(n) ? 0 : n;
        }
        return n;
    };

    String.prototype.contains = function (s) {
        return this.indexOf(s) >= 0;
    };

    String.prototype.isEmpty = function () {
        return this.trim().length == 0;
    };

    String.prototype.isIn = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == this) {
                return true;
            }
        }
        return false;
    };

    Array.prototype.clear = function () {
        this.length = 0;
    };

    Array.prototype.contains = function (o, fn) {
        for (var i = 0; i < this.length; i++) {
            if (!fn) {
                if (o == this[i]) {
                    return true;
                }
            }
            else {
                if (fn(o, this[i])) {
                    return true;
                }
            }
        }
        return false;
    };

    Array.prototype.remove = function (o, p) {
        var idx = -1;
        for (var i = 0; i < this.length; i++) {
            if (!p) {
                if (o == this[i]) {
                    idx = i;
                    break;
                }
            }
            else {
                if (o[p] == this[i][p]) {
                    idx = i;
                    break;
                }
            }
        }
        if (idx >= 0) {
            this.splice(idx, 1);
        }
    };

    Array.prototype.removeBy = function (o, fn) {
        var idx = -1;
        for (var i = 0; i < this.length; i++) {
            if (fn && fn(o, this[i])) {
                idx = i;
                break;
            }
            else if (o == this[i]) {
                idx = i;
                break;
            }
        }
        if (idx >= 0) {
            this.splice(idx, 1);
        }
    };


    Date.prototype.format = function (fmt) {
        if (fmt == null || typeof fmt != 'string' || (typeof fmt == 'string' && fmt.trim().length == 0)) {
            fmt = 'yyyyMMddHHmmss';
        }
        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
        return fmt.replace(/yyyy|yy|MM|dd|HH|mm|ss|星期|周|www|week/g, function (a) {
            switch (a) {
                case "yyyy":
                    return this.getFullYear();
                case "yy":
                    return (this.getFullYear() + "").slice(2);
                case "MM":
                    return this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1;
                case "dd":
                    return this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
                case "HH":
                    return this.getHours() < 10 ? '0' + this.getHours() : this.getHours();
                case "mm":
                    return this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
                case "ss":
                    return this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds();
                case "星期":
                    return "星期" + week[this.getDay() + 7];
                case "周":
                    return "周" + week[this.getDay() + 7];
                case "week":
                    return week[this.getDay()];
                case "www":
                    return week[this.getDay()].slice(0, 3);
            }
        }.bind(this));
    };

    Date.prototype.formatCN = function () {
        return this.format('yyyy年MM月dd日 HH时mm分ss秒');
    };

    Date.prototype.formatCN_NS = function () {
        return this.format('yyyy年MM月dd日 HH时mm分');
    };

    Date.prototype.formatMix = function () {
        return this.format('yyyy年MM月dd日 HH:mm');
    };

    Date.originalParse = Date.parse;

    Date.parse = Date.from = function (s, fmt, nullable) {
        var empty = nullable === false ? new Date(0) : null;

        if (!s || s.trim().length == 0) return empty;
        if (!fmt || fmt.trim().length == 0) {
            fmt = 'yyyyMMddHHmmss';
        }

        var y4 = "([0-9]{4})";
        var y2 = "([0-9]{2})";
        var M2 = "(0[1-9]|1[0-2])";
        var M1 = "([1-9]|1[0-2])";
        var d2 = "(0[1-9]|[1-2][0-9]|30|31)";
        var d1 = "([1-9]|[1-2][0-9]|30|31)";
        var H2 = "([0-1][0-9]|20|21|22|23)";
        var H1 = "([0-9]|1[0-9]|20|21|22|23)";
        var m2 = "([0-5][0-9])";
        var m1 = "([0-9]|[1-5][0-9])";
        var s2 = "([0-5][0-9])";
        var s1 = "([0-9]|[1-5][0-9])";

        fmt = fmt.trim();
        var reg = fmt;
        if (reg == '') return empty;

        reg = reg.replace(/yyyy/, y4);
        reg = reg.replace(/yy/, y2);
        reg = reg.replace(/MM/, M2);
        reg = reg.replace(/M/, M1);
        reg = reg.replace(/dd/, d2);
        reg = reg.replace(/d/, d1);
        reg = reg.replace(/HH/, H2);
        reg = reg.replace(/H/, H1);
        reg = reg.replace(/mm/, m2);
        reg = reg.replace(/m/, m1);
        reg = reg.replace(/ss/, s2);
        reg = reg.replace(/s/, s1);

        reg = new RegExp("^" + reg + "$");
        if (reg.test(s)) {
            var values = reg.exec(s);
            var yi, Mi, di, Hi, mi, si;     //确认在values中的各个值的index
            var arr = [];
            var i = 0;
            yi = fmt.search(/yyyy/);
            if (yi < 0) {
                yi = fmt.search(/yy/);
            }
            if (yi >= 0) {
                arr[i++] = yi;
            }

            Mi = fmt.search(/MM/);
            if (Mi < 0) {
                Mi = fmt.search(/M/);
            }
            if (Mi >= 0) {
                arr[i++] = Mi;
            }

            di = fmt.search(/dd/);
            if (di < 0) {
                di = fmt.search(/d/);
            }
            if (di >= 0) {
                arr[i++] = di;
            }

            Hi = fmt.search(/HH/);
            if (Hi < 0) {
                Hi = fmt.search(/H/);
            }
            if (Hi >= 0) {
                arr[i++] = Hi;
            }

            mi = fmt.search(/mm/);
            if (mi < 0) {
                mi = fmt.search(/m/);
            }
            if (mi >= 0) {
                arr[i++] = mi;
            }

            si = fmt.search(/ss/);
            if (si < 0) {
                si = fmt.search(/s/);
            }
            if (si >= 0) {
                arr[i++] = si;
            }

            var i, j;
            var arr2 = new Array(yi, Mi, di, Hi, mi, si);
            for (i = 0; i < arr.length - 1; i++) {
                for (j = 0; j < arr.length - 1 - i; j++) {
                    if (arr[j] > arr[j + 1]) {
                        temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr2.length; j++) {
                    if (arr[i] == arr2[j]) {
                        arr2[j] = i;
                    }
                }
            }
            var now = new Date();
            var year = arr2[0] >= 0 ? values[arr2[0] + 1] : now.getFullYear();
            var month = arr2[1] >= 0 ? (values[arr2[1] + 1] - 1) : now.getMonth();
            var day = arr2[2] >= 0 ? values[arr2[2] + 1] : now.getDate();
            var hour = arr2[3] >= 0 ? values[arr2[3] + 1] : "";
            var minute = arr2[4] >= 0 ? values[arr2[4] + 1] : "";
            var second = arr2[5] >= 0 ? values[arr2[5] + 1] : "";

            //console.log(year + ',' + month + ',' + day + ',' + hour + ',' + minute + ',' + second);

            var ret;
            if (hour == "") {
                ret = new Date(year, month, day);
            }
            else {
                ret = new Date(year, month, day, hour, minute, second);
            }

            if (ret.getDate() == day) {
                return ret;
            }
            else {
                return empty;
            }
        }
        else {
            return empty;
        }
    };

    Date.prototype.toBeiJingTimezone = function() {
        if(this.getTimezoneOffset() == -480) return new Date(this.getTime());
        var utc = this.getTime() + (this.getTimezoneOffset() * 60000);
        var d = new Date(utc + 3600000 * 8);        //BeiJing Timezone = +8
        return d;
    };

    Date.parseCN = Date.fromCN = function (s) {
        return Date.parse(s, 'yyyy年MM月dd日 HH时mm分ss秒');
    };

    Date.prototype.diff = function (num, unit) {
        if (!num || typeof num != 'number' || isNaN(num)) return new Date(this.getTime());
        if (!unit || unit.trim().length == 0) {
            unit = 'ms';
        }
        switch (unit) {
            case 's':
            case 'S':
                num *= 1000;
                break;
            case 'm':
            case 'M':
                num *= 60 * 1000;
                break;
            case 'h':
            case 'H':
                num *= 60 * 60 * 1000;
                break;
            case 'd':
            case 'D':
                num *= 24 * 60 * 60 * 1000;
                break;
            case 'ms':
            case 'MS':
            default :
            {
                break;
            }
        }
        return new Date(this.getTime() + num);
    };

    window.defineModule = function(m) {
        return window.$module = m;
    };

    window.freeModule = function() {
        if(window.$module && typeof window.$module.onDestroy == 'function') {
            window.$module.onDestroy();
        }
        delete window.$module;
    };

    window.getQueryParam = function (name) {
        var s = location.search.replace(/^\?/, '');
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

        if(!name || name == '*') {
            return param;
        }
        else {
            return param[name];
        }
    };

    window.redirect = function(url) {
        alert('111');
        window.location = url;
    };

    window.isMobileClient = function() {
        return navigator.userAgent.match(/AppleWebKit/);
    };

    //OO
    window.oo = {
        definePackage : function(pkg) {
            pkg = pkg.split(/\./);
            var parent = window;
            for(var i = 0;i<pkg.length;i++) {
                var n = pkg[i];
                if(!parent[n]) {
                    parent[n] = {};
                }
                parent = parent[n];
            }
            return parent;
        },

        getPackage : function(pkg) {
            pkg = pkg.split(/\./);
            var parent = window;
            for(var i = 0;i<pkg.length;i++) {
                var n = pkg[i];
                if(parent[n]) {
                    parent = parent[n];
                }
                else {
                    throw new Error('package [' + pkg.join('.') + '] is not found!');
                }
            }
            return parent;
        }
    };
})();


/**
 * ECMA-extension finished
 * */

app = seajs;

//开发时尚未引进seajs-combo和seajs-flush兼容
if(!app.flush) {
    app.flush = function() {};
}

page = {
    hide : function() {
        try {
            document.body.style.display = 'none';
        }catch(e){}
    },

    show : function() {
        try {
            document.body.style.display = 'block';
        }catch(e){}
    }
};

//app的cache模块
(function(){
    app.__cache = {};
    app.cache = function(key, value, expireInSeconds) {
        if(arguments.length == 0) {
            return this.__cache;
        }
        else if(arguments.length == 1) {
            var now = new Date();
            var o = this.__cache[key];
            if(o) {
                var expired = o.expired;
                if(!expired || expired >= now) {
                    return o.data;
                }
            }
        }
        else if(arguments.length == 2) {
            this.__cache[key] = {
                data : value
            };
            return this;
        }
        else if(arguments.length ==3) {
            var now = new Date();
            var expiredTime = now.addSecond(expireInSeconds);
            this.__cache[key] = {
                data : value,
                expired : expiredTime
            };
            return this;
        }
    };

    app.uncache = function(key) {
        delete this.__cache[key];
    };

    app.resetCache = function() {
        this.__cache = {};
    };
})();


app.config({
    // 设置路径，方便跨目录调用
    paths: {
        'arale': 'http://static.alipayobjects.com/arale',
        'jquery': 'http://static.alipayobjects.com/jquery',
        'gallery' : 'http://static.alipayobjects.com/gallery',
        'local' : '/js',
        'easynode' : '/js/modules',
        'plugin' : '/plugins',
        'app' : '/js/app'
    },
    base : '/js/app/',
    alias : {
        //=========================Arale程序模块=============================//
        '$' : 'jquery/jquery/1.11.1/jquery.js',
        'jquery' : 'jquery/jquery/1.11.1/jquery.js',
        'events' : 'arale/events/1.1.0/events.js',
        'base' : 'arale/base/1.1.1/base.js',
        'class' : 'arale/class/1.1.0/class.js',
        'uploader' : 'arale/upload/1.1.2/upload.js',

        //=========================本地化的Arale程序模块=============================//
        //'$' : 'local/jquery.js',
        //'events' : 'local/events.js',
        //'base' : 'local/base.js',
        //'class' : 'local/class.js',
        //'uploader' : 'local/upload.js',

        //=========================应用程序模块=============================//
        'bootstrap2' : 'easynode/bootstrap-2.3.2/js/bootstrap.js',
        'bootstrap' : 'easynode/bootstrap-3.3.4/js/bootstrap.min.js',
        'flatty' : 'easynode/flatty/flatty.js',
        'backbone' : 'easynode/backbone-1.1.2/backbone-ext.js',
        'underscore' : 'easynode/underscore-1.8.2/underscore-min.js',
        'jquery-json' : 'easynode/jquery-json.js',
        'jquery-mobile-events' : 'easynode/jquery.mobile-events.min.js',
        'jquery-print-area' : 'easynode/jquery-print-area.js',
        'jtemplate' : 'easynode/jquery-jtemplates_uncompressed.js',
        'mustache' : 'easynode/jquery-mustache.js',
        'async' : 'easynode/async.js',
        'spa' : 'easynode/spa.js',
        'json-api' : 'easynode/json-api.js',
        'dynamic-widget' : 'easynode/dynamic-widget.js',
        'form-util' : 'easynode/form-util.js',
        'dateformat' : 'easynode/dateformat.js',
        'session-user' : 'easynode/session-user.js',
        'easyui' : 'easynode/easyui/easyui.js',
        'amazeui' : 'easynode/amazeui/js/amazeui.min.js',
        'lazyload':'easynode/lazyload/amazeui.lazyload.js',
        'city-selector':'easynode/city-selector/js/jquery.cityselect.js',
        'css' : 'easynode/css.js',
        'ckeditor' : 'easynode/ckeditor-4.4.7/adapters/jquery.js',          //4.4.7版本
        'calendar' : 'easynode/calendar/jscal2.js',
        'util' : 'easynode/util.js',
        'validation' : 'easynode/jquery.validate.min.js',
        'clipboard' : 'easynode/jquery-clipboard.js',
        'query-parameter' : 'easynode/query-parameter.js',
    //    'plupload' : 'easynode/plupload/plupload.js'
        'qiniu' : 'easynode/qiniu/qiniu.js'

    }
});