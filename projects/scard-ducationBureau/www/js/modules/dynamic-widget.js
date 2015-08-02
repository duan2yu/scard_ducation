/**
 * Created by zlbbq on 14-12-4.
 */

define(function (require, exports, module) {
    var Class = require('class');
    var Events = require('events');
    //增加只执行一次的事件绑定函数
    Events.prototype.once = function(event, handler) {
        var me = this;
        var fn = function(){
            handler && handler();
            me.off(event, fn);
        };
        this.on(event, fn);
    };
    /*
     动态Widget,支持如下功能
     1.从远程加载HTML区块
     2.获取动态数据
     3.定时刷新
     */
    app.Event = app.Event || new Events();

    var DynamicWidget = Class.create({
        initialize: function (element, widgetURL, autoRefresh) {
            this.name = 'DynamicWidget' + Math.random();
            this.element = element;
            this.widgetURL = widgetURL;
            this.autoRefresh = autoRefresh;
            this.data = null;
            if (this.autoRefresh && this.autoRefresh > 0) {
                var me = this;
                setInterval(function () {
                    me.load();
                }, this.autoRefresh * 1000);
            }
        },

        setName : function(name) {
            this.name = name;
        },

        load: function (cb) {
            var me = this;
            this.fetch(function (data) {
                me.data = data;
                if (me.widgetURL) {
                    $(me.element).load(me.widgetURL, function (res, status, xhr) {
                        if (status != 'error') {
                            me.render(data, $(me.element));
                        }
                        cb && cb();
                        me.name && app.Event.trigger(me.name);
                    });
                }
                else {
                    me.render(data, $(me.element));
                    cb && cb();
                    me.name && app.Event.trigger(me.name);
                }
            });
        },

        onload : function(fn) {
            if(typeof fn == 'function') {
                app.Event.once(this.name, fn);
            }
        },

        loadAfter: function (triggerEvent) {
            if(typeof triggerEvent.name == 'string') {
                triggerEvent = triggerEvent.name;
            }
            app.Event = app.Event || new Events();
            app.Event.once(triggerEvent, function(){this.load();}.bind(this));
        },

        implement: function (implementation, loadImmediate) {
            this.fetch = implementation.fetch || this.fetch;
            this.render = implementation.render || this.render;
            loadImmediate && this.load();
        },

        getData: function () {
            return this.data;
        },

        fetch : function(callback) {
            callback && callback();
        },

        render: function (data, element) {
        }
    });

    module.exports = DynamicWidget;
});