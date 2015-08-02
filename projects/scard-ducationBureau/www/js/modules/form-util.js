/**
 * Created by zlbbq on 14-12-5.
 */

define(function(require, exports, module){
    var $ = require('$');
    var _argsFrom = function (jQuerySelector, force) {
        var argsSelector = jQuerySelector + " [arg]";
        var args = {};
        $(argsSelector).each(function () {
            var obj = $(this);
            var id = obj.attr('id');
            var argName = obj.attr('arg');
            if (argName == null || argName.length == 0) {
                argName = id;
            }
            var val = '';
            var tag = obj.get(0).tagName.toLowerCase();
            switch (tag) {
                case 'input':
                case 'select':
                {
                    val = obj.val();
                    break;
                }
                case 'textarea':
                {
                    val = obj.val().trim();
                    break;
                }
                case 'div':
                case 'span':
                case 'pre':
                case 'td':
                {
                    var argVal = obj.attr('arg');
                    if (argVal == 'html') {
                        val = obj.html().trim();
                    }
                    else {
                        val = obj.text().trim();
                    }
                    break;
                }
            }
            //自动补齐的值
            if ((force === true || force === '*') || (val != null && val.length > 0) && $.fn.autocompleteVal) {
                var temp = obj.autocompleteVal();
                if (temp && temp.trim().length > 0) {
                    args[argName + '_LABEL'] = val;
                    val = temp;
                }
            }
            if ((force === true || force === '*') || (val != null && val.length > 0)) {
                args[argName] = val;
            }
        });
        return args;
    };

    var _autoFill = function(selector, o) {
        function _getVal(id) {
            var ret = null;
            id = id || '';
            for (var p in o) {
                if (p.toLowerCase() == id.toLowerCase()) {
                    ret = o[p] || '';
                    break;
                }
            }
            return ret;
        }

        $(selector + ' input').each(function () {
            if ($(this).attr('type') == 'text' || $(this).attr('type') == 'hidden') {
                var val = _getVal($(this).attr('arg')) || _getVal($(this).attr('id'));
                if (val) {
                    var isAC = $(this).attr('_ac') === '1';
                    if(!isAC) {
                        $(this).val(val);
                    }
                    else {
                        var p = $(this).attr('arg') || $(this).attr('id');
                        p += '_LABEL';
                        var acLabel = _getVal(p) || val;
                        $(this).autocompleteVal(acLabel, val);
                    }

                    if($(this).attr('number') == 'true') {
                        var fixed = parseInt($(this).attr('fixed'));
                        fixed = isNaN(fixed) ? 0 : fixed;
                        var n = parseFloat($(this).val());
                        n = isNaN(val) ? 0 : n;
                        $(this).val(n.toFixed(fixed));
                    }

                }
            }
        });

        $(selector + ' textarea').each(function () {
            var val = _getVal($(this).attr('arg')) || _getVal($(this).attr('id'));
            if (val) {
                $(this).val(val);
            }
        });

        $(selector + ' select').each(function () {
            var val = _getVal($(this).attr('arg')) || _getVal($(this).attr('id'));
            if (val) {
                $(this).val(val);
            }
        });

        $(selector + ' [af]').each(function () {
            var val = _getVal($(this).attr('arg')) || _getVal($(this).attr('id'));
            if($(this).prop('tagName').toLowerCase() == 'a') {
                val = val || '';
                if (val && val.trim().length > 0) {
                    $(this).attr('href', val);
                }
                else {
                    $(this).attr('target', '');
                    $(this).attr('href', '#');
                    $(this).html($(this).html() + '(暂不可用,可能没有链接地址)');
                }
            }
            else {
                if (val) {
                    $(this).val(val);
                    $(this).text(val);
                }
            }
        });
    };

    $.extend($.fn, {
        enter : function(fn) {
            var o = $(this);
            o.keypress(function (e) {
                if (e.keyCode == 13) {
                    fn && fn.apply(this);
                }
            });
        }
    });


    exports.argsFrom = _argsFrom;
    exports.autoFill = _autoFill;
});
