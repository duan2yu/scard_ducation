/**
 * Created by zlbbq on 14-12-16.
 */

define(function(require, exports, module){
    var $ = require('$');

    exports.load = function(uri, callback) {
        var node = document.createElement('link');
        node.rel = 'stylesheet';
        node.type = 'text/css';
        node.href = uri;
        node.onload = node.onerror = function() {
            callback && callback();
        };
        document.getElementsByTagName('head')[0].appendChild(node);
    };

    exports.loadScript = function(url, callback) {
        var head = $('head');
        $("<scri"+"pt>"+"</scr"+"ipt>").attr({src:url,type:'text/javascript',id:'load'}).appendTo(head);
    };

    exports.isLoad = function(cssFileName) {
        var links = document.getElementsByTagName('link');
        for(var i = 0;i<links.length;i++) {
            var href = links[i].href;
            if(href && href.indexOf(cssFileName) >= 0) {
                return true;
            }
        }
        return false;
    };
});